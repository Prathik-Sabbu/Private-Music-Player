import { usePlayerStore } from '../store/playerStore';
import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Repeat, Repeat1, ChevronDown, Shuffle, Heart} from 'lucide-react';
import { useState } from 'react';
import { use } from 'react';

const NowPlayingSheet = ({ isOpen, onClose }) => {
    const currentSong = usePlayerStore((state) => state.currentSong);
    const isPlaying = usePlayerStore((state) => state.isPlaying);
    const progress = usePlayerStore((state) => state.progress);
    const repeatMode = usePlayerStore((state) => state.repeatMode);
    const shuffle = usePlayerStore((state) => state.shuffle);
    const likedsongIndex = usePlayerStore((state) => state.likedsongIndex);

    const pauseResume = usePlayerStore((state) => state.pauseResume);
    const nextSong = usePlayerStore((state) => state.nextSong);
    const prevSong = usePlayerStore((state) => state.prevSong);
    const toggleRepeat = usePlayerStore((state) => state.toggleRepeat);
    const toggleShuffle = usePlayerStore((state) => state.toggleShuffle);
    const setProgress = usePlayerStore((state) => state.setProgress);
    const toggleLiked = usePlayerStore((state) => state.toggleLiked);

    const isLiked = currentSong && likedsongIndex ? likedsongIndex.includes(currentSong.id) : false;
    if (!currentSong) return null;
    return (
        <div 
            className={`fixed inset-0 bg-[#030303] text-white z-[60] flex flex-col justify-between p-6 transition-transform duration-300 ease-out ${
                isOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
            <div className="flex items-center justify-between w-full">
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition active:scale-95">
                    <ChevronDown size={28} />
                </button>
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Now Playing</span>
                <div className="w-10 h-10" />  
            </div>

            <div className="flex items-center justify-center max-w-[375px] max-h-[375px] mx-auto w-full my-auto">
                <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className={`w-full aspect-square object-cover rounded-2xl shadow-2xl transition-transform duration-500 ${
                        isPlaying ? 'scale-100' : 'scale-95 opacity-80'
                    }`}
                />
            </div>

            <div className="w-full max-w-sm mx-auto flex flex-col gap-4 px-2">
                <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold truncate text-white">
                            {currentSong.title}
                        </h2>
                        <p className="text-sm text-zinc-400 truncate mt-1">
                            {currentSong.artist}
                        </p>
                    </div>
                    <button onClick={() => toggleLiked(currentSong.id)}
                    className="p-2 flex-shrink-0 transition active:scale-90">
                        <Heart size={24} className={isLiked ? 'fill-red-500 text-red-500' : 'text-zinz-500 hover:text-zinc-300'}/>
                    </button>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                    <div className="relative w-full h-1 bg-zinc-800 rounded-full group cursor-pointer">
                        <div 
                            className="absolute h-full bg-red-600 rounded-full group-hover:bg-red-500" 
                            style={{ width: `${currentSong.duration > 0 ? (progress / currentSong.duration) * 100 : 0}%` }}
                        />
                        <input 
                            type="range"
                            min="0"
                            max={currentSong.duration || 100}
                            value={progress}
                            onChange={(e) => setProgress(Number(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
                        <span>{Math.floor(progress / 60)}:{String(Math.floor(progress % 60)).padStart(2, '0')}</span>
                        <span>{Math.floor(currentSong.duration / 60)}:{String(Math.floor(currentSong.duration % 60)).padStart(2, '0')}</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-sm mx-auto flex items-center justify-between mt-4 mb-8 px-2">
                <button onClick={toggleShuffle}
                className={`p-2 transition active:scale-95 ${shuffle ? 'text-red-500' : 'text-zinc-500 hover:text-white'}`}>
                    <Shuffle size={20}/>
                </button>

                <button onClick={() => {prevSong();}}
                className="p-2 text-zinc-300 hover:text-white transition active:scale-90">
                    <SkipBack size={28} fill="currentColor"/>
                </button>

                <button onClick={pauseResume}
                className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition">
                    {isPlaying ? <Pause size={28} fill="currentColor"/> : <Play size={28} fill="currentColor" className="ml-[3px]"/>}
                </button>

                <button onClick={() => {nextSong();}}
                className="p-2 text-zinc-300 hover:text-white transition active:scale-90">
                    <SkipForward size={28} fill="currentColor"/>
                </button>

                <button onClick={toggleRepeat} className="p-2 transition active:scale-95">
                {repeatMode === 'repeatOne' ? (
                    <Repeat1 size={20} className="text-red-500" />
                ) : (
                    <Repeat size={20} className={repeatMode === 'repeat' ? 'text-white' : 'text-zinc-500'} />
                )}
                </button>
            </div>

            <div className="w-full flex items-center justify-center pb-2">
                <button onClick={() => alert("Open Queue Sheet Modal Here")}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-300 transition underline decoration-zinc-600 underline-offset-4 tracking-wider uppercase">
                    Your Queue
                </button>
            </div>
        </div>
    );
};

export default NowPlayingSheet;