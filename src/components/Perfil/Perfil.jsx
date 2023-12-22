import React from "react";
import Button from "../../components/Button/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Perfil.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendEventosDiarios } from "../../redux/eventos/eventos.actions";

const Perfil = ({ userData, onEditClick }) => {
  
  const dispatch=useDispatch()
const notify= (status) =>{
  if(status===true) {
    toast.success("Eventos enviados", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  } else {
    toast.error("Error al enviar eventos", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
    
  }}

  const sendDiarios=()=>{
    let status=null
    try {
      dispatch(sendEventosDiarios())
      status=true
    } catch (err) {
      status=false
      console.error("Error al mandar eventos:", err)
    }
    notify(status)
  }

 
  return (
    
    <div >

      <p>Email: <span className="perfil__user-data">{userData.email}</span></p>
      <p>Usuario: <span className="perfil__user-data">{userData.username}</span> </p>
      {userData.avatar && (
        <div className="perfil-avatar">
          <img className="header_avatar" src={userData.avatar} alt="avatar" />
        </div>
      )}
      <p>Email con novos eventos: {userData.newevent ? (<span className="perfil__user-data green">Si</span>):(<span className="perfil__user-data red">Non</span>)}</p>

      <p>Email con eventos da semana: {userData.newsletter ? (<span className="perfil__user-data green">Si</span>):(<span className="perfil__user-data red">Non</span>)}</p>
      <div>
              {userData && userData.role === 2 && (<>
                <Link to="/crear-evento">
                  <span className="boton-crear">
                    <Button text="Crear evento" type="medium" />
                  </span>
                </Link>
                <Button text="Eventos diarios" type="medium" onClick={sendDiarios}/>
                </>
              )}
            </div>
      <div className="margin-botonReg">
     
        <Button text="Editar Datos" type="small" onClick={onEditClick} />
      </div>
      
    </div>
  );
};

export default Perfil;
