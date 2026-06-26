import React from 'react';
import { usePlayerStore } from '../store/playerStore';

const AlbumCard = ({ album, songList = [], onClick }) => {
    const playSong = usePlayerStore((state) => state.playSong);
    const currentAlbum = usePlayerStore((state) => state.currentAlbum);
    const isPlaying = usePlayerStore((state) => state.isPlaying);

    const isCurrent = currentAlbum?.name === album.name;
    const titleColor = 'text-white';

    const handleCardClick = () => {
        if (onClick) {
            onClick(); 
        } else if (songList.length > 0) {
            playSong(songList[0], songList); 
        }
    };

    return (
        <div 
            onClick={handleCardClick} 
            className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all duration-200 select-none isolate hover:opacity-90 active:scale-95"
        >
            <img src={album.cover} alt={album.name} className="w-full h-full object-cover"/>

            {isCurrent && (
                <div className="absolute inset-[2px] border-[4px] border-white rounded-[14px] pointer-events-none z-30" />
            )}

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-8 pb-3 px-3 flex items-end">
                <p className={`text-[14px] font-semibold tracking-wide truncate w-full ${titleColor}`}>
                    {album.name}
                </p>
            </div>
        </div>
    );
};

export default AlbumCard;