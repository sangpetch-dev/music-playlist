import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  Home,
  Search,
  LibraryMusic,
  AddBox,
  Favorite,
} from '@mui/icons-material';
import { usePlaylists } from '../../hooks/usePlaylist';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { playlists, loading, createPlaylist } = usePlaylists();
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [newPlaylistName, setNewPlaylistName] = React.useState('');

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName);
      setShowCreateModal(false);
      setNewPlaylistName('');
    }
  };

  return (
    <SidebarContainer>
      <Logo>Music App</Logo>
      
      <NavSection>
        <NavItem to="/" active={location.pathname === '/'}>
          <Home style={{ marginRight: '0.75rem' }} />
          Home
        </NavItem>
        <NavItem to="/search" active={location.pathname === '/search'}>
          <Search style={{ marginRight: '0.75rem' }} />
          Search
        </NavItem>
        <NavItem to="/library" active={location.pathname === '/library'}>
          <LibraryMusic style={{ marginRight: '0.75rem' }} />
          Your Library
        </NavItem>
      </NavSection>
      
      <NavSection>
        <NavHeader>Playlists</NavHeader>
        <CreateButton onClick={() => setShowCreateModal(true)}>
          <AddBox style={{ marginRight: '0.75rem' }} />
          Create Playlist
        </CreateButton>
        <NavItem to="/liked-songs" active={location.pathname === '/liked-songs'}>
          <Favorite style={{ marginRight: '0.75rem' }} />
          Liked Songs
        </NavItem>
        
        {loading ? (
          <div style={{ padding: '0.5rem 1.5rem' }}>Loading...</div>
        ) : (
          playlists?.map((playlist: any) => (
            <PlaylistItem
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              active={location.pathname === `/playlist/${playlist.id}`}
            >
              {playlist.name}
            </PlaylistItem>
          ))
        )}
      </NavSection>
      
      {showCreateModal && (
        <div style={{ padding: '0 1.5rem' }}>
          <input
            type="text"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              backgroundColor: '#333',
              border: 'none',
              color: 'white',
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleCreatePlaylist}
              style={{
                padding: '0.5rem',
                backgroundColor: '#1db954',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Create
            </button>
            <button
              onClick={() => setShowCreateModal(false)}
              style={{
                padding: '0.5rem',
                backgroundColor: '#333',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 240px;
  background-color: #000000;
  color: #b3b3b3;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Logo = styled.div`
  padding: 0 1.5rem 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const NavSection = styled.div`
  margin-bottom: 1.5rem;
`;

const NavHeader = styled.div`
  padding: 0 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NavItem = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  color: ${(props) => (props.active ? 'white' : '#b3b3b3')};
  text-decoration: none;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  &:hover {
    color: white;
  }
`;

const PlaylistItem = styled(Link)<{ active: boolean }>`
  display: block;
  padding: 0.5rem 1.5rem;
  color: ${(props) => (props.active ? 'white' : '#b3b3b3')};
  text-decoration: none;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    color: white;
  }
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    color: white;
  }
`;