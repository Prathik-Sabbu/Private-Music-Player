import React from 'react';
import { usePlayerStore } from '../store/playerStore';

const SongRow = ({ song, songList = [] }) => {

    const playSong = usePlayerStore((state) => state.playSong);
    const isCurrent = usePlayerStore((state) => state.currentSong?.id === song.id);

    const titleColor = isCurrent ? 'text-[#ff0000]' : 'text-white';

    return (
        <div onClick={() => playSong(song, songList)} className={`flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors ${isCurrent ? 'bg-white/10' : ''}`}>
                <img src={song.cover} alt={song.title} className="w-12 h-12 rounded object-cover shadow-lg" />
                
                <div className="flex-1 min-w-0">
                    <p className={`text-[15px] font-semibold truncate ${titleColor}`}>{song.title}</p>
                    <p className="text-xs text-gray-400 truncate">{song.artist} · {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}</p>
                </div>

                {isCurrent && (
                <div className="flex gap-[2px] items-end h-3 mb-1">
                    <div className="w-1 bg-red-500 animate-pulse h-full"></div>
                    <div className="w-1 bg-red-500 animate-pulse h-2"></div>
                    <div className="w-1 bg-red-500 animate-pulse h-3"></div>
                </div>
            )}
        </div>
    );
}

export default SongRow;