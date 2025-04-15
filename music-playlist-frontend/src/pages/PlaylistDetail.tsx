import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import PlaylistHeader from '../components/playlist/PlaylistHeader';
import PlaylistSongs from '../components/playlist/PlaylistSongs';
import { usePlaylists } from '../hooks/usePlaylist';

const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { fetchPlaylistById, currentPlaylist, loading, error } = usePlaylists();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadPlaylist = async () => {
      if (id) {
        const playlist = await fetchPlaylistById(id);
        if (!playlist) {
          setNotFound(true);
        }
      }
    };

    loadPlaylist();
  }, [id, fetchPlaylistById, isAuthenticated, navigate]);

  const handleSearchNavigate = () => {
    navigate('/search');
  };

  if (loading) {
    return <LoadingState>Loading playlist...</LoadingState>;
  }

  if (error || notFound) {
    return (
      <ErrorState>
        <ErrorTitle>
          {notFound ? "Playlist not found" : "Error loading playlist"}
        </ErrorTitle>
        <p>
          {notFound
            ? "The playlist you're looking for doesn't exist or has been removed."
            : "There was a problem loading this playlist. Please try again later."}
        </p>
        <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
      </ErrorState>
    );
  }

  if (!currentPlaylist) {
    return null;
  }

  return (
    <PlaylistDetailContainer>
      <PlaylistHeader playlist={currentPlaylist} />
      <PlaylistSongs playlist={currentPlaylist} onSearch={handleSearchNavigate} />
    </PlaylistDetailContainer>
  );
};

export default PlaylistDetail;

const PlaylistDetailContainer = styled.div`
  padding-bottom: 90px;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 90px);
  color: white;
  font-size: 1.2rem;
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #b3b3b3;
  text-align: center;
`;

const ErrorTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const BackButton = styled.button`
  background-color: #1db954;
  border: none;
  border-radius: 20px;
  padding: 0.75rem 2rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1.5rem;
  &:hover {
    background-color: #1ed760;
    transform: scale(1.05);
  }
`;