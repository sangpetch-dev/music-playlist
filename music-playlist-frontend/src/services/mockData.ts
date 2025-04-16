// src/services/mockData.ts
import { User } from '../types/auth.types';
import { Song } from '../types/song.types';
import { Playlist, PlaylistDetail } from '../types/playlist.types';

// Mock user
export const mockUser: User = {
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
};

// Mock songs
export const mockSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: 'Divide',
    duration: 235,
    coverImage: 'https://placehold.co/300x300?text=Shape+of+You',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 'song-2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 203,
    coverImage: 'https://placehold.co/300x300?text=Blinding+Lights',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 'song-3',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming',
    duration: 210,
    coverImage: 'https://placehold.co/300x300?text=Dance+Monkey',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 'song-4',
    title: 'Don\'t Start Now',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 183,
    coverImage: 'https://placehold.co/300x300?text=Dont+Start+Now',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 'song-5',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    coverImage: 'https://placehold.co/300x300?text=Watermelon+Sugar',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: 'song-6',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    album: 'When We All Fall Asleep, Where Do We Go?',
    duration: 194,
    coverImage: 'https://placehold.co/300x300?text=Bad+Guy',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    id: 'song-7',
    title: 'Circles',
    artist: 'Post Malone',
    album: 'Hollywood\'s Bleeding',
    duration: 215,
    coverImage: 'https://placehold.co/300x300?text=Circles',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    id: 'song-8',
    title: 'Someone You Loved',
    artist: 'Lewis Capaldi',
    album: 'Divinely Uninspired to a Hellish Extent',
    duration: 182,
    coverImage: 'https://placehold.co/300x300?text=Someone+You+Loved',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
  {
    id: 'song-9',
    title: 'Señorita',
    artist: 'Shawn Mendes, Camila Cabello',
    album: 'Señorita',
    duration: 191,
    coverImage: 'https://placehold.co/300x300?text=Senorita',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  },
  {
    id: 'song-10',
    title: 'Memories',
    artist: 'Maroon 5',
    album: 'Memories',
    duration: 189,
    coverImage: 'https://placehold.co/300x300?text=Memories',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  },
  {
    id: 'song-11',
    title: 'Savage Love',
    artist: 'Jawsh 685, Jason Derulo',
    album: 'Savage Love',
    duration: 171,
    coverImage: 'https://placehold.co/300x300?text=Savage+Love',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
  },
  {
    id: 'song-12',
    title: 'Dynamite',
    artist: 'BTS',
    album: 'Dynamite',
    duration: 199,
    coverImage: 'https://placehold.co/300x300?text=Dynamite',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
  },
  {
    id: 'song-13',
    title: 'Mood',
    artist: '24kGoldn, iann dior',
    album: 'Mood',
    duration: 141,
    coverImage: 'https://placehold.co/300x300?text=Mood',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
  },
  {
    id: 'song-14',
    title: 'Positions',
    artist: 'Ariana Grande',
    album: 'Positions',
    duration: 173,
    coverImage: 'https://placehold.co/300x300?text=Positions',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
  },
  {
    id: 'song-15',
    title: 'Drivers License',
    artist: 'Olivia Rodrigo',
    album: 'Drivers License',
    duration: 242,
    coverImage: 'https://placehold.co/300x300?text=Drivers+License',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
  },
];

// Mock playlists
export const mockPlaylists: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'My Favorites',
    description: 'A collection of my favorite songs',
    coverImage: 'https://placehold.co/300x300?text=My+Favorites',
    userId: 'user-1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    songCount: 5,
  },
  {
    id: 'playlist-2',
    name: 'Workout Mix',
    description: 'Energetic songs for workout sessions',
    coverImage: 'https://placehold.co/300x300?text=Workout+Mix',
    userId: 'user-1',
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    songCount: 3,
  },
  {
    id: 'playlist-3',
    name: 'Chill Vibes',
    description: 'Relaxing songs for chill moments',
    coverImage: 'https://placehold.co/300x300?text=Chill+Vibes',
    userId: 'user-1',
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z',
    songCount: 4,
  },
];

