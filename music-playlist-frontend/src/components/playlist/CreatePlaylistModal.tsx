import React, { useState } from 'react';
import styled from 'styled-components';
import { Close } from '@mui/icons-material';
import { usePlaylists } from '../../hooks/usePlaylist';

interface CreatePlaylistModalProps {
  onClose: () => void;
  onCreated?: (playlistId: string) => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  onClose,
  onCreated,
}) => {
  const { createPlaylist } = usePlaylists();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const playlist = await createPlaylist(
        name.trim(),
        description.trim() || undefined
      );
      if (playlist && onCreated) {
        onCreated(playlist.id);
      }
      onClose();
    } catch (error) {
      console.error('Failed to create playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Create a new playlist</ModalTitle>
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="playlist-name">Name</Label>
            <Input
              id="playlist-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Playlist"
              autoFocus
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="playlist-description">Description (optional)</Label>
            <Textarea
              id="playlist-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give your playlist a catchy description"
            />
          </FormGroup>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <CreateButton type="submit" disabled={loading || !name.trim()}>
              {loading ? 'Creating...' : 'Create'}
            </CreateButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreatePlaylistModal;

const ModalOverlay = styled.div`
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
  width: 500px;
  max-width: 90%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.75rem;
  color: white;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  &:hover {
    color: white;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  background-color: #333;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  color: white;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #1db954;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  background-color: #333;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  color: white;
  resize: vertical;
  min-height: 100px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #1db954;
  }
`;

const ModalFooter = styled.div`
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

const CreateButton = styled.button`
  background-color: #1db954;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? '0.6' : '1')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  &:hover {
    background-color: #1ed760;
  }
`;
