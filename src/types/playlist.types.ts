import { Song } from "./song.types";

export interface Playlist {
    id: string;
    name: string;
    description?: string;
    coverImage?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    songCount?: number;
  }
  
  export interface PlaylistSong {
    id: string;
    playlistId: string;
    songId: string;
    order: number;
    addedAt: string;
    song: Song;
  }
  
  export interface PlaylistDetail extends Playlist {
    songs: PlaylistSong[];
  }