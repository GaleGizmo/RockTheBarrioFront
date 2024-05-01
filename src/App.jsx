import "./App.css";
import Home from "./pages/Home/Home";
import DetallesEvento from "./pages/DetallesEvento/DetallesEvento";
import CrearEvento from "./pages/CrearEvento/CrearEvento";
import DateDeAlta from "./pages/DateDeAlta/DateDeAlta";
import Header from "./components/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import EditarEvento from "./pages/EditarEvento/EditarEvento";
import Footer from "./components/Footer/Footer";
import ScrollArriba from "./components/ScrollArriba/ScrollArriba";
import PerfilUsuario from "./pages/PerfilUsuario/PerfilUsuario";
import Terminos from "./pages/Legal/Terminos";
import Privacidad from "./pages/Legal/Privacidad";
import ConfirmarEmail from "./pages/ConfirmarEmail/ConfirmarEmail";
import CambiarPassword from "./pages/CambiarPassword/CambiarPassword";
import Contacto from "./pages/Contacto/Contacto";
import FAQ from "./pages/FAQ/FAQ";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useSelector((state) => state.usuariosReducer);
 

  return (
    <>
      <div className="app">
      <ToastContainer />
        <Header />
        <ScrollArriba />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="/recuperar-password"
            element={
              <ProtectedRoute>
                <ConfirmarEmail />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password/:token" element={<CambiarPassword />} />
          <Route path="/:id" element={<DetallesEvento />} />
          <Route
            path="editar-evento/:id"
            element={
              <ProtectedRoute requiredRole={2}>
                <EditarEvento />
              </ProtectedRoute>
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
              <ProtectedRoute requiredRole={2}>
                <CrearEvento />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute requiredRole={1}>
                <PerfilUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace={true} />}
          />
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
