import { usePlayerStore } from '../store/playerStore';
import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Repeat, Repeat1, ChevronDown, Shuffle, Heart } from 'lucide-react';

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

    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });
    const [isSwipingSheet, setIsSwipingSheet] = useState(false);
    const [isSwipingArtwork, setIsSwipingArtwork] = useState(false);

    React.useEffect(() => {
        if (!isOpen) return;

        const handleEdgeTouch = (e) => {
            const touchX = e.touches[0].clientX;
            const edgeWidth = 24;

            const touchY = e.touches[0].clientY;

            if (touchY > window.innerHeight * 0.6) return;
            
            if (touchX < edgeWidth || touchX > window.innerWidth - edgeWidth) {
                if (e.cancelable) {
                    e.preventDefault();
                }
            }
        };

        window.addEventListener('touchstart', handleEdgeTouch, { passive: false });
        return () => {
            window.removeEventListener('touchstart', handleEdgeTouch);
        };
    }, [isOpen]);

    const [gestureMode, setGestureMode] = useState('');

    const handleSheetTouchStart = (e) => {
        if (e.target.type === 'range') return;
        setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setIsSwipingSheet(true);
        setGestureMode('');
    };

    const handleSheetTouchMove = (e) => {
        if (!isSwipingSheet) return;
        
        const diffX = e.touches[0].clientX - touchStart.x;
        const diffY = e.touches[0].clientY - touchStart.y;

        if (!gestureMode && (Math.abs(diffX) > 10 || Math.abs(diffY) > 10)) {
            if (Math.abs(diffY) > Math.abs(diffX)) {
                setGestureMode('vertical');
            } else {
                setGestureMode('horizontal');
            }
        }

        if (e.cancelable) e.preventDefault();

        if (gestureMode === 'vertical' && diffY > 0) {
            setTouchOffset((prev) => ({ ...prev, y: diffY }));
        }
    };

    const handleSheetTouchEnd = () => {
        setIsSwipingSheet(false);
        if (gestureMode === 'vertical' && touchOffset.y > 140) {
            onClose();
        }
        setTouchOffset((prev) => ({ ...prev, y: 0 }));
        setGestureMode('');
    };

    const handleArtworkTouchStart = (e) => {
        e.stopPropagation(); 
        setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setIsSwipingArtwork(true);
        setGestureMode('');
    };

    const handleArtworkTouchMove = (e) => {
        if (!isSwipingArtwork) return;
        
        const diffX = e.touches[0].clientX - touchStart.x;
        const diffY = e.touches[0].clientY - touchStart.y;

        if (!gestureMode && (Math.abs(diffX) > 10 || Math.abs(diffY) > 10)) {
            if (Math.abs(diffY) > Math.abs(diffX)) {
                setGestureMode('vertical');
            } else {
                setGestureMode('horizontal');
            }
        }

        if (e.cancelable) e.preventDefault();

        if (gestureMode === 'horizontal') {
            setTouchOffset((prev) => ({ ...prev, x: diffX }));
        }
        else if (gestureMode === 'vertical' && diffY > 0) {
            setTouchOffset((prev) => ({ ...prev, y: diffY }));
        }
    };

    const handleArtworkTouchEnd = () => {
        setIsSwipingArtwork(false);

        if (gestureMode === 'horizontal') {
            if (touchOffset.x > 70) {
                prevSong();
            } else if (touchOffset.x < -70) {
                nextSong();
            }
        } else if (gestureMode === 'vertical' && touchOffset.y > 140) {
            onClose();
        }

        setTouchOffset({ x: 0, y: 0 });
        setGestureMode('');
    };

    const isLiked = currentSong && Array.isArray(likedsongIndex) ? likedsongIndex.includes(currentSong.id) : false;

    if (!currentSong) return null;

    return (
        <div 
            onTouchStart={handleSheetTouchStart}
            onTouchMove={handleSheetTouchMove}
            onTouchEnd={handleSheetTouchEnd}
            style={{ 
                transform: isOpen ? `translateY(${touchOffset.y}px)` : 'translateY(100%)',
                transition: isSwipingSheet ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                touchAction: 'pan-y'
            }}
            className="absolute inset-0 z-50 bg-[#030303] flex flex-col h-full w-full px-6 pb-2 pt-4 select-none overscroll-behavior-x-contain">
            <div className="w-full flex justify-center items-center h-4 mb-2">
                <div className="w-10 h-1 bg-zinc-800 rounded-full opacity-60" />
            </div>

            <div className="flex items-center justify-between w-full">
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition active:scale-95 text-white">
                    <ChevronDown size={28} />
                </button>
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Now Playing</span>
                <div className="w-10 h-10" />  
            </div>

            <div className="flex items-center justify-center max-w-[350px] max-h-[350px] mx-auto w-full my-auto overflow-hidden relative">
                <div 
                    key={currentSong.id}
                    onTouchStart={handleArtworkTouchStart}
                    onTouchMove={handleArtworkTouchMove}
                    onTouchEnd={handleArtworkTouchEnd}
                    style={{
                        transform: isSwipingArtwork ? `translateX(${touchOffset.x * 0.5}px)` : 'translateX(0)',
                        transition: isSwipingArtwork ? 'none' : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        touchAction: 'pan-x'
                    }}
                    className="w-full h-full cursor-grab active:cursor-grabbing animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 dynamic-art-layer">
                    <img
                        src={currentSong.cover}
                        alt={currentSong.title}
                        className={`w-full aspect-square object-cover rounded-2xl shadow-2xl transition-all duration-300 pointer-events-none ${
                            isPlaying ? 'scale-100' : 'scale-95 opacity-80'
                        }`}/>
                </div>
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
                        <Heart size={24} className={isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-500 hover:text-zinc-300'}/>
                    </button>
                </div>

                <div className="w-full flex flex-col gap-1 mt-2 select-none">
                    <div className="relative w-full h-8 flex items-center group cursor-pointer touch-auto">
                        
                        <div className="w-full h-1 bg-zinc-800 rounded-full relative overflow-hidden pointer-events-none group-active:h-1.5 transition-all duration-150">
                            <div 
                                className="absolute h-full bg-red-600 rounded-full" 
                                style={{ width: `${currentSong.duration > 0 ? (progress / currentSong.duration) * 100 : 0}%` }}/>
                        </div>

                        <div 
                            style={{ left: `${currentSong.duration > 0 ? (progress / currentSong.duration) * 100 : 0}%` }}
                            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full shadow-md scale-0 group-active:scale-100 transition-transform duration-150 pointer-events-none z-10" />

                        <input 
                            type="range"
                            min="0"
                            max={currentSong.duration || 100}
                            value={progress}
                            onChange={(e) => {
                                const newValue = Number(e.target.value);
                                
                                if (newValue === 0 && progress > 2) return;
                                
                                setProgress(newValue);
                            }}
                            onTouchStart={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30 accent-red-600 m-0 p-0"/>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-400 font-medium select-none pointer-events-none pt-1">
                        <span>{Math.floor(progress / 60)}:{String(Math.floor(progress % 60)).padStart(2, '0')}</span>
                        <span>{Math.floor(currentSong.duration / 60)}:{String(Math.floor(currentSong.duration % 60)).padStart(2, '0')}</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-sm mx-auto flex items-center justify-between mt-4 mb-8 px-2 touch-auto">
                <button onClick={toggleShuffle}
                        className={`p-2 transition active:scale-95 ${shuffle ? 'text-red-500' : 'text-zinc-500 hover:text-white'}`}>
                    <Shuffle size={20}/>
                </button>

                <button onClick={prevSong}
                        className="p-2 text-zinc-300 hover:text-white transition active:scale-90">
                    <SkipBack size={28} fill="currentColor"/>
                </button>

                <button onClick={pauseResume}
                        className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition">
                    {isPlaying ? <Pause size={28} fill="currentColor"/> : <Play size={28} fill="currentColor" className="ml-[3px]"/>}
                </button>

                <button onClick={nextSong}
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

            <div className="w-full flex items-center justify-center pb-2 touch-auto">
                <button onClick={() => alert("Open Queue Sheet Modal Here")}
                        className="text-xs font-medium text-zinc-500 hover:text-zinc-300 transition underline decoration-zinc-600 underline-offset-4 tracking-wider uppercase">
                    Your Queue
                </button>
            </div>
        </div>
    );
};

export default NowPlayingSheet;