import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PlayArrow } from '@mui/icons-material';
import { Playlist } from '../../types/playlist.types';

interface PlaylistCardProps {
  playlist: Playlist;
  onPlay?: (playlist: Playlist) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onPlay }) => {
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onPlay) {
      onPlay(playlist);
    }
  };

  return (
    <CardContainer to={`/playlist/${playlist.id}`}>
      <CoverContainer>
        <PlaylistCover
          src={
            playlist.coverImage ||
            'https://via.placeholder.com/300x300?text=Playlist'
          }
          alt={playlist.name}
        />
        <PlayButton onClick={handlePlay}>
          <PlayArrow />
        </PlayButton>
      </CoverContainer>
      <PlaylistTitle>{playlist.name}</PlaylistTitle>
      <PlaylistDescription>
        {playlist.description || `${playlist.songCount || 0} songs`}
      </PlaylistDescription>
    </CardContainer>
  );
};

export default PlaylistCard;

const CardContainer = styled(Link)`
  display: block;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 1rem;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CoverContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* 1:1 Aspect Ratio */
  margin-bottom: 1rem;
  background-color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
`;

const PlaylistCover = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1db954;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s ease;
  
  ${CoverContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    transform: scale(1.1) translateY(0);
    background-color: #1ed760;
  }
`;

const PlaylistTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlaylistDescription = styled.p`
  font-size: 0.9rem;
  color: #b3b3b3;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;