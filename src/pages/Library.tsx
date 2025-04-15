import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import PlaylistCard from '../components/music/PlaylistCard';
import CreatePlaylistModal from '../components/playlist/CreatePlaylistModal';
import { usePlaylists } from '../hooks/usePlaylist';

const Library: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { playlists, loading, fetchPlaylists } = usePlaylists();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchPlaylists();
  }, [isAuthenticated, fetchPlaylists, navigate]);

  const handleCreatePlaylist = () => {
    setShowCreateModal(true);
  };

  const handlePlaylistCreated = (playlistId: string) => {
    setShowCreateModal(false);
    navigate(`/playlist/${playlistId}`);
  };

  const handlePlayPlaylist = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <LibraryContainer>
      <LibraryHeader>
        <LibraryTitle>Your Library</LibraryTitle>
        <CreateButton onClick={handleCreatePlaylist}>
          <Add style={{ marginRight: '0.5rem' }} />
          Create Playlist
        </CreateButton>
      </LibraryHeader>

      {loading ? (
        <PlaylistGrid>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              style={{
                height: '240px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
              }}
            />
          ))}
        </PlaylistGrid>
      ) : playlists.length > 0 ? (
        <PlaylistGrid>
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onPlay={() => handlePlayPlaylist(playlist.id)}
            />
          ))}
        </PlaylistGrid>
      ) : (
        <EmptyState>
          <EmptyStateTitle>Create your first playlist</EmptyStateTitle>
          <EmptyStateText>
            It's easy, we'll help you. Start by creating a playlist, then add songs to it.
          </EmptyStateText>
          <CreateButton onClick={handleCreatePlaylist}>
            <Add style={{ marginRight: '0.5rem' }} />
            Create Playlist
          </CreateButton>
        </EmptyState>
      )}

      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handlePlaylistCreated}
        />
      )}
    </LibraryContainer>
  );
};

export default Library;

const LibraryContainer = styled.div`
  padding: 2rem 2rem 90px;
`;

const LibraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const LibraryTitle = styled.h1`
  color: white;
  font-size: 2rem;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #1ed760;
  }
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1rem;
  color: #b3b3b3;
  text-align: center;
`;

const EmptyStateTitle = styled.h2`
  color: white;
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  margin-bottom: 2rem;
  max-width: 500px;
`;