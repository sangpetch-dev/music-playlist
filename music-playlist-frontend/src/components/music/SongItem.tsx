import React from 'react';
import styled from 'styled-components';
import { PlayArrow, Pause, Add, MoreHoriz } from '@mui/icons-material';
import { Song } from '../../types/song.types';
import { usePlayer } from '../../hooks/usePlayer';
import { formatTime } from '../../utils/formatter';

interface SongItemProps {
  song: Song;
  index?: number;
  showActions?: boolean;
  onAddToPlaylist?: (song: Song) => void;
  isExternal?: boolean;
}

const SongItem: React.FC<SongItemProps> = ({
  song,
  index,
  showActions = true,
  onAddToPlaylist,
  isExternal = false
}) => {
  const { currentSong, isPlaying, play, togglePlay, addToQueue } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentSong) {
      togglePlay();
    } else {
      play(song);
    }
  };

  const handleAddToQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToQueue(song);
  };

  const handleAddToPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToPlaylist) {
      onAddToPlaylist(song);
    }
  };

  return (
    <SongContainer onClick={handlePlayPause}>
      <IndexOrPlayButton>
        {isCurrentSong ? (
          <button
            onClick={handlePlayPause}
            style={{
              background: 'transparent',
              border: 'none',
              color: isCurrentSong ? '#1db954' : 'inherit',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {isPlaying ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
          </button>
        ) : (
          index
        )}
      </IndexOrPlayButton>

      <SongInfo>
        <SongTitle style={{ color: isCurrentSong ? '#1db954' : 'white' }}>
          {song.title}
          {isExternal && (
            <span style={{
              fontSize: '0.7rem',
              color: '#1DB954',
              marginLeft: '8px',
              padding: '2px 6px',
              backgroundColor: 'rgba(29, 185, 84, 0.1)',
              borderRadius: '4px'
            }}>
              Spotify
            </span>
          )}
        </SongTitle>
        <SongArtist>{song.artist}</SongArtist>
      </SongInfo>

      {showActions && (
        <SongActions>
          <ActionButton onClick={handleAddToQueue}>
            <Add fontSize="small" />
          </ActionButton>
          <ActionButton onClick={handleAddToPlaylist}>
            <MoreHoriz fontSize="small" />
          </ActionButton>
        </SongActions>
      )}

      <SongDuration>{formatTime(song.duration)}</SongDuration>
    </SongContainer>
  );
};

export default SongItem;

const SongContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #b3b3b3;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const IndexOrPlayButton = styled.div`
  width: 40px;
  text-align: center;
  font-size: 1rem;
`;

const SongInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const SongTitle = styled.div`
  color: white;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const SongArtist = styled.div`
  font-size: 0.9rem;
`;

const SongDuration = styled.div`
  margin-right: 1rem;
  font-size: 0.9rem;
`;

const SongActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  ${SongContainer}:hover & {
    opacity: 1;
  }
  &:hover {
    color: white;
  }
`;