// Mock playlist details with songs
export const mockPlaylistDetails: PlaylistDetail[] = [
  {
    ...mockPlaylists[0],
    songs: [
      {
        id: 'ps-1',
        playlistId: 'playlist-1',
        songId: 'song-1',
        order: 1,
        addedAt: '2023-01-01T00:00:00Z',
        song: mockSongs[0],
      },
      {
        id: 'ps-2',
        playlistId: 'playlist-1',
        songId: 'song-3',
        order: 2,
        addedAt: '2023-01-01T00:10:00Z',
        song: mockSongs[2],
      },
      {
        id: 'ps-3',
        playlistId: 'playlist-1',
        songId: 'song-5',
        order: 3,
        addedAt: '2023-01-01T00:20:00Z',
        song: mockSongs[4],
      },
      {
        id: 'ps-4',
        playlistId: 'playlist-1',
        songId: 'song-7',
        order: 4,
        addedAt: '2023-01-01T00:30:00Z',
        song: mockSongs[6],
      },
      {
        id: 'ps-5',
        playlistId: 'playlist-1',
        songId: 'song-9',
        order: 5,
        addedAt: '2023-01-01T00:40:00Z',
        song: mockSongs[8],
      },
    ],
  },
  {
    ...mockPlaylists[1],
    songs: [
      {
        id: 'ps-6',
        playlistId: 'playlist-2',
        songId: 'song-2',
        order: 1,
        addedAt: '2023-01-02T00:00:00Z',
        song: mockSongs[1],
      },
      {
        id: 'ps-7',
        playlistId: 'playlist-2',
        songId: 'song-6',
        order: 2,
        addedAt: '2023-01-02T00:10:00Z',
        song: mockSongs[5],
      },
      {
        id: 'ps-8',
        playlistId: 'playlist-2',
        songId: 'song-10',
        order: 3,
        addedAt: '2023-01-02T00:20:00Z',
        song: mockSongs[9],
      },
    ],
  },
  {
    ...mockPlaylists[2],
    songs: [
      {
        id: 'ps-9',
        playlistId: 'playlist-3',
        songId: 'song-4',
        order: 1,
        addedAt: '2023-01-03T00:00:00Z',
        song: mockSongs[3],
      },
      {
        id: 'ps-10',
        playlistId: 'playlist-3',
        songId: 'song-8',
        order: 2,
        addedAt: '2023-01-03T00:10:00Z',
        song: mockSongs[7],
      },
      {
        id: 'ps-11',
        playlistId: 'playlist-3',
        songId: 'song-12',
        order: 3,
        addedAt: '2023-01-03T00:20:00Z',
        song: mockSongs[11],
      },
      {
        id: 'ps-12',
        playlistId: 'playlist-3',
        songId: 'song-14',
        order: 4,
        addedAt: '2023-01-03T00:30:00Z',
        song: mockSongs[13],
      },
    ],
  },
];

// Mock API functions that use local storage for persistence
// This allows for data to persist across page refreshes during development

// Helper function to initialize localStorage
const initLocalStorage = () => {
  if (!localStorage.getItem('mockUser')) {
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
  }
  
  if (!localStorage.getItem('mockSongs')) {
    localStorage.setItem('mockSongs', JSON.stringify(mockSongs));
  }
  
  if (!localStorage.getItem('mockPlaylists')) {
    localStorage.setItem('mockPlaylists', JSON.stringify(mockPlaylists));
  }
  
  if (!localStorage.getItem('mockPlaylistDetails')) {
    localStorage.setItem('mockPlaylistDetails', JSON.stringify(mockPlaylistDetails));
  }
};

// Initialize localStorage on import
initLocalStorage();

// Helper functions to get and set data from localStorage
export const getMockUser = (): User => {
  return JSON.parse(localStorage.getItem('mockUser') || JSON.stringify(mockUser));
};

export const getMockSongs = (): Song[] => {
  return JSON.parse(localStorage.getItem('mockSongs') || JSON.stringify(mockSongs));
};

export const getMockPlaylists = (): Playlist[] => {
  return JSON.parse(localStorage.getItem('mockPlaylists') || JSON.stringify(mockPlaylists));
};

export const getMockPlaylistDetails = (): PlaylistDetail[] => {
  return JSON.parse(localStorage.getItem('mockPlaylistDetails') || JSON.stringify(mockPlaylistDetails));
};

export const setMockUser = (user: User) => {
  localStorage.setItem('mockUser', JSON.stringify(user));
};

export const setMockSongs = (songs: Song[]) => {
  localStorage.setItem('mockSongs', JSON.stringify(songs));
};

export const setMockPlaylists = (playlists: Playlist[]) => {
  localStorage.setItem('mockPlaylists', JSON.stringify(playlists));
};

export const setMockPlaylistDetails = (playlistDetails: PlaylistDetail[]) => {
  localStorage.setItem('mockPlaylistDetails', JSON.stringify(playlistDetails));
};

// Function to search songs by query
export const mockSearchSongs = (query: string): Song[] => {
  const songs = getMockSongs();
  if (!query) return songs.slice(0, 10); // Return first 10 songs if no query
  
  const lowerQuery = query.toLowerCase();
  return songs.filter(
    song => 
      song.title.toLowerCase().includes(lowerQuery) || 
      song.artist.toLowerCase().includes(lowerQuery) || 
      (song.album && song.album.toLowerCase().includes(lowerQuery))
  );
};

