import React from 'react'
import { useParams } from 'react-router-dom'
import ResetearPassword from '../../components/ResetearPassword/ResetearPassword'
import RecuperarPassword from '../RecuperarPassword/RecuperarPassword'

const CambiarPassword = () => {
    const {token}=useParams()
  return (
    <div>
      {token!="init" ? (<ResetearPassword token={token}/>):(<RecuperarPassword/>)}
    </div>
  )
}

export default CambiarPassword
