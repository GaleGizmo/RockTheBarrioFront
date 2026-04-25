import {  configureStore} from "@reduxjs/toolkit";
import { eventosReducer } from "./eventos/eventos.reducer";
import { usuariosReducer } from "./usuarios/usuarios.reducer";
import thunk from "redux-thunk";


export default configureStore({
  reducer: {
    eventosReducer: eventosReducer,
    usuariosReducer: usuariosReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk),
});
