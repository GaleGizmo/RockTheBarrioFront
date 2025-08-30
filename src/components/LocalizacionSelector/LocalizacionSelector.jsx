import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button/Button";

const LocalizacionSelector = ({
  locations,
  setLocations,
  onChange,
  addLocalizacion,
}) => {
  const [selectedId, setSelectedId] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [newLocName, setNewLocName] = useState("");
  const [isVarios, setIsVarios] = useState(false);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    const loc = locations.find((l) => l._id === id);
    setSelectedId(id);
    onChange({ site: loc ? loc.name : "", location: id });
  };

  const handleAddLoc = async () => {
    if (newLocName.trim()) {
      const nuevaLoc = await addLocalizacion(newLocName.trim());
      console.log("Respuesta de añadir localización:", nuevaLoc);
      if (nuevaLoc && nuevaLoc.localizacion._id) {
        setLocations((prev) => [...prev, nuevaLoc.localizacion]);
        setSelectedId(nuevaLoc.localizacion._id);
        onChange({
          site: nuevaLoc.localizacion.name,
          location: nuevaLoc.localizacion._id,
        });
        setShowInput(false);
        setNewLocName("");
        toast.success(nuevaLoc.message);
      } else {
        toast.error("Error ao engadir a nova localización");
      }
    }
  };

  const handleVariosChange = (e) => {
    setIsVarios(e.target.checked);
    if (e.target.checked) {
      setSelectedId("");
      onChange({ site: "Varios", location: "" });
    }
  };

  return (
    <div>
      <label htmlFor="localizacion-select">Localización:</label>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {!showInput && (
          <select
            id="localizacion-select"
            value={selectedId}
            onChange={handleSelectChange}
            disabled={isVarios}
            className="inputCrearEvento"
          >
            <option value="">Elixe localización</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.name}
              </option>
            ))}
          </select>
        )}
        <button
          type="button"
          onClick={() => setShowInput((v) => !v)}
          disabled={isVarios}
          title="Engadir nova localización"
        >
          {showInput ? "X" : "+"}
        </button>
        {showInput && !isVarios && (
          <>
            <input
              type="text"
              className="inputCrearEvento"
              value={newLocName}
              onChange={(e) => setNewLocName(e.target.value)}
              placeholder="Nova localización"
            />
            <Button
              type="button"
              text="Gardar"
              variant="medium"
              onClick={handleAddLoc}
            />
          </>
        )}
      </div>
      <label className="div-checkbox">
        Varias
        <input
          type="checkbox"
          checked={isVarios}
          onChange={handleVariosChange}
        />
      </label>
    </div>
  );
};

export default LocalizacionSelector;
