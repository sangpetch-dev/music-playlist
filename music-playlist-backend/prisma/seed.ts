import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.playlistSong.deleteMany({});
  await prisma.playlist.deleteMany({});
  await prisma.song.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Database cleaned');

  const hashedPassword = await bcrypt.hash('password', 10);
  
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    },
  });

  console.log('Created test user:', user);

  const songs = await Promise.all([
    prisma.song.create({
      data: {
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        album: 'Divide',
        duration: 235,
        releaseYear: 2017,
        genre: 'Pop',
        coverImage: 'https://placehold.co/300x300?text=Shape+of+You',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
    }),
    prisma.song.create({
      data: {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 203,
        releaseYear: 2019,
        genre: 'Synth-pop',
        coverImage: 'https://placehold.co/300x300?text=Blinding+Lights',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      },
    }),
    prisma.song.create({
      data: {
        title: 'Dance Monkey',
        artist: 'Tones and I',
        album: 'The Kids Are Coming',
        duration: 210,
        releaseYear: 2019,
        genre: 'Pop',
        coverImage: 'https://placehold.co/300x300?text=Dance+Monkey',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      },
    }),
    prisma.song.create({
      data: {
        title: 'Don\'t Start Now',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        duration: 183,
        releaseYear: 2019,
        genre: 'Pop',
        coverImage: 'https://placehold.co/300x300?text=Dont+Start+Now',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      },
    }),
    prisma.song.create({
      data: {
        title: 'Watermelon Sugar',
        artist: 'Harry Styles',
        album: 'Fine Line',
        duration: 174,
        releaseYear: 2019,
        genre: 'Pop',
        coverImage: 'https://placehold.co/300x300?text=Watermelon+Sugar',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      },
    }),

    prisma.song.create({
      data: {
        title: 'Bad Guy',
        artist: 'Billie Eilish',
        album: 'When We All Fall Asleep, Where Do We Go?',
        duration: 194,
        releaseYear: 2019,
        genre: 'Electropop',
        coverImage: 'https://placehold.co/300x300?text=Bad+Guy',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      },
    }),

    prisma.song.create({
      data: {
        title: 'Circles',
        artist: 'Post Malone',
        album: 'Hollywood\'s Bleeding',
        duration: 215,
        releaseYear: 2019,
        genre: 'Pop',
        coverImage: 'https://placehold.co/300x300?text=Circles',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      },
    }),
    
    prisma.song.create({
      data: {
        title: 'Someone You Loved',
        artist: 'Lewis Capaldi',
        album: 'Divinely Uninspired to a Hellish Extent',
        duration: 182,
        releaseYear: 2019,
        genre: 'Pop',
        coverImage: 'https://placehold.co/300x300?text=Someone+You+Loved',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      },
    }),

    prisma.song.create({
      data: {
        title: 'Señorita',
        artist: 'Shawn Mendes, Camila Cabello',
        album: 'Señorita',
        duration: 191,
        releaseYear: 2019,
        genre: 'Pop',
        coverImage: 'https://placehold.co/300x300?text=Senorita',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
      },
    }),
    prisma.song.create({
      data: {
        title: 'Memories',
        artist: 'Maroon 5',
        album: 'Memories',
        duration: 189,
        releaseYear: 2019,
        genre: 'Pop',
        coverImage: 'https://placehold.co/300x300?text=Memories',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
      },
    }),
  ]);

  console.log(`Created ${songs.length} songs`);

  const playlists = await Promise.all([
    prisma.playlist.create({
      data: {
        name: 'My Favorites',
        description: 'A collection of my favorite songs',
        coverImage: 'https://placehold.co/300x300?text=My+Favorites',
        userId: user.id,
      },
    }),
    prisma.playlist.create({
      data: {
        name: 'Workout Mix',
        description: 'Energetic songs for workout sessions',
        coverImage: 'https://placehold.co/300x300?text=Workout+Mix',
        userId: user.id,
      },
    }),
    prisma.playlist.create({
      data: {
        name: 'Chill Vibes',
        description: 'Relaxing songs for chill moments',
        coverImage: 'https://placehold.co/300x300?text=Chill+Vibes',
        userId: user.id,
      },
    }),
  ]);

  console.log(`Created ${playlists.length} playlists`);

  await Promise.all([
    prisma.playlistSong.create({
      data: {
        playlistId: playlists[0].id,
        songId: songs[0].id,
        order: 1,
      },
    }),
    prisma.playlistSong.create({
      data: {
        playlistId: playlists[0].id,
        songId: songs[2].id,
        order: 2,
      },
    }),
    prisma.playlistSong.create({
      data: {
        playlistId: playlists[0].id,
        songId: songs[4].id,
        order: 3,
      },
    }),
    prisma.playlistSong.create({
      data: {
        playlistId: playlists[0].id,
        songId: songs[6].id,
        order: 4,
      },
    }),
    prisma.playlistSong.create({
      data: {
        playlistId: playlists[0].id,
        songId: songs[8].id,
        order: 5,
      },
    }),

    prisma.playlistSong.create({
      data: {
        playlistId: playlists[1].id,
        songId: songs[1].id,
        order: 1,
      },
    }),
    prisma.playlistSong.create({
      data: {
        playlistId: playlists[1].id,
        songId: songs[5].id,
        order: 2,
      },
    }),
    prisma.playlistSong.create({
      data: {
        playlistId: playlists[1].id,
        songId: songs[9].id,
        order: 3,
      },
    }),

    prisma.playlistSong.create({
      data: {
        playlistId: playlists[2].id,
        songId: songs[3].id,
        order: 1,
      },
    }),
    prisma.playlistSong.create({
      data: {
        playlistId: playlists[2].id,
        songId: songs[7].id,
        order: 2,
      },
    }),
  ]);

  console.log('Added songs to playlists');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });