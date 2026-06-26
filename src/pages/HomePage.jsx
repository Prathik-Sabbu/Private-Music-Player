import React, { useState, useRef, useEffect, useMemo } from 'react';
import SongCard from '../components/SongCard';
import AlbumCard from '../components/AlbumCard';
import SongRow from '../components/SongRow';
import originalSongs from '../../public/songs';
import { Play, Radio, Bookmark, ArrowLeft, Search } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { getQuickPicks, getSpeedDial } from '../utils/ranking';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ artist }) => {
    const playSong = usePlayerStore((state) => state.playSong);

    const handleArtistClick = () => {
        const artistSongs = originalSongs.filter(s => s.artist === artist.name || (s.features && s.features.includes(artist.name)));
        if (artistSongs.length > 0) {
            playSong(artistSongs[0], artistSongs);
        }
    };

    return (
        <div
            onClick={handleArtistClick}
            className="relative w-full aspect-square rounded-full overflow-hidden cursor-pointer shadow-lg transition-all duration-200 select-none isolate hover:opacity-90 active:scale-95 bg-zinc-900 border border-white/5 flex flex-col items-center justify-center p-2"
        >
            {artist.cover ? (
                <img src={artist.cover} alt={artist.name} className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-full" />
            ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full opacity-60" />
            )}

            <div className="absolute inset-0 bg-black/40 rounded-full" />

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-8 pb-3 px-3 flex flex-col items-center justify-end">
                <p className="text-[12px] font-semibold tracking-wide truncate text-center w-full text-white">
                    {artist.name}
                </p>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5">Artist</p>
            </div>
        </div>
    );
};

