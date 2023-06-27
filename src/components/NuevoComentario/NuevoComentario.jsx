import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./NuevoComentario.css";

import Button from "../Button/Button";
import { addComentario } from "../../redux/comentarios/comentarios.actions";

const NuevoComentario = ({ eventoId, user }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event) => {
    const newValue = event.target.value === "Ninguna" ? 0 : parseInt(event.target.value);
  
    setValue(newValue);
  };

  const onSubmit = (data) => {
    const comentarioData = {
      title: data.titulo,
      content: data.contenido,
      value: value,
      event: eventoId,
      user: user._id,
    };
    
    dispatch(addComentario(comentarioData, eventoId));
    reset();
  };

  return (
    <div>
      <div className="nuevo-comentario">
        <h2 className="h2NC">Danos a túa opinión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="displayFlex">
            <div className="form-group tit">
              <label>Título</label>
              <input type="text" {...register("titulo")} className="inputTit" />
            </div>
            <div className="form-group">
              <label>Valoración </label>
              <select className="inputVal"
              {...register("valoracion")}
                value={value ? value.toString() : "Ninguna"}
                
                onChange={handleChange}
              >
                <option default value="Ningunha">Ningunha</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div className="form-group divContent">
            <label className="labelCont">Comentario</label>
            <textarea {...register("contenido")} className="content"></textarea>
          </div>
          <div className="divBoton">
            <Button type="medium" text="Enviar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoComentario;
