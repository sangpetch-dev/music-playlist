import React from 'react';
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
} from '@mui/icons-material';
import { usePlayer } from '../../hooks/usePlayer';
import { formatTime } from '../../utils/formatter';

const Footer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    duration,
    currentTime,
    volume,
    togglePlay,
    setVolume,
    seek,
    playPrevious,
    playNext,
  } = usePlayer();

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
  };

  return (
    <FooterContainer>
      <NowPlaying>
        {currentSong && (
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
        )}
      </NowPlaying>

      <Controls>
        <ControlButtons>
          <ControlButton>
            <Shuffle fontSize="small" />
          </ControlButton>
          <ControlButton onClick={playPrevious}>
            <SkipPrevious />
          </ControlButton>
          <PlayPauseButton onClick={togglePlay}>
            {isPlaying ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
          </PlayPauseButton>
          <ControlButton onClick={playNext}>
            <SkipNext />
          </ControlButton>
          <ControlButton>
            <Repeat fontSize="small" />
          </ControlButton>
        </ControlButtons>

        <ProgressContainer>
          <TimeLabel>{formatTime(currentTime)}</TimeLabel>
          <ProgressBar onClick={handleProgressClick}>
            <Progress width={`${(currentTime / duration) * 100}%`} />
          </ProgressBar>
          <TimeLabel>{formatTime(duration)}</TimeLabel>
        </ProgressContainer>
      </Controls>

      <ExtraControls>
        <ControlButton>
          <QueueMusic fontSize="small" />
        </ControlButton>
        <VolumeContainer>
          <VolumeUp fontSize="small" />
          <VolumeBar onClick={handleVolumeClick}>
            <VolumeLevel width={`${volume * 100}%`} />
          </VolumeBar>
        </VolumeContainer>
      </ExtraControls>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
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

const ControlButton = styled.button`
  background: transparent;
  border: none;
  color: #b3b3b3;
  margin: 0 0.5rem;
  cursor: pointer;
  &:hover {
    color: white;
  }
  &.primary {
    color: white;
  }
`;

const PlayPauseButton = styled(ControlButton)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.1);
    color: black;
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