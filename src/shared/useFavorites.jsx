// useFavorites.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../redux/usuarios/usuarios.actions';


const useFavorites = (initialIsFavorite, eventId, userId) => {
  console.log(initialIsFavorite);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [showFavorite, setShowFavorite] = useState(false);
  const dispatch = useDispatch();

  const handleFavorites = () => {
    const newFavoriteValue = !isFavorite;
    setIsFavorite(newFavoriteValue);
    dispatch(addToFavorites(eventId, userId, newFavoriteValue));
    setShowFavorite(true);

    setTimeout(() => {
      setShowFavorite(false);
    }, 1500);
  };

  return { isFavorite, handleFavorites, showFavorite };
};

export default useFavorites;
