import api from './api';
import { Playlist, PlaylistDetail } from '../types/playlist.types';

export const getPlaylists = async (): Promise<Playlist[]> => {
  const response = await api.get('/playlists');
  return response.data;
};

export const getPlaylistById = async (id: string): Promise<PlaylistDetail> => {
  const response = await api.get(`/playlists/${id}`);
  return response.data;
};

export const createPlaylist = async (
  name: string,
  description?: string,
  coverImage?: string
): Promise<Playlist> => {
  const response = await api.post('/playlists', { name, description, coverImage });
  return response.data;
};

export const updatePlaylist = async (
  id: string,
  data: { name?: string; description?: string; coverImage?: string }
): Promise<Playlist> => {
  const response = await api.put(`/playlists/${id}`, data);
  return response.data;
};

export const deletePlaylist = async (id: string): Promise<void> => {
  await api.delete(`/playlists/${id}`);
};

export const addSongToPlaylist = async (
  playlistId: string,
  songId: string,
  order?: number
): Promise<void> => {
  await api.post(`/playlists/${playlistId}/songs`, { songId, order });
};

export const removeSongFromPlaylist = async (
  playlistId: string,
  songId: string
): Promise<void> => {
  await api.delete(`/playlists/${playlistId}/songs/${songId}`);
};