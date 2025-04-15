import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  VolumeUp,
  QueueMusic,
  Shuffle,
  Repeat,
  VolumeMute,
  VolumeDown,
} from '@mui/icons-material';
import { usePlayer } from '../../hooks/usePlayer';
import { formatTime } from '../../utils/formatter';
import SongItem from './SongItem';

const Player: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    duration,
    currentTime,
    volume,
    queue,
    togglePlay,
    setVolume,
    seek,
    playPrevious,
    playNext,
  } = usePlayer();
  
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const previousVolume = useRef(volume);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const newPosition = (clickPosition / progressBar.offsetWidth) * duration;
    seek(newPosition);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeBar = e.currentTarget;
    const clickPosition = e.clientX - volumeBar.getBoundingClientRect().left;
    const newVolume = clickPosition / volumeBar.offsetWidth;
    setVolume(Math.max(0, Math.min(1, newVolume)));
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume.current);
      setIsMuted(false);
    } else {
      previousVolume.current = volume;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeMute />;
    } else if (volume < 0.5) {
      return <VolumeDown />;
    } else {
      return <VolumeUp />;
    }
  };

  // Close queue panel when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isQueueOpen && !target.closest('.queue-panel') && !target.closest('.queue-button')) {
        setIsQueueOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isQueueOpen]);

  return (
    <>
      <PlayerContainer>
        <NowPlaying>
          {currentSong ? (
            <>
              <SongCover
                src={currentSong.coverImage || '/default-album.png'}
                alt={currentSong.title}
              />
              <SongInfo>
                <SongTitle>{currentSong.title}</SongTitle>
                <SongArtist>{currentSong.artist}</SongArtist>
              </SongInfo>
            </>
          ) : (
            <SongInfo>
              <SongTitle>Not playing</SongTitle>
              <SongArtist>Select a song to play</SongArtist>
            </SongInfo>
          )}
        </NowPlaying>

        <Controls>
          <ControlButtons>
            <ControlButton 
              active={shuffle}
              onClick={() => setShuffle(!shuffle)}
            >
              <Shuffle fontSize="small" />
            </ControlButton>
            <ControlButton onClick={playPrevious}>
              <SkipPrevious />
            </ControlButton>
            <PlayPauseButton onClick={togglePlay} disabled={!currentSong}>
              {isPlaying ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
            </PlayPauseButton>
            <ControlButton onClick={playNext}>
              <SkipNext />
            </ControlButton>
            <ControlButton 
              active={repeat}
              onClick={() => setRepeat(!repeat)}
            >
              <Repeat fontSize="small" />
            </ControlButton>
          </ControlButtons>

          <ProgressContainer>
            <TimeLabel>{formatTime(currentTime)}</TimeLabel>
            <ProgressBar onClick={handleProgressClick}>
              <Progress width={`${((currentTime / duration) * 100) || 0}%`} />
            </ProgressBar>
            <TimeLabel>{formatTime(duration)}</TimeLabel>
          </ProgressContainer>
        </Controls>

        <ExtraControls>
          <ControlButton 
            className="queue-button"
            active={isQueueOpen}
            onClick={() => setIsQueueOpen(!isQueueOpen)}
          >
            <QueueMusic fontSize="small" />
          </ControlButton>
          <VolumeContainer>
            <ControlButton onClick={toggleMute}>
              {getVolumeIcon()}
            </ControlButton>
            <VolumeBar onClick={handleVolumeClick}>
              <VolumeLevel width={`${volume * 100}%`} />
            </VolumeBar>
          </VolumeContainer>
        </ExtraControls>
      </PlayerContainer>

      <QueuePanel className="queue-panel" isOpen={isQueueOpen}>
        <QueueHeader>Play Queue</QueueHeader>
        <QueueContent>
          {queue.length > 0 ? (
            queue.map((song, index) => (
              <SongItem
                key={`${song.id}-${index}`}
                song={song}
                index={index + 1}
                showActions={false}
              />
            ))
          ) : (
            <QueueEmpty>
              {currentSong ? "Your queue is empty" : "Add songs to your queue"}
            </QueueEmpty>
          )}
        </QueueContent>
      </QueuePanel>
    </>
  );
};

export default Player;

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-color: #181818;
  border-top: 1px solid #282828;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
`;

const NowPlaying = styled.div`
  display: flex;
  align-items: center;
  min-width: 180px;
  max-width: 30%;
`;

const SongCover = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
  margin-right: 1rem;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongTitle = styled.div`
  color: white;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SongArtist = styled.div`
  color: #b3b3b3;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40%;
  width: 100%;
`;

const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  background: transparent;
  border: none;
  color: ${(props) => (props.active ? '#1db954' : '#b3b3b3')};
  margin: 0 0.5rem;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const PlayPauseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const TimeLabel = styled.div`
  color: #b3b3b3;
  font-size: 0.7rem;
  width: 40px;
  text-align: center;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: #535353;
  border-radius: 2px;
  margin: 0 0.5rem;
  cursor: pointer;
  position: relative;
`;

const Progress = styled.div<{ width: string }>`
  height: 100%;
  background-color: #b3b3b3;
  border-radius: 2px;
  width: ${(props) => props.width};
  &:hover {
    background-color: #1db954;
  }
`;

const ExtraControls = styled.div`
  display: flex;
  align-items: center;
  min-width: 180px;
  justify-content: flex-end;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  width: 125px;
`;

const VolumeBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: #535353;
  border-radius: 2px;
  margin-left: 0.5rem;
  cursor: pointer;
  position: relative;
`;

const VolumeLevel = styled.div<{ width: string }>`
  height: 100%;
  background-color: #b3b3b3;
  border-radius: 2px;
  width: ${(props) => props.width};
  &:hover {
    background-color: #1db954;
  }
`;

const QueuePanel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: ${(props) => (props.isOpen ? '0' : '-300px')};
  top: 0;
  bottom: 90px;
  width: 300px;
  background-color: #282828;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease;
  z-index: 101;
  display: flex;
  flex-direction: column;
`;

const QueueHeader = styled.div`
  padding: 1rem;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 1px solid #333;
`;

const QueueContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
`;

const QueueEmpty = styled.div`
  padding: 2rem 1rem;
  color: #b3b3b3;
  text-align: center;
`;