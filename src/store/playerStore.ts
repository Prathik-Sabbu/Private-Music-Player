import { create } from 'zustand';

type PlayerState = {
    currentSong: any;
    currentSongList: any[];
    queue: any[];
    isPlaying: boolean;
    progress: number;
    shuffle: boolean;
    repeatMode: 'off' | 'repeat' | 'repeatOne';
    volume: number;

    playSong: (song: any, songList: any[]) => void;
    pauseResume: () => void;
    toggleShuffle: () => void;
    nextSong: () => void;
    prevSong: () => void;
    setProgress: (seconds: number) => void;
    setVolume: (volume: number) => void;
    toggleRepeat: () => void;
    addToQueue: (song: any) => void;
    addToQueueNext: (song: any) => void;
    moveInQueue: (fromIndex: number, toIndex: number) => void;
    removeFromQueue: (index: number) => void;
    clearQueue: () => void;
    likedsongIndex: string[];
    toggleLiked: (songId: string) => void;
    recentlyPlayed: { songId: string, timestamp: number }[];
    addToRecentlyPlayed: (songId: string) => void;
}

const audio = new Audio();
let currentTrackLogged = false;

export const usePlayerStore = create<PlayerState>((set, get) => ({
    currentSong: null,
    currentSongList: [],
    queue: [],
    currentQueue: [],
    isPlaying: false,
    progress: 0,
    shuffle: false,
    repeatMode: 'off',
    volume: 1,
    recentlyPlayed: [],

    playSong: (song, songList) => {
        set({
            currentSong: song,
            currentSongList: songList,
            queue: songList.slice(songList.indexOf(song) + 1),
            isPlaying: true, progress: 0
        });

        currentTrackLogged = false;

        if (audio) {
            audio.src = song.src;
            audio.currentTime = 0;
            audio.play();
        }
    },

    pauseResume: () => {
        const { isPlaying } = get();
        set({ isPlaying: !isPlaying });
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
    },

    toggleShuffle: () => {
        const { shuffle, queue, currentSongList, currentSong } = get();
        set({ shuffle: !shuffle });
        if (shuffle) {
            set({ queue: currentSongList.slice(currentSongList.indexOf(currentSong) + 1) });
        }
        else {
            set({ queue: queue.sort(() => Math.random() - 0.5) });
        }
    },

    nextSong: () => {
        const { repeatMode, queue, currentSongList, shuffle, currentSong } = get();
        let currentQueue = queue;
        if (repeatMode === 'repeatOne') {
            if (audio) {
                audio.currentTime = 0;
                audio.play();
                currentTrackLogged = false;
            }
            return;
        }

        if (queue.length === 0) {
            if (repeatMode === 'repeat') {
                const newQueue = shuffle ? [...currentSongList].sort(() => Math.random() - 0.5) : [...currentSongList];
                set({ queue: newQueue });
                currentQueue = newQueue;
            } else {
                set({ isPlaying: false });
                return;
            }
        }
        const nextSong = currentQueue[0];
        set({ currentSong: nextSong, queue: currentQueue.slice(1) });
        currentTrackLogged = false;
        if (audio) {
            audio.src = nextSong.src;
            audio.currentTime = 0;
            audio.play();
            set({ isPlaying: true });
        }
    },

    prevSong: () => {
        if (audio && audio.currentTime > 3) {
            audio.currentTime = 0;
            audio.play();
            currentTrackLogged = false;
            return;
        }

        const { currentSong, currentSongList, queue, isPlaying } = get();
        const currentIndex = currentSongList.indexOf(currentSong);
        if (currentIndex > 0) {
            const previousSong = currentSongList[currentIndex - 1];
            set({ currentSong: previousSong, queue: [currentSong, ...queue] });
            currentTrackLogged = false;
            if (audio) {
                audio.src = previousSong.src;
                audio.currentTime = 0;
                audio.play();
                set({ isPlaying: true });
            }
        } else {
            audio.currentTime = 0;
            if (isPlaying) {
                audio.play();
                currentTrackLogged = false;
            }
        }
    },

    setProgress: (seconds) => {
        set({ progress: seconds });

        if (audio && Math.abs(audio.currentTime - seconds) > 0.5) {
            audio.currentTime = seconds;
        }
    },

    setVolume: (volume) => {
        set({ volume });
        if (audio) {
            audio.volume = volume;
        }
    },

    toggleRepeat: () => {
        const modes = ['off', 'repeat', 'repeatOne'];
        const { repeatMode } = get();
        const currentIndex = modes.indexOf(repeatMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        set({ repeatMode: modes[nextIndex] as 'off' | 'repeat' | 'repeatOne' });
    },

    addToQueue: (song) => {
        const { queue } = get();
        set({ queue: [...queue, song] });
    },

    addToQueueNext: (song) => {
        const { queue } = get();
        set({ queue: [song, ...queue] });
    },

    moveInQueue: (fromIndex, toIndex) => {
        const { queue } = get();
        const updatedQueue = [...queue];
        const [movedSong] = updatedQueue.splice(fromIndex, 1);
        updatedQueue.splice(toIndex, 0, movedSong);
        set({ queue: updatedQueue });
    },

    removeFromQueue: (index) => {
        const { queue } = get();
        const updatedQueue = [...queue];
        updatedQueue.splice(index, 1);
        set({ queue: updatedQueue });
    },

    clearQueue: () => {
        set({ queue: [] });
    },

    likedsongIndex: [],

    toggleLiked: (songId: string) => {
        const { likedsongIndex } = get();
        if (likedsongIndex.includes(songId)) {
            set({ likedsongIndex: likedsongIndex.filter((id) => id !== songId) });
        } else {
            set({ likedsongIndex: [...likedsongIndex, songId] });
        }
    },

    addToRecentlyPlayed: (songId: string) => {
        const { recentlyPlayed } = get();
        if (recentlyPlayed.length > 0 && recentlyPlayed[0].songId === songId) {
            set({
                recentlyPlayed: [
                    { songId, timestamp: Date.now() },
                    ...recentlyPlayed.slice(1)
                ]
            });
        } else {
            set({
                recentlyPlayed: [
                    { songId, timestamp: Date.now() },
                    ...recentlyPlayed
                ]
            });
        }
    },

}));

audio.onended = () => {
    const store = usePlayerStore.getState();
    store.nextSong();
};

audio.ontimeupdate = () => {
    usePlayerStore.setState({ progress: audio.currentTime });

    const store = usePlayerStore.getState();
    const currentSong = store.currentSong;
    if (currentSong && !currentTrackLogged) {
        const duration = currentSong.duration || audio.duration;
        if (duration) {
            if (audio.currentTime >= 30 || audio.currentTime >= duration / 2) {
                store.addToRecentlyPlayed(currentSong.id);
                currentTrackLogged = true;
            }
        }
    }
};
