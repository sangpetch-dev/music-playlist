import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getTrendingSongs } from '../services/song.service';
import { getPlaylists } from '../services/playlist.service';
import { Song } from '../types/song.types';
import { Playlist } from '../types/playlist.types';
import SongItem from '../components/music/SongItem';
import PlaylistCard from '../components/music/PlaylistCard';
import { usePlayer } from '../hooks/usePlayer';
import { useAuth } from '../hooks/useAuth';

const HomeContainer = styled.div`
  padding: 2rem 2rem 90px;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const TrendingSongs = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { play } = usePlayer();
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([]);
  const [recentPlaylists, setRecentPlaylists] = useState<Playlist[]>([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState({
    songs: true,
    playlists: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const songs = await getTrendingSongs(10);
        setTrendingSongs(songs);
      } catch (error) {
        console.error('Failed to load trending songs:', error);
      } finally {
        setLoading(prevState => ({ ...prevState, songs: false }));
      }

      if (isAuthenticated) {
        try {
          const playlists = await getPlaylists();
          setRecentPlaylists(playlists.slice(0, 6));
          // For demo purposes, we'll use the same playlists for featured
          setFeaturedPlaylists(playlists.slice(0, 4));
        } catch (error) {
          console.error('Failed to load playlists:', error);
        } finally {
          setLoading(prevState => ({ ...prevState, playlists: false }));
        }
      } else {
        setLoading(prevState => ({ ...prevState, playlists: false }));
      }
    };

    loadData();
  }, [isAuthenticated]);

  const handlePlayPlaylist = (playlist: Playlist) => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <HomeContainer>
      {isAuthenticated && recentPlaylists.length > 0 && (
        <Section>
          <SectionTitle>Your Recent Playlists</SectionTitle>
          <PlaylistGrid>
            {loading.playlists
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      height: '240px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '4px',
                    }}
                  />
                ))
              : recentPlaylists.map(playlist => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onPlay={handlePlayPlaylist}
                  />
                ))}
          </PlaylistGrid>
        </Section>
      )}

      <Section>
        <SectionTitle>Trending Songs</SectionTitle>
        <TrendingSongs>
          {loading.songs
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    height: '60px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    margin: '0.5rem 0',
                    borderRadius: '4px',
                  }}
                />
              ))
            : trendingSongs.map((song, index) => (
                <SongItem
                  key={song.id}
                  song={song}
                  index={index + 1}
                  onAddToPlaylist={() => {}}
                />
              ))}
        </TrendingSongs>
      </Section>

      <Section>
        <SectionTitle>Featured Playlists</SectionTitle>
        <PlaylistGrid>
          {loading.playlists
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    height: '240px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '4px',
                  }}
                />
              ))
            : featuredPlaylists.map(playlist => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  onPlay={handlePlayPlaylist}
                />
              ))}
        </PlaylistGrid>
      </Section>
    </HomeContainer>
  );
};

export default Home;
