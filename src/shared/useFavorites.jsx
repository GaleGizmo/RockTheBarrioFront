// useFavorites.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { addToFavorites } from '../redux/usuarios/usuarios.actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useFavorites = (initialIsFavorite, eventId, userId) => {
  
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [showFavorite, setShowFavorite] = useState(false);
  const dispatch = useDispatch();
  let {error}=useSelector((state)=>state.usuariosReducer)

  const handleFavorites = async() => {
    const newFavoriteValue = !isFavorite;
    try {
      await dispatch(addToFavorites(eventId, userId, newFavoriteValue));
      // Solo mostrar favorito si addToFavorites tiene éxito
      setShowFavorite(true);
      setIsFavorite(newFavoriteValue);
      setTimeout(() => {
        setShowFavorite(false);
      }, 3000);
    } catch (err) {
      toast.error(error, {position: 'top-right'});
    }
  };

  return { isFavorite, handleFavorites, showFavorite };
};

export default useFavorites;
