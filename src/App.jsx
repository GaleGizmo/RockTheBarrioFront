import "./App.css";
import Home from "./pages/Home/Home";
import DetallesEvento from "./pages/DetallesEvento/DetallesEvento";
import CrearEvento from "./pages/CrearEvento/CrearEvento";
import DateDeAlta from "./pages/DateDeAlta/DateDeAlta";
import Header from "./components/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { Component, useEffect, useState } from "react";
import { checkSesion, setUser } from "./redux/usuarios/usuarios.actions";

import EditarEvento from "./pages/EditarEvento/EditarEvento";

import Footer from "./components/Footer/Footer";
import ScrollArriba from "./components/ScrollArriba/ScrollArriba";

function App() {
  const { user } = useSelector((state) => state.usuariosReducer);
  const [sesionVerificada, setSesionVerificada] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkSesion());
    setSesionVerificada(true);
  }, []);

  
  return (
    <>
      <div className="app">
        <Header />
        {sesionVerificada && <ScrollArriba />}
        {sesionVerificada && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<DetallesEvento />} />
            <Route
              path="editar-evento/:id"
              element={
                user && user.role === 2 ? (
                  <EditarEvento />
                ) : (
                  <Navigate to="/" replace={true} />
                )
              }
            />
            <Route
              path="/date-de-alta"
              element={
                !user ? <DateDeAlta /> : <Navigate to="/" replace={true} />
              }
            />
            <Route
              path="/crear-evento"
              element={
                user && user.role === 2 ? (
                  <CrearEvento />
                ) : (
                  <Navigate to="/" replace={true} />
                )
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" replace={true} />}
            />
            <Route path="*" element={<Home />} />
          </Routes>
        )}
        <Footer />
      </div>
     
    </>
  );
}

export default App;
