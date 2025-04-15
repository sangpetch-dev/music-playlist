import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchSongs } from '../services/song.service';
import { Song } from '../types/song.types';
import SearchBar from '../components/music/SearchBar';
import SongItem from '../components/music/SongItem';
import CreatePlaylistModal from '../components/playlist/CreatePlaylistModal';
import { useAuth } from '../hooks/useAuth';
import { usePlaylists } from '../hooks/usePlaylist';

const SearchContainer = styled.div`
  padding: 2rem 2rem 90px;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

const ResultsTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
`;

const ResultsCount = styled.div`
  color: #b3b3b3;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ResultsGrid = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
`;

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #b3b3b3;
  text-align: center;
`;

const PlaylistSelectionModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #282828;
  border-radius: 8px;
  padding: 2rem;
  width: 400px;
  max-width: 90%;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const PlaylistList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const PlaylistItemName = styled.div`
  color: white;
  font-size: 1rem;
  margin-left: 0.75rem;
`;

const CreateNewButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: transparent;
  border: 1px solid #b3b3b3;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border-color: white;
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: 1px solid #b3b3b3;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  color: white;
  cursor: pointer;
  &:hover {
    border-color: white;
  }
`;

const Search: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { playlists, addSongToPlaylist } = usePlaylists();

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = async (query: string) => {
    setLoading(true);
    try {
      const { songs, total } = await searchSongs(query);
      setResults(songs);
      setTotalResults(total);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleAddToPlaylist = (song: Song) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setSelectedSong(song);
    setShowPlaylistModal(true);
  };

  const handleSelectPlaylist = async (playlistId: string) => {
    if (selectedSong) {
      await addSongToPlaylist(playlistId, selectedSong.id);
      setShowPlaylistModal(false);
      setSelectedSong(null);
    }
  };

  const handleCreatePlaylist = () => {
    setShowPlaylistModal(false);
    setShowCreatePlaylistModal(true);
  };

  const handlePlaylistCreated = async (playlistId: string) => {
    setShowCreatePlaylistModal(false);
    if (selectedSong) {
      await addSongToPlaylist(playlistId, selectedSong.id);
      setSelectedSong(null);
    }
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchBar onSearch={handleSearch} placeholder="What do you want to listen to?" />
      </SearchHeader>

      {searchQuery && (
        <>
          <ResultsTitle>
            {loading ? 'Searching...' : `Results for "${searchQuery}"`}
          </ResultsTitle>
          
          {!loading && (
            <>
              {results.length > 0 ? (
                <>
                  <ResultsCount>
                    {totalResults} {totalResults === 1 ? 'song' : 'songs'} found
                  </ResultsCount>
                  <ResultsGrid>
                    {results.map((song, index) => (
                      <SongItem
                        key={song.id}
                        song={song}
                        index={index + 1}
                        onAddToPlaylist={() => handleAddToPlaylist(song)}
                      />
                    ))}
                  </ResultsGrid>
                </>
              ) : (
                <NoResults>
                  <h3 style={{ color: 'white', marginBottom: '1rem' }}>
                    No results found for "{searchQuery}"
                  </h3>
                  <p>
                    Please check your spelling or try different keywords.
                  </p>
                </NoResults>
              )}
            </>
          )}
        </>
      )}

      {/* Select Playlist Modal */}
      {showPlaylistModal && (
        <PlaylistSelectionModal onClick={() => setShowPlaylistModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Add to playlist</ModalTitle>
            
            <CreateNewButton onClick={handleCreatePlaylist}>
              Create New Playlist
            </CreateNewButton>
            
            <PlaylistList>
              {playlists.map((playlist: any) => (
                <PlaylistItem
                  key={playlist.id}
                  onClick={() => handleSelectPlaylist(playlist.id)}
                >
                  <PlaylistItemName>{playlist.name}</PlaylistItemName>
                </PlaylistItem>
              ))}
            </PlaylistList>
            
            <CloseButton onClick={() => setShowPlaylistModal(false)}>
              Cancel
            </CloseButton>
          </ModalContent>
        </PlaylistSelectionModal>
      )}

      {/* Create Playlist Modal */}
      {showCreatePlaylistModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreatePlaylistModal(false)}
          onCreated={handlePlaylistCreated}
        />
      )}
    </SearchContainer>
  );
};

export default Search;