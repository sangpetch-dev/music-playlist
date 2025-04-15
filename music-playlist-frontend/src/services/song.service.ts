import api from './api';
import { Song } from '../types/song.types';

export const searchSongs = async (
  query: string,
  page: number = 1,
  limit: number = 20,
  useExternal: boolean = false
): Promise<{ songs: Song[]; total: number }> => {
  const response = await api.get('/songs/search', {
    params: { query, page, limit, external: useExternal },
  });
  return response.data;
};

export const getSongById = async (id: string): Promise<Song> => {
  const response = await api.get(`/songs/${id}`);
  return response.data;
};

export const getTrendingSongs = async (limit: number = 10): Promise<Song[]> => {
  const response = await api.get('/songs/trending', {
    params: { limit },
  });
  return response.data;
};

export const saveSongFromExternal = async (song: Song): Promise<Song> => {
  const response = await api.post('/songs/save-external', song);
  return response.data;
};