import React, { useState } from 'react';
import styled from 'styled-components';
import { AccessTime, MoreHoriz } from '@mui/icons-material';
import { PlaylistDetail } from '../../types/playlist.types';
import SongItem from '../music/SongItem';
import { Song } from '../../types/song.types';
import { usePlaylists } from '../../hooks/usePlaylist';

interface PlaylistSongsProps {
  playlist: PlaylistDetail;
  onSearch?: () => void;
}

const PlaylistSongs: React.FC<PlaylistSongsProps> = ({ playlist, onSearch }) => {
  const { removeSongFromPlaylist } = usePlaylists();
  const [songToRemove, setSongToRemove] = useState<{
    songId: string;
    title: string;
  } | null>(null);

  const handleRemoveSong = async () => {
    if (songToRemove) {
      await removeSongFromPlaylist(playlist.id, songToRemove.songId);
      setSongToRemove(null);
    }
  };

  const handleRemoveConfirmation = (song: Song) => {
    setSongToRemove({
      songId: song.id,
      title: song.title,
    });
  };

  return (
    <SongsContainer>
      {playlist.songs.length > 0 ? (
        <>
          <SongsHeader>
            <IndexHeader>#</IndexHeader>
            <TitleHeader>TITLE</TitleHeader>
            <DurationHeader>
              <AccessTime fontSize="small" />
            </DurationHeader>
          </SongsHeader>

          {playlist.songs
            .sort((a, b) => a.order - b.order)
            .map((item, index) => (
              <SongItem
                key={item.id}
                song={item.song}
                index={index + 1}
                onAddToPlaylist={() => handleRemoveConfirmation(item.song)}
              />
            ))}
        </>
      ) : (
        <EmptyState>
          <EmptyTitle>It's a bit empty here</EmptyTitle>
          <EmptyDescription>
            Search for songs and add them to your playlist to get started.
          </EmptyDescription>
          {onSearch && (
            <EmptyButton onClick={onSearch}>Find songs</EmptyButton>
          )}
        </EmptyState>
      )}

      {songToRemove && (
        <ConfirmationDialog>
          <DialogContent>
            <DialogTitle>Remove from playlist?</DialogTitle>
            <DialogMessage>
              Are you sure you want to remove "{songToRemove.title}" from this
              playlist?
            </DialogMessage>
            <DialogActions>
              <CancelButton onClick={() => setSongToRemove(null)}>
                Cancel
              </CancelButton>
              <ConfirmButton onClick={handleRemoveSong}>Remove</ConfirmButton>
            </DialogActions>
          </DialogContent>
        </ConfirmationDialog>
      )}
    </SongsContainer>
  );
};

export default PlaylistSongs;

const SongsContainer = styled.div`
  padding: 0 2rem 2rem;
`;

const SongsHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #b3b3b3;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const IndexHeader = styled.div`
  width: 40px;
  text-align: center;
  color: #b3b3b3;
`;

const TitleHeader = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const DurationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #b3b3b3;
  text-align: center;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
  max-width: 500px;
  margin-bottom: 1.5rem;
`;

const EmptyButton = styled.button`
  background-color: white;
  color: black;
  border: none;
  border-radius: 20px;
  padding: 0.75rem 2rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const ConfirmationDialog = styled.div`
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

const DialogContent = styled.div`
  background-color: #282828;
  border-radius: 8px;
  padding: 2rem;
  width: 400px;
  max-width: 90%;
`;

const DialogTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const DialogMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #b3b3b3;
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
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

const ConfirmButton = styled.button`
  background-color: #1db954;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #1ed760;
  }
`;