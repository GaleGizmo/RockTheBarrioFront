import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./NuevoComentario.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button/Button";
import {
  addComentario,
  switchEscribiendoComentario,
} from "../../redux/comentarios/comentarios.actions";
import { AiFillCloseCircle, AiTwotoneEdit } from "react-icons/ai";

const NuevoComentario = ({ eventoId, user }) => {
  let { escribiendoComentario, error } = useSelector(
    (state) => state.comentariosReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(switchEscribiendoComentario(false));
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
    }
  }, [error]);
  const { register, handleSubmit, reset } = useForm();

  const [value, setValue] = useState(0);
  const handleChange = (event) => {
    const newValue =
      event.target.value === "Ninguna" ? 0 : parseInt(event.target.value);

    setValue(newValue);
  };
  const toggleComentarios = () => {
    dispatch(switchEscribiendoComentario(!escribiendoComentario));
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
    <>
      <div className="nuevo-comentario">
        <h2 className="h2NC" onClick={toggleComentarios}>
          Engadir comentario:{" "}
          {escribiendoComentario ? (
            <AiFillCloseCircle className="edit_close" />
          ) : (
            <AiTwotoneEdit className="edit_icon" />
          )}
        </h2>
        {escribiendoComentario && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="TitVal-container">
              <div className=" tit">
                <label>Título</label>
                <input
                  type="text"
                  {...register("titulo")}
                  className="inputTit"
                />
              </div>
              <div className=" tit val">
                <label>Valoración </label>
                <select
                  className="inputVal"
                  {...register("valoracion")}
                  value={value ? value.toString() : "Ningunha"}
                  onChange={handleChange}
                >
                  <option default value="Ningunha">
                    Ningunha
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            <div className=" divContent">
              <label className="tit">Comentario</label>
              <textarea
                {...register("contenido")}
                className="content"
              ></textarea>
            </div>
            <div className="divBoton">
              <Button type="submit" variant="medium" text="Enviar" />
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default NuevoComentario;
