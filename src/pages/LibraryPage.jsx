import React from 'react';
import SongRow from "../components/SongRow";
import songs from "../../public/songs";
import { useState } from "react";
import { Search, SlidersHorizontal, ArrowLeft, Play } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

export default function LibraryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('songs');
    const tab = ['songs', 'albums', 'artists', 'liked'];

    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const likedsongIndex = usePlayerStore((state) => state.likedsongIndex);

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.album.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const uniqueAlbums = [...new Set(filteredSongs.map(s => s.album))];
    const uniqueArtists = [...new Set(filteredSongs.map(s => s.artist))];

    const playContextList = (contextList) => {
        if (contextList.length > 0) {
            const { playsong } = usePlayerStore.getState();
            playsong(contextList[0], contextList);
        }
    };

    return (
        <div className="p-4 pt-4 flex flex-col gap-6">
            <h1 className="text-3xl font-bold px-1">Your Library</h1>
            <div className="flex items-center gap-3 w-full max-w-md mx-1">
                <div className="flex-1 flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-full px-4 py-2 focus-within:border-white/20 transition">
                    <Search size={18} className="text-zinc-400 flex-shrink-0" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search songs, artists, or albums..."
                        className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full"
                    />
                </div>

                <div className="relative flex items-center justify-center p-2.5 bg-zinc-900 border border-white/10 rounded-full hover:bg-zinc-800 transition cursor-pointer flex-shrink-0">
                    <SlidersHorizontal size={18} className={activeTab !== 'songs' ? 'text-red-500' : 'text-zinc-400'} />
                    <select
                        value={activeTab}
                        onChange={(e) => {
                            setActiveTab(e.target.value);
                            setSelectedAlbum(null);
                            setSelectedArtist(null);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    >
                        {tab.map((option) => (
                            <option key={option} value={option} className="bg-zinc-900 text-white">
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                {selectedAlbum ? (
                    (() => {
                        const albumTracks = songs.filter(s => s.album === selectedAlbum);
                        return (
                            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                                <button 
                                    onClick={() => setSelectedAlbum(null)} 
                                    className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium mb-2 w-fit"
                                >
                                    <ArrowLeft size={16} /> Back to Albums
                                </button>

                                <div className="flex items-center gap-4 p-3 bg-zinc-900/50 border border-white/5 rounded-xl mb-2">
                                    <img src={albumTracks[0]?.cover} alt={selectedAlbum} className="w-20 h-20 rounded-lg object-cover shadow-lg" />
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{selectedAlbum}</h2>
                                        <p className="text-sm text-zinc-400">{albumTracks[0]?.artist} • {albumTracks.length} tracks</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    {albumTracks.map(song => (
                                        <SongRow key={song.id} song={song} songList={albumTracks} />
                                    ))}
                                </div>
                            </div>
                        );
                    })()
                ) : selectedArtist ? (
                    
                    (() => {
                        const artistTracks = songs.filter(s => s.artist.toLowerCase().includes(selectedArtist.toLowerCase()));
                        return (
                            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                                <button 
                                    onClick={() => setSelectedArtist(null)} 
                                    className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium mb-2 w-fit"
                                >
                                    <ArrowLeft size={16} /> Back to Artists
                                </button>

                                <div className="flex items-center gap-4 p-3 bg-zinc-900/50 border border-white/5 rounded-xl mb-2">
                                    <img src={artistTracks[0]?.cover} alt={selectedArtist} className="w-20 h-20 rounded-full object-cover shadow-lg" />
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{selectedArtist}</h2>
                                        <p className="text-sm text-zinc-400">Artist • {artistTracks.length} tracks available</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    {artistTracks.map(song => (
                                        <SongRow key={song.id} song={song} songList={artistTracks} />
                                    ))}
                                </div>
                            </div>
                        );
                    })()
                ) : (
                    <>
                        {activeTab === 'songs' && (
                            filteredSongs.length > 0 ? (
                                filteredSongs.map((song) => (
                                    <SongRow key={song.id} song={song} songList={filteredSongs} />
                                ))
                            ) : (
                                <div className="text-center text-zinc-500 py-8 text-sm">No songs found matching "{searchTerm}"</div>
                            )
                        )}

                        {activeTab === 'albums' && (
                            uniqueAlbums.length > 0 ? (
                                uniqueAlbums.map((albumName, index) => {
                                    const albumSong = songs.find(s => s.album === albumName);
                                    return (
                                        <div key={index}
                                            onClick={() => setSelectedAlbum(albumName)} 
                                            className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                                            <img src={albumSong?.cover} alt={albumName} className="w-12 h-12 rounded object-cover" />
                                            <div>
                                                <p className="text-[15px] font-semibold text-white">{albumName}</p>
                                                <p className="text-xs text-gray-400">{albumSong?.artist}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center text-zinc-500 py-8 text-sm">No albums found matching "{searchTerm}"</div>
                            )
                        )}

                        {activeTab === 'liked' && (
                            (() => {
                                const likedSongs = filteredSongs.filter(song => likedsongIndex.includes(song.id));

                                return likedSongs.length > 0 ? (
                                    likedSongs.map((song) => (
                                        <SongRow key={song.id} song={song} songList={likedSongs} />
                                    ))
                                ) : (
                                    <div className="text-center text-zinc-500 py-8 text-sm">
                                        No liked songs found matching your search.
                                    </div>
                                );
                            })()
                        )}

                        {activeTab === 'artists' && (
                            uniqueArtists.length > 0 ? (
                                uniqueArtists.map((artistName, index) => {
                                    const artistSong = songs.find(s => s.artist === artistName);
                                    return (
                                        <div key={index}
                                            onClick={() => setSelectedArtist(artistName)}
                                            className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                                            <img src={artistSong?.cover} alt={artistName} className="w-12 h-12 rounded-full object-cover" />
                                            <div>
                                                <p className="text-[15px] font-semibold text-white">{artistName}</p>
                                                <p className="text-xs text-gray-400">Artist</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center text-zinc-500 py-8 text-sm">No artists found matching "{searchTerm}"</div>
                            )
                        )}
                    </>
                )}
            </div>

            <div className="h-24" />
        </div>
    );
}