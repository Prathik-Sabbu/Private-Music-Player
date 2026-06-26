import React from 'react';
import { usePlayerStore } from '../store/playerStore';

const SongCard = ({ song, songList = [] }) => {
    const playSong = usePlayerStore((state) => state.playSong);
    const currentSong = usePlayerStore((state) => state.currentSong);
    const isPlaying = usePlayerStore((state) => state.isPlaying);

    const isCurrent = currentSong?.id === song.id;
    const titleColor = 'text-white';

    return (
        <div 
            onClick={() => playSong(song, songList)} 
            className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all duration-200 select-none isolate hover:opacity-90 active:scale-95"
        >
            <img src={song.cover} alt={song.title} className="w-full h-full object-cover"/>

            {isCurrent && (
                <div className="absolute inset-[2px] border-[4px] border-white rounded-[14px] pointer-events-none z-30" />
            )}

            {isCurrent && (
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-[4px] bg-transparent pointer-events-none">
                    <div className="w-[4px] flex items-center justify-center transition-all duration-700 ease-in-out" style={{ height: isPlaying ? '24px' : '4px' }}>
                        <div style={{ '--eq-duration': '0.8s', '--eq-delay': '0s', animationPlayState: isPlaying ? 'running' : 'paused' }}
                             className="w-full h-full bg-white rounded-full eq-bar-smooth transition-all duration-700 ease-in-out"/>
                    </div>
                    <div className="w-[4px] flex items-center justify-center transition-all duration-700 ease-in-out" style={{ height: isPlaying ? '24px' : '4px' }}>
                        <div style={{ '--eq-duration': '0.5s', '--eq-delay': '0.15s', animationPlayState: isPlaying ? 'running' : 'paused' }}
                             className="w-full h-full bg-white rounded-full eq-bar-smooth transition-all duration-700 ease-in-out"/>
                    </div>
                    <div className="w-[4px] flex items-center justify-center transition-all duration-700 ease-in-out" style={{ height: isPlaying ? '24px' : '4px' }}>
                        <div style={{ '--eq-duration': '0.65s', '--eq-delay': '0.3s', animationPlayState: isPlaying ? 'running' : 'paused' }}
                             className="w-full h-full bg-white rounded-full eq-bar-smooth transition-all duration-700 ease-in-out"/>
                    </div>
                </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-8 pb-3 px-3 flex items-end">
                <p className={`text-[14px] font-semibold tracking-wide truncate w-full ${titleColor}`}>
                    {song.title}
                </p>
            </div>
        </div>
    );
};

export default SongCard;