import React from 'react'
import { useParams } from 'react-router-dom'
import ResetearPassword from '../../components/ResetearPassword/ResetearPassword'
import ConfirmarEmail from '../ConfirmarEmail/ConfirmarEmail'

const CambiarPassword = () => {
    const {token}=useParams()
    console.log(token);
  return (
    <div>
      {token.includes("unsubscribe") ? (<ConfirmarEmail token={token}/>):token==="forgot" ?(<ConfirmarEmail />): (<ResetearPassword token={token} />)}
    </div>
  )
}

export default CambiarPassword
