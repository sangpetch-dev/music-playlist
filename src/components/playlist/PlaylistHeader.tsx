import React, { useState } from 'react';
import styled from 'styled-components';
import { PlayArrow, Pause, MoreVert, Edit } from '@mui/icons-material';
import { PlaylistDetail } from '../../types/playlist.types';
import { usePlayer } from '../../hooks/usePlayer';
import { usePlaylists } from '../../hooks/usePlaylist';
import { formatTime } from '../../utils/formatter';

interface PlaylistHeaderProps {
    playlist: PlaylistDetail;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ playlist }) => {
    const { currentSong, isPlaying, play, togglePlay } = usePlayer();
    const { updatePlaylist } = usePlaylists();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(playlist.name);
    const [description, setDescription] = useState(playlist.description || '');

    const totalDuration = playlist.songs.reduce(
        (total, item) => total + item.song.duration,
        0
    );

    const handlePlay = () => {
        if (playlist.songs.length === 0) return;

        const isPlayingThisPlaylist =
            isPlaying &&
            currentSong &&
            playlist.songs.some((item) => item.song.id === currentSong.id);

        if (isPlayingThisPlaylist) {
            togglePlay();
        } else {
            play(playlist.songs[0].song);
        }
    };

    const handleSave = async () => {
        if (name.trim()) {
            await updatePlaylist(playlist.id, {
                name: name.trim(),
                description: description.trim() || undefined,
            });
            setIsEditing(false);
        }
    };

    return (
        <HeaderContainer>
            <CoverImage coverImage={playlist.coverImage} />
            <HeaderInfo>
                <PlaylistType>Playlist</PlaylistType>

                {isEditing ? (
                    <EditForm>
                        <FormInput
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Playlist name"
                        />
                        <FormTextarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add an optional description"
                        />
                        <FormActions>
                            <SaveButton onClick={handleSave}>Save</SaveButton>
                            <CancelButton onClick={() => setIsEditing(false)}>
                                Cancel
                            </CancelButton>
                        </FormActions>
                    </EditForm>
                ) : (
                    <>
                        <PlaylistTitle>{playlist.name}</PlaylistTitle>
                        {playlist.description && (
                            <PlaylistDescription>{playlist.description}</PlaylistDescription>
                        )}
                        <PlaylistStats>
                            {playlist.songs.length} songs • {formatTime(totalDuration)}
                        </PlaylistStats>
                        <PlaylistActions>
                            <PlayButton onClick={handlePlay}>
                                {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                            </PlayButton>
                            <EditButton onClick={() => setIsEditing(true)}>
                                <Edit fontSize="small" />
                                Edit
                            </EditButton>
                            <MenuButton>
                                <MoreVert />
                            </MenuButton>
                        </PlaylistActions>
                    </>
                )}
            </HeaderInfo>
        </HeaderContainer>
    )
}

export default PlaylistHeader;


const HeaderContainer = styled.div`
  display: flex;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  color: white;
`;

const CoverImage = styled.div<{ coverImage?: string }>`
  width: 232px;
  height: 232px;
  background-color: #282828;
  background-image: ${(props) =>
        props.coverImage ? `url(${props.coverImage})` : 'none'};
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  margin-right: 2rem;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const PlaylistType = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`;

const PlaylistTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  margin: 0.5rem 0;
`;

const PlaylistDescription = styled.div`
  font-size: 0.9rem;
  color: #b3b3b3;
  margin-bottom: 1rem;
`;

const PlaylistStats = styled.div`
  font-size: 0.9rem;
  color: #b3b3b3;
  margin-bottom: 2rem;
`;

const PlaylistActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1db954;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #1ed760;
    transform: scale(1.05);
  }
`;

const EditButton = styled.button`
  background: transparent;
  border: none;
  color: #b3b3b3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MenuButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: #b3b3b3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const EditForm = styled.div`
  margin-top: 1rem;
`;

const FormInput = styled.input`
  width: 100%;
  background-color: #333;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  color: white;
  margin-bottom: 0.75rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #1db954;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  background-color: #333;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  color: white;
  margin-bottom: 0.75rem;
  resize: vertical;
  min-height: 80px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #1db954;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SaveButton = styled.button`
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