export default function HomePage() {
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [currentSpeedDialPage, setCurrentSpeedDialPage] = useState(0);
    const [currentQuickPicksPage, setCurrentQuickPicksPage] = useState(0);

    const speedDialRef = useRef(null);
    const quickPicksRef = useRef(null);
    const navigate = useNavigate();

    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const isRefreshingRef = useRef(false);

    const triggerRefresh = () => {
        if (isRefreshingRef.current) return;
        isRefreshingRef.current = true;
        setIsRefreshing(true);
        setTimeout(() => {
            setRefreshKey(prev => prev + 1);
            setIsRefreshing(false);
            isRefreshingRef.current = false;
        }, 800);
    };

    useEffect(() => {
        const mainEl = document.querySelector('main');
        if (!mainEl) return;

        let startY = 0;
        let startX = 0;
        let active = false;
        let isSwipeDetermined = false;
        let isVerticalSwipe = false;
        let localPull = 0;

        const handleTouchStart = (e) => {
            if (mainEl.scrollTop === 0) {
                startY = e.touches[0].pageY;
                startX = e.touches[0].pageX;
                active = true;
                isSwipeDetermined = false;
                isVerticalSwipe = false;
            }
        };

        const handleTouchMove = (e) => {
            if (!active) return;
            const currentX = e.touches[0].pageX;
            const currentY = e.touches[0].pageY;

            if (!isSwipeDetermined) {
                const dx = Math.abs(currentX - startX);
                const dy = Math.abs(currentY - startY);
                if (dy > 8 || dx > 8) {
                    isVerticalSwipe = dy > dx;
                    isSwipeDetermined = true;
                }
            }

            if (isSwipeDetermined) {
                if (!isVerticalSwipe) {
                    active = false;
                    return;
                }
                const diff = currentY - startY;
                if (diff > 0) {
                    if (e.cancelable) e.preventDefault();
                    localPull = diff;
                    setPullDistance(diff);
                }
            }
        };

        const handleTouchEnd = () => {
            if (!active) return;
            active = false;
            if (isVerticalSwipe && localPull > 50) {
                triggerRefresh();
            }
            localPull = 0;
            setPullDistance(0);
        };

        const handleWheel = (e) => {
            if (mainEl.scrollTop === 0 && e.deltaY < -40) {
                triggerRefresh();
            }
        };

        mainEl.addEventListener('touchstart', handleTouchStart, { passive: true });
        mainEl.addEventListener('touchmove', handleTouchMove, { passive: false });
        mainEl.addEventListener('touchend', handleTouchEnd);
        mainEl.addEventListener('wheel', handleWheel, { passive: true });

        return () => {
            mainEl.removeEventListener('touchstart', handleTouchStart);
            mainEl.removeEventListener('touchmove', handleTouchMove);
            mainEl.removeEventListener('touchend', handleTouchEnd);
            mainEl.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const recentlyPlayed = usePlayerStore(state => state.recentlyPlayed);

    const songs = originalSongs.length < 12 ? [
        ...originalSongs,
        ...originalSongs.map(s => ({ ...s, id: `${s.id}-m1`, title: `${s.title} (Mix 1)` })),
        ...originalSongs.map(s => ({ ...s, id: `${s.id}-m2`, title: `${s.title} (Mix 2)` }))
    ] : originalSongs;

    const albums = [...new Set(songs.map(s => s.album))].map(albumName => ({
        name: albumName,
        artist: songs.find(s => s.album === albumName)?.artist,
        cover: songs.find(s => s.album === albumName)?.cover,
        tracks: songs.filter(s => s.album === albumName)
    }));

    const chunkArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );
    };

    const getFallbackSpeedDial = () => {
        const topSongs = songs.slice(0, 12).map(s => ({ id: s.id, type: 'song', metadata: s }));

        const uniqueAlbumNames = [...new Set(songs.map(s => s.album))];
        const topAlbums = uniqueAlbumNames.slice(0, 9).map(albumName => {
            const albumSongs = songs.filter(s => s.album === albumName);
            return {
                id: albumName,
                type: 'album',
                metadata: {
                    name: albumName,
                    artist: albumSongs[0]?.artist || '',
                    cover: albumSongs[0]?.cover || '',
                    tracks: albumSongs
                }
            };
        });

        const uniqueArtistNames = [...new Set(songs.flatMap(s => [s.artist, ...(s.features || [])]))];
        const topArtists = uniqueArtistNames.slice(0, 6).map(artistName => {
            const artistSongs = songs.filter(s => s.artist === artistName || (s.features && s.features.includes(artistName)));
            return {
                id: artistName,
                type: 'artist',
                metadata: {
                    name: artistName,
                    cover: artistSongs[0]?.cover || ''
                }
            };
        });

        const fallback = [...topSongs, ...topAlbums, ...topArtists];
        return fallback.sort(() => Math.random() - 0.5);
    };

    const getFallbackQuickPicks = () => {
        return [...songs].sort(() => Math.random() - 0.5).slice(0, 16).map(s => ({
            id: s.id,
            type: 'song',
            metadata: s
        }));
    };

    const quickPicks = useMemo(() => {
        return recentlyPlayed.length > 0
            ? getQuickPicks(recentlyPlayed)
            : getFallbackQuickPicks();
    }, [recentlyPlayed, refreshKey]);

    const speedDial = useMemo(() => {
        return recentlyPlayed.length > 0
            ? getSpeedDial(recentlyPlayed)
            : getFallbackSpeedDial();
    }, [recentlyPlayed, refreshKey]);

    const speedDialPages = chunkArray(speedDial, 9);
    const quickPickColumns = chunkArray(quickPicks.map(item => item.metadata).filter(Boolean), 4);

    const handleSpeedDialScroll = () => {
        if (!speedDialRef.current) return;
        const { scrollLeft, clientWidth } = speedDialRef.current;
        setCurrentSpeedDialPage(Math.round(scrollLeft / clientWidth));
    };

    const handleQuickPicksScroll = () => {
        if (!quickPicksRef.current) return;
        const { scrollLeft, clientWidth } = quickPicksRef.current;
        setCurrentQuickPicksPage(Math.round(scrollLeft / clientWidth));
    };

    const scrollToPage = (ref, pageIndex) => {
        if (!ref.current) return;
        const { clientWidth } = ref.current;
        ref.current.scrollTo({
            left: pageIndex * clientWidth,
            behavior: 'smooth'
        });
    };

    if (selectedAlbum) {
        return (
            <div className="p-4 pt-4 flex flex-col gap-4 text-white">
                <button onClick={() => setSelectedAlbum(null)} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium mb-2 w-fit">
                    <ArrowLeft size={16} /> Back to Home
                </button>
                <div className="flex items-center gap-4 p-3 bg-zinc-900/50 border border-white/5 rounded-xl mb-2">
                    <img src={selectedAlbum.cover} alt={selectedAlbum.name} className="w-20 h-20 rounded-xl object-cover shadow-lg" />
                    <div>
                        <h2 className="text-xl font-bold">{selectedAlbum.name}</h2>
                        <p className="text-sm text-zinc-400">{selectedAlbum.artist} • {selectedAlbum.tracks.length} tracks</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    {selectedAlbum.tracks.map(song => (
                        <SongRow key={song.id} song={song} songList={selectedAlbum.tracks} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 flex flex-col gap-8 bg-black min-h-screen text-white select-none pb-24 overflow-x-hidden relative">

            <div className="sticky top-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-between py-3 px-4 -mx-4 border-b border-white/5 mb-4">
                <div className="flex items-center gap-2.5">
                    <img src="/icons/icon-192.png" alt="Logo" className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                        Music
                    </span>
                </div>
                <div className="flex items-center gap-4 text-zinc-300">
                    <button className="hover:text-white transition-colors p-1" onClick={() => navigate('/search')}>
                        <Search size={20} />
                    </button>
                    <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-200 text-xs font-bold border border-white/10 shadow-sm select-none">
                        U
                    </div>
                </div>
            </div>

            {(pullDistance > 0 || isRefreshing) && (
                <div
                    className="flex items-center justify-center text-zinc-400 text-xs overflow-hidden transition-all duration-150 rounded-xl bg-zinc-900/30 border border-white/5 mx-1"
                    style={{
                        height: isRefreshing ? '48px' : `${Math.min(pullDistance, 54)}px`,
                        opacity: isRefreshing ? 1 : Math.min(pullDistance / 40, 1),
                        marginBottom: '8px',
                        padding: '4px'
                    }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        <span className="font-medium text-[11px] tracking-wide text-zinc-300">
                            {isRefreshing ? 'Refreshing...' : pullDistance > 50 ? 'Release to refresh' : 'Pull to refresh'}
                        </span>
                    </div>
                </div>
            )}

            <div>
                <h2 className="text-xs tracking-wider uppercase text-zinc-400 font-medium px-1">User</h2>
                <h1 className="text-2xl font-bold mb-3 px-1">Speed dial</h1>

                <div
                    ref={speedDialRef}
                    onScroll={handleSpeedDialScroll}
                    className="flex overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory gap-4"
                >
                    {speedDialPages.map((pageItems, pageIdx) => (
                        <div key={pageIdx} className="w-full flex-shrink-0 snap-start grid grid-cols-3 gap-3">
                            {pageItems.map(item => {
                                if (item.type === 'song') {
                                    return (
                                        <SongCard key={item.id} song={item.metadata} songList={songs} />
                                    );
                                } else if (item.type === 'album') {
                                    return (
                                        <AlbumCard
                                            key={item.id}
                                            album={item.metadata}
                                            songList={item.metadata.tracks}
                                            onClick={() => setSelectedAlbum(item.metadata)}
                                        />
                                    );
                                } else if (item.type === 'artist') {
                                    return (
                                        <ArtistCard
                                            key={item.id}
                                            artist={item.metadata}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center gap-1.5 mt-2">
                    {speedDialPages.map((_, pageIdx) => (
                        <button
                            key={pageIdx}
                            onClick={() => scrollToPage(speedDialRef, pageIdx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentSpeedDialPage === pageIdx ? 'w-4 bg-white' : 'w-1.5 bg-zinc-600'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div>
                <div className="flex justify-between items-end mb-3 px-1">
                    <h2 className="text-2xl font-bold">Quick picks</h2>
                    <button className="text-xs bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 px-3 py-1.5 rounded-full font-medium transition-colors">
                        Play all
                    </button>
                </div>

                <div
                    ref={quickPicksRef}
                    className="flex gap-4 overflow-x-auto pb-4 custom-slider snap-x snap-mandatory"
                >
                    {quickPickColumns.map((columnSongs, colIdx) => (
                        <div key={colIdx} className="w-[85vw] max-w-sm flex-shrink-0 flex flex-col gap-1 snap-start">
                            {columnSongs.map(song => (
                                <SongRow key={song.id} song={song} songList={songs} />
                            ))}
                        </div>
                    ))}
                </div>

            </div>

            <div>
                <h2 className="text-2xl font-bold mb-3 px-1">Albums for you</h2>
                <div
                    className="flex gap-4 overflow-x-auto pb-4 custom-slider snap-x snap-mandatory"
                >
                    {albums.slice(0, 5).map(album => (
                        <div key={album.name} className="w-40 flex-shrink-0 snap-start flex flex-col gap-2">
                            <AlbumCard album={album} songList={album.tracks} onClick={() => setSelectedAlbum(album)} />
                            <div className="px-1 min-w-0">
                                <p className="text-[14px] font-medium truncate w-full leading-snug">{album.name}</p>
                                <p className="text-[12px] text-zinc-400 truncate w-full mt-0.5">EP • {album.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                    <div className="w-[90vw] max-w-md flex-shrink-0 snap-start bg-[#3d1c1a] rounded-2xl p-4 flex flex-col gap-4 shadow-xl border border-white/5">
                        <div className="flex gap-4 items-center">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative shadow-md bg-gradient-to-br from-red-500 to-orange-600 flex flex-col justify-between p-2">
                                <div className="text-[9px] font-bold tracking-widest text-white/80 uppercase">Trending 20</div>
                                <div className="text-[11px] font-black leading-none text-white">UNITED STATES</div>
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-2xl font-extrabold tracking-tight leading-tight">Trending 20<br />United States</h3>
                                <p className="text-xs text-zinc-400 mt-1 font-medium">YouTube Music</p>
                                <p className="text-xs text-zinc-500 mt-0.5">20 songs</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 bg-black/10 rounded-xl p-1">
                            {songs.slice(0, 3).map((song) => (
                                <div key={song.id} className="flex items-center justify-between p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <img src={song.cover} alt={song.title} className="w-9 h-9 rounded-md object-cover flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-white truncate uppercase tracking-wider">{song.title}</p>
                                            <p className="text-[11px] text-zinc-400 truncate mt-0.5">{song.artist} • 1M plays</p>
                                        </div>
                                    </div>
                                    <button className="text-zinc-500 hover:text-white p-1">
                                        <span className="text-lg font-bold leading-none block h-4">...</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <button className="w-10 h-10 bg-white hover:scale-105 active:scale-95 transition-transform rounded-full flex items-center justify-center text-black shadow-md">
                                <Play size={16} fill="currentColor" className="ml-0.5" />
                            </button>
                            <button className="w-10 h-10 bg-white/10 hover:bg-white/15 border border-white/5 rounded-full flex items-center justify-center text-white transition-colors">
                                <Radio size={16} />
                            </button>
                            <button className="w-10 h-10 bg-white/10 hover:bg-white/15 border border-white/5 rounded-full flex items-center justify-center text-white transition-colors">
                                <Bookmark size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}