import { useNavigate } from "react-router-dom";

export const goBack = () => {
  const navigate = useNavigate();
  navigate(-1); // Navegar a la página anterior
};