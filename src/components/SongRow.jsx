import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Music2 } from 'lucide-react';

const SongRow = ({ song }) => {
    return (
        <div className="flex items-center gap-4 p-4 hover:bg-[#1a1a1a] rounded">
            <img src={song.album.cover} alt={song.title} className="w-12 h-12 rounded" />
            <div className="flex-1">
                <p className="text-sm font-medium">{song.title}</p>
                <p className="text-xs text-gray-400">{song.artist}</p>
                <p className="text-xs text-gray-400">{song.album.title}</p>
            </div>
        </div>
    );
}