import { usePlayerStore } from '../store/playerStore';
import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Repeat, Repeat1 } from 'lucide-react';

const PlayerBar = ({onClick}) => {
    const currentSong = usePlayerStore((state) => state.currentSong);
    const isPlaying = usePlayerStore((state) => state.isPlaying);
    const progress = usePlayerStore((state) => state.progress);
    const repeatMode = usePlayerStore((state) => state.repeatMode);
    const pauseResume = usePlayerStore((state) => state.pauseResume);
    const nextSong = usePlayerStore((state) => state.nextSong);
    const prevSong = usePlayerStore((state) => state.prevSong);
    const toggleRepeat = usePlayerStore((state) => state.toggleRepeat);

    if (!currentSong) return null;

    const progressPercent = currentSong.duration > 0 
        ? (progress / currentSong.duration) * 100 
        : 0;


    return (
        <div onClick={onClick} className="relative w-full bg-[#121212]/95 backdrop-blur-md text-white px-4 py-2 flex items-center justify-between h-16 border-b border-white/5 cursor-pointer">
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-800">
                <div 
                    className="h-full bg-red-600 transition-all duration-300 ease-linear" 
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <div className="flex items-center gap-3 w-auto max-w-[50%] min-w-0 flex-shrink-0">
                <img 
                    src={currentSong.cover} 
                    alt={currentSong.title} 
                    className="w-11 h-11 rounded object-cover shadow-md flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-white truncate">
                        {currentSong.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                        {currentSong.artist}{currentSong.features && currentSong.features.length > 0 ? ` (feat. ${currentSong.features.join(', ')})` : ''}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 pr-1">
                <button 
                    onClick={(e) => { e.stopPropagation(); toggleRepeat();}}
                    className="text-gray-500 hover:text-gray-300 transition p-1">
                    {repeatMode === 'repeatOne' ? (
                        <Repeat1 size={18} className="text-red-500" />
                    ) : (
                        <Repeat size={18} className={repeatMode === 'repeat' ? 'text-white' : 'text-zinc-600'} />
                    )}
                </button>

                <button 
                    onClick={(e) => { e.stopPropagation(); prevSong();}}
                    className="text-gray-400 hover:text-white active:scale-95 transition p-1"
                >
                    <SkipBack size={20} fill="currentColor" />
                </button>

                <button 
                    onClick={(e) => { e.stopPropagation(); pauseResume();}}
                    className="bg-white text-black p-2 rounded-full hover:scale-105 active:scale-95 transition shadow-md flex items-center justify-center"
                >
                    {isPlaying ? (
                        <Pause size={18} fill="currentColor" />
                    ) : (
                        <Play size={18} fill="currentColor" className="ml-[2px]" />
                    )}
                </button>

                <button 
                    onClick={(e) => { e.stopPropagation(); nextSong();}}
                    className="text-gray-400 hover:text-white active:scale-95 transition p-1"
                >
                    <SkipForward size={20} fill="currentColor" />
                </button>
            </div>
        </div>
    );
}

export default PlayerBar;