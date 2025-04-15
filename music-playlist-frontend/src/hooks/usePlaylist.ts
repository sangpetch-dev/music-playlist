import { useState, useEffect, useCallback } from 'react';
import { Playlist, PlaylistDetail } from '../types/playlist.types';
import * as playlistService from '../services/playlist.service';
import { useAuth } from './useAuth';

export const usePlaylists = () => {
  const { isAuthenticated } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaylists = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const data = await playlistService.getPlaylists();
      setPlaylists(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch playlists');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchPlaylistById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await playlistService.getPlaylistById(id);
      setCurrentPlaylist(data);
      setError(null);
      return data;
    } catch (err) {
      setError('Failed to fetch playlist');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPlaylist = useCallback(async (name: string, description?: string, coverImage?: string) => {
    try {
      setLoading(true);
      const newPlaylist = await playlistService.createPlaylist(name, description, coverImage);
      setPlaylists([...playlists, newPlaylist]);
      setError(null);
      return newPlaylist;
    } catch (err) {
      setError('Failed to create playlist');
      return null;
    } finally {
      setLoading(false);
    }
  }, [playlists]);

  const updatePlaylist = useCallback(async (id: string, data: { name?: string; description?: string; coverImage?: string }) => {
    try {
      setLoading(true);
      const updatedPlaylist = await playlistService.updatePlaylist(id, data);
      setPlaylists(playlists.map(p => (p.id === id ? updatedPlaylist : p)));
      if (currentPlaylist && currentPlaylist.id === id) {
        setCurrentPlaylist({ ...currentPlaylist, ...updatedPlaylist });
      }
      setError(null);
      return updatedPlaylist;
    } catch (err) {
      setError('Failed to update playlist');
      return null;
    } finally {
      setLoading(false);
    }
  }, [playlists, currentPlaylist]);

  const deletePlaylist = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await playlistService.deletePlaylist(id);
      setPlaylists(playlists.filter(p => p.id !== id));
      if (currentPlaylist && currentPlaylist.id === id) {
        setCurrentPlaylist(null);
      }
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to delete playlist');
      return false;
    } finally {
      setLoading(false);
    }
  }, [playlists, currentPlaylist]);

  const addSongToPlaylist = useCallback(async (playlistId: string, songId: string) => {
    try {
      setLoading(true);
      await playlistService.addSongToPlaylist(playlistId, songId);
      if (currentPlaylist && currentPlaylist.id === playlistId) {
        await fetchPlaylistById(playlistId);
      }
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to add song to playlist');
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentPlaylist, fetchPlaylistById]);

  const removeSongFromPlaylist = useCallback(async (playlistId: string, songId: string) => {
    try {
      setLoading(true);
      await playlistService.removeSongFromPlaylist(playlistId, songId);
      if (currentPlaylist && currentPlaylist.id === playlistId) {
        setCurrentPlaylist({
          ...currentPlaylist,
          songs: currentPlaylist.songs.filter(ps => ps.songId !== songId)
        });
      }
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to remove song from playlist');
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentPlaylist]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists, isAuthenticated]);

  return {
    playlists,
    currentPlaylist,
    loading,
    error,
    fetchPlaylists,
    fetchPlaylistById,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
  };
};