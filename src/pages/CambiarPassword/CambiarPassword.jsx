import React from "react";
import { useParams } from "react-router-dom";
import ResetearPassword from "../../components/ResetearPassword/ResetearPassword";
import ConfirmarEmail from "../ConfirmarEmail/ConfirmarEmail";

const CambiarPassword = () => {
  const { token } = useParams();

  return (
    <div>
      {token.includes("unsubscribe") || token === "forgot"   ? (
        <ConfirmarEmail token={token} />
      ) :  (
        
        <ResetearPassword token={token} />
      )}
    </div>
  );
};

export default CambiarPassword;