// Function to add a song to a playlist
export const mockAddSongToPlaylist = (playlistId: string, songId: string): void => {
  const playlistDetails = getMockPlaylistDetails();
  const songs = getMockSongs();
  const playlists = getMockPlaylists();
  
  // Find the playlist
  const playlistIndex = playlistDetails.findIndex(p => p.id === playlistId);
  if (playlistIndex === -1) return;
  
  // Find the song
  const song = songs.find(s => s.id === songId);
  if (!song) return;
  
  // Check if song already exists in playlist
  if (playlistDetails[playlistIndex].songs.some(s => s.songId === songId)) return;
  
  // Add song to playlist
  const newSong = {
    id: `ps-${Date.now()}`,
    playlistId,
    songId,
    order: playlistDetails[playlistIndex].songs.length + 1,
    addedAt: new Date().toISOString(),
    song,
  };
  
  playlistDetails[playlistIndex].songs.push(newSong);
  
  // Update song count in playlists
  const playlistToUpdateIndex = playlists.findIndex(p => p.id === playlistId);
  if (playlistToUpdateIndex !== -1) {
    playlists[playlistToUpdateIndex].songCount = playlistDetails[playlistIndex].songs.length;
  }
  
  // Save changes
  setMockPlaylistDetails(playlistDetails);
  setMockPlaylists(playlists);
};

// Function to remove a song from a playlist
export const mockRemoveSongFromPlaylist = (playlistId: string, songId: string): void => {
  const playlistDetails = getMockPlaylistDetails();
  const playlists = getMockPlaylists();
  
  // Find the playlist
  const playlistIndex = playlistDetails.findIndex(p => p.id === playlistId);
  if (playlistIndex === -1) return;
  
  // Remove song from playlist
  playlistDetails[playlistIndex].songs = playlistDetails[playlistIndex].songs.filter(
    s => s.songId !== songId
  );
  
  // Reorder remaining songs
  playlistDetails[playlistIndex].songs.forEach((s, index) => {
    s.order = index + 1;
  });
  
  // Update song count in playlists
  const playlistToUpdateIndex = playlists.findIndex(p => p.id === playlistId);
  if (playlistToUpdateIndex !== -1) {
    playlists[playlistToUpdateIndex].songCount = playlistDetails[playlistIndex].songs.length;
  }
  
  // Save changes
  setMockPlaylistDetails(playlistDetails);
  setMockPlaylists(playlists);
};

// Function to create a new playlist
export const mockCreatePlaylist = (
  name: string,
  description?: string,
  coverImage?: string
): Playlist => {
  const playlists = getMockPlaylists();
  const playlistDetails = getMockPlaylistDetails();
  const userId = getMockUser().id;
  
  // Create new playlist
  const newPlaylist: Playlist = {
    id: `playlist-${Date.now()}`,
    name,
    description,
    coverImage: coverImage || `https://placehold.co/300x300?text=${encodeURIComponent(name)}`,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    songCount: 0,
  };
  
  // Create new playlist detail
  const newPlaylistDetail: PlaylistDetail = {
    ...newPlaylist,
    songs: [],
  };
  
  // Add to storage
  playlists.push(newPlaylist);
  playlistDetails.push(newPlaylistDetail);
  
  setMockPlaylists(playlists);
  setMockPlaylistDetails(playlistDetails);
  
  return newPlaylist;
};

// Function to update a playlist
export const mockUpdatePlaylist = (
  id: string,
  data: { name?: string; description?: string; coverImage?: string }
): Playlist | null => {
  const playlists = getMockPlaylists();
  const playlistDetails = getMockPlaylistDetails();
  
  // Find the playlist
  const playlistIndex = playlists.findIndex(p => p.id === id);
  if (playlistIndex === -1) return null;
  
  // Update the playlist
  if (data.name) playlists[playlistIndex].name = data.name;
  if (data.description !== undefined) playlists[playlistIndex].description = data.description;
  if (data.coverImage) playlists[playlistIndex].coverImage = data.coverImage;
  playlists[playlistIndex].updatedAt = new Date().toISOString();
  
  // Update the playlist detail
  const playlistDetailIndex = playlistDetails.findIndex(p => p.id === id);
  if (playlistDetailIndex !== -1) {
    if (data.name) playlistDetails[playlistDetailIndex].name = data.name;
    if (data.description !== undefined) playlistDetails[playlistDetailIndex].description = data.description;
    if (data.coverImage) playlistDetails[playlistDetailIndex].coverImage = data.coverImage;
    playlistDetails[playlistDetailIndex].updatedAt = new Date().toISOString();
  }
  
  // Save changes
  setMockPlaylists(playlists);
  setMockPlaylistDetails(playlistDetails);
  
  return playlists[playlistIndex];
};

// Function to delete a playlist
export const mockDeletePlaylist = (id: string): void => {
  const playlists = getMockPlaylists();
  const playlistDetails = getMockPlaylistDetails();
  
  // Remove the playlist
  const filteredPlaylists = playlists.filter(p => p.id !== id);
  const filteredPlaylistDetails = playlistDetails.filter(p => p.id !== id);
  
  // Save changes
  setMockPlaylists(filteredPlaylists);
  setMockPlaylistDetails(filteredPlaylistDetails);
};