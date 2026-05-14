import React from 'react';
import SongRow from "../components/SongRow";
import songs from "../../public/songs";

export default function LibraryPage() {
    return (
        <div className="p-4 pt-8">
            <h1 className="text-3xl font-bold mb-6 px-2">Your Library</h1>
            
            <div className="flex flex-col gap-1">
                {songs.map((song) => (
                    <SongRow key={song.id} song={song} songList={songs} />
                ))}
            </div>

            <div className="h-20" />
        </div>
    );
}