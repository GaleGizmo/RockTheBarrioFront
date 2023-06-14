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
    const newValue = parseInt(event.target.value);

    if (newValue >= 0 && newValue <= 5) {
      setValue(newValue);
    }
  };

  const onSubmit = (data) => {
    const comentarioData = {
      title: data.titulo,
      content: data.contenido,
      value: data.valoracion,
      event: eventoId,
      user: user._id,
    };
    console.log(comentarioData);
    dispatch(addComentario(comentarioData, eventoId));
    reset();
  };

  return (
    <div>
      <div className="nuevo-comentario">
        <h2 className="h2NC">Danos tu opinión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="displayFlex">
            <div className="form-group tit">
              <label>Título</label>
              <input type="text" {...register("titulo")} className="inputTit" />
            </div>
            <div className="form-group">
              <label>Valoración</label>
              <input
                type="number"
                {...register("valoracion")}
                min={0}
                max={5}
                value={value}
                onChange={handleChange}
                className="inputVal"
              />
            </div>
          </div>

          <div className="form-group divContent">
            <label className="labelCont">Contenido</label>
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
