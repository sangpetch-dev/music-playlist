import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi from 'spotify-web-api-node';
import { Song } from '../entities/song.entity';

@Injectable()
export class ExternalSearchService {
  private spotifyApi: SpotifyWebApi;
  private tokenExpirationTime: number = 0;

  constructor(private configService: ConfigService) {
    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      console.warn(
        'Spotify credentials not found in environment variables.',
        'Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env file.',
      );
    }

    this.spotifyApi = new SpotifyWebApi({
      clientId,
      clientSecret,
    });
  }

  private async ensureSpotifyToken(): Promise<void> {
    const now = Date.now();
    
    if (now >= this.tokenExpirationTime - 60000) { 
      try {
        const data = await this.spotifyApi.clientCredentialsGrant();
        const accessToken = data.body.access_token;
        const expiresIn = data.body.expires_in;
        
        this.spotifyApi.setAccessToken(accessToken);
        this.tokenExpirationTime = now + expiresIn * 1000;
        
        console.log('Successfully retrieved Spotify access token');
      } catch (error) {
        console.error('Error getting Spotify access token:', error);
        throw new HttpException(
          'Failed to authenticate with Spotify API',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async searchSpotify(query: string, limit: number = 20): Promise<Song[]> {
    try {
      await this.ensureSpotifyToken();
      
     
      const response = await this.spotifyApi.searchTracks(query, { limit });
      
      
      return response.body.tracks.items.map(track => ({
        id: `spotify-${track.id}`,
        title: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        duration: Math.floor(track.duration_ms / 1000),
        coverImage: track.album.images[0]?.url || '',
        previewUrl: track.preview_url,
        externalId: track.id,
        externalUrl: track.external_urls.spotify,
        source: 'spotify',
        popularity: track.popularity,
        releaseYear: new Date(track.album.release_date).getFullYear(),
        genre: '',
      }));
    } catch (error) {
      console.error('Error searching Spotify:', error);
      return [];
    }
  }
}