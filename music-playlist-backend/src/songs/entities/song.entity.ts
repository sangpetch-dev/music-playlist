export interface Song {
    id?: string;
    title: string;
    artist: string;
    album?: string;
    duration: number;
    releaseYear?: number;
    genre?: string;
    coverImage?: string;
    previewUrl?: string;
    externalId?: string;
    externalUrl?: string;
    source?: string;
    popularity?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }