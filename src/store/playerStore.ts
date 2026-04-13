import { create } from 'zustand';

type PlayerState = {
    currentSong: any;
    currentSongList: any[];
    queue: any[];
    isPlaying: boolean;
    progress: number;
    shuffle: boolean;
    repeatMode : 'off' | 'repeat' | 'repeatOne';
    volume: number;

    playsong: (song: any, songList: any[]) => void;
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
}

const audio = new Audio();

export const usePlayerStore = create<PlayerState>((set, get) => ({
    currentSong: null,
    currentSongList: [],
    queue: [],
    isPlaying: false,
    progress: 0,
    shuffle: false,
    repeatMode: 'off',
    volume: 1,

    playsong: (song, songList) => {
        set ({currentSong: song, 
                        currentSongList: songList,
                        queue: songList.slice(songList.indexOf(song) + 1), 
                        isPlaying: true, progress: 0 });

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
        if (repeatMode === 'repeatOne') {
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }
            return;
        }

        if (queue.length === 0) {
            if (repeatMode === 'repeat') {
                const newQueue = shuffle ? [...currentSongList].sort(() => Math.random() - 0.5) : currentSongList.slice(currentSongList.indexOf(currentSong) + 1);
                set({ queue: newQueue });
            } else {
                set({ isPlaying: false });
                return;
            }
        }
        const nextSong = queue[0];
        set({ currentSong: nextSong, queue: queue.slice(1) });
        if (audio) {
            audio.src = nextSong.src;
            audio.currentTime = 0;
            audio.play();
        }
    },
    
    prevSong: () => {
        if(audio && audio.currentTime > 3) {
            audio.currentTime = 0;
            audio.play();
            return;
        }

        const { currentSong, currentSongList, queue, isPlaying } = get();
        const currentIndex = currentSongList.indexOf(currentSong);
        if (currentIndex > 0) {
            const previousSong = currentSongList[currentIndex - 1];
            set({ currentSong: previousSong, queue: [currentSong, ...queue] });
            if (audio) {
                audio.src = previousSong.src;
                audio.currentTime = 0;
                audio.play();
            }
        } else {
            audio.currentTime = 0;
            if (isPlaying) {
                audio.play();
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
    }

}));

audio.onended = () => {
    const store = usePlayerStore.getState();
    store.nextSong();
};

audio.ontimeupdate = () => {
    usePlayerStore.setState({ progress: audio.currentTime });
};
