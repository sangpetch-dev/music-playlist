import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

export const usePlayer = () => {
  return useContext(PlayerContext);
};