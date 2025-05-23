import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";


import "./BorradoresList.css";
import { getBorradoresAction } from "../../redux/eventos/eventos.actions";
import Borrador from "../Borrador/Borrador";

const BorradoresList = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.usuariosReducer);
  const { borradores, loading } = useSelector((state) => state.eventosReducer);

  useEffect(() => {
    dispatch(getBorradoresAction()); 
  }, [dispatch]);

  return (
    <div className="borradores-list">
      <Helmet>
        <title>Borradores - ROCK THE BARRIO</title>
        <meta
          name="description"
          content="Lista de borradores de eventos que aún no se han publicado en ROCK THE BARRIO."
        />
      </Helmet>
      <h2 className="titulo-borradores">Borradores de eventos</h2>
      <div className="borradores">
        {loading ? (
          <Loader />
        ) : borradores && borradores.length > 0 ? (
          borradores.map((borrador) => (
            <Borrador user={user} borrador={borrador} key={borrador._id} />
          ))
        ) : (
          <p>Non hai borradores dispoñibles.</p>
        )}
      </div>
    </div>
  );
};

export default BorradoresList;
