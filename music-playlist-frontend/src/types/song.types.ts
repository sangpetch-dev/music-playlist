export interface Song {
    id: string;
    title: string;
    artist: string;
    album?: string;
    duration: number;
    coverImage?: string;
    previewUrl?: string;
    externalId?: string;
    externalUrl?: string
  }
  
  export interface SongSearchResult {
    songs: Song[];
    total: number;
    loading: boolean;
    error: string | null;
  }