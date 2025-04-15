import React, { createContext, useState, useRef, useEffect } from 'react';
import { Song } from '../types/song.types';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  queue: Song[];
  play: (song: Song) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  addToQueue: (song: Song) => void;
  clearQueue: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

const initialState: PlayerContextType = {
  currentSong: null,
  isPlaying: false,
  duration: 0,
  currentTime: 0,
  volume: 0.5,
  queue: [],
  play: () => {},
  togglePlay: () => {},
  setVolume: () => {},
  seek: () => {},
  addToQueue: () => {},
  clearQueue: () => {},
  playNext: () => {},
  playPrevious: () => {},
};

export const PlayerContext = createContext<PlayerContextType>(initialState);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.5);
  const [queue, setQueue] = useState<Song[]>([]);
  const [history, setHistory] = useState<Song[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      
      audioRef.current.addEventListener('ended', () => {
        playNext();
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = (song: Song) => {
    if (currentSong) {
      setHistory([...history, currentSong]);
    }
    
    setCurrentSong(song);
    
    if (audioRef.current) {
      audioRef.current.src = song.previewUrl || '';
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    }
  };

  const togglePlay = () => {
    if (!currentSong) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const addToQueue = (song: Song) => {
    setQueue([...queue, song]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  const playNext = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      const remainingQueue = queue.slice(1);
      setQueue(remainingQueue);
      play(nextSong);
    } else if (currentSong) {
      // If no queue, just stop playback
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const playPrevious = () => {
    if (currentTime > 3) {
      // If current song is playing for more than 3 seconds, restart it
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else if (history.length > 0) {
      // Play the last song from history
      const previousSong = history[history.length - 1];
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      
      // Add current song to beginning of queue
      if (currentSong) {
        setQueue([currentSong, ...queue]);
      }
      
      play(previousSong);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        duration,
        currentTime,
        volume,
        queue,
        play,
        togglePlay,
        setVolume,
        seek,
        addToQueue,
        clearQueue,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
