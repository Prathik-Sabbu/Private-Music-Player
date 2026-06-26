import React from 'react';
import { usePlayerStore } from '../store/playerStore';

const SongRow = ({ song, songList = [] }) => {
    const playSong = usePlayerStore((state) => state.playSong);
    const currentSong = usePlayerStore((state) => state.currentSong);
    const isPlaying = usePlayerStore((state) => state.isPlaying);
    
    const isCurrent = currentSong?.id === song.id;

    return (
        <div 
            onClick={() => playSong(song, songList)}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${
                isCurrent ? 'bg-white/10' : 'hover:bg-white/5 active:scale-[0.99]'
            }`}>
                
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <img src={song.cover} alt={song.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-md" />
                
                <div className="min-w-0 flex-1">
                    <p className={`text-[15px] font-medium truncate ${isCurrent ? 'text-red-500' : 'text-white'}`}>
                        {song.title}
                    </p>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">{song.artist}</p>
                </div>
            </div>

            {isCurrent && (
                <div className="flex gap-[3px] items-end h-3 px-2 flex-shrink-0">
                    <div 
                        className={`w-[3px] bg-red-500 rounded-full transition-all duration-300 ${
                            isPlaying 
                                ? 'h-full origin-bottom animate-[bounceUp_0.8s_ease-in-out_infinite_alternate]' 
                                : 'h-[3px]' 
                        }`} />
                    
                    <div 
                        className={`w-[3px] bg-red-500 rounded-full transition-all duration-300 ${
                            isPlaying 
                                ? 'h-3/5 origin-bottom animate-[bounceUp_0.5s_ease-in-out_infinite_alternate_0.15s]' 
                                : 'h-[3px]' 
                        }`} />
                    
                    <div 
                        className={`w-[3px] bg-red-500 rounded-full transition-all duration-300 ${
                            isPlaying 
                                ? 'h-4/5 origin-bottom animate-[bounceUp_0.65s_ease-in-out_infinite_alternate_0.3s]' 
                                : 'h-[3px]' 
                        }`} />
                </div>
            )}
        </div>
    );
};

export default SongRow;