import React from 'react';
import BottomNav from './BottomNav.jsx';
import PlayerBar from './PlayerBar.jsx';
import NowPlayingSheet from './NowPlayingSheet.jsx';

const Layout = ({ children }) => {
    const [SheetOpen, setSheetOpen] = React.useState(false);

    return (
        <div className="w-full h-screen bg-black sm:bg-[#0a0a0c] flex justify-center items-center sm:p-4">

            <div className="w-full h-full sm:max-w-[393px] sm:h-[852px] bg-black sm:rounded-[52px] sm:shadow-[0_0_50px_rgba(0,0,0,0.8)] sm:border-[8px] sm:border-zinc-800 overflow-hidden relative flex flex-col select-none isolate text-white">
                
                <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-[70] pointer-events-none" />

                <NowPlayingSheet isOpen={SheetOpen} onClose={() => setSheetOpen(false)} />

                <main className="flex-1 overflow-y-auto pb-28 pt-2 sm:pt-6 scrollbar-none overscroll-behavior-y-contain">
                    {children}
                </main>

                <div className="absolute bottom-0 inset-x-0 z-40 w-full bg-[#030303]/95 backdrop-blur-md border-t border-white/10 pt-1 pb-2 flex flex-col gap-0.5 touch-none">
                    <PlayerBar onClick={() => setSheetOpen(true)} />
                    <BottomNav />
                </div>

            </div>

        </div>
    );
};

export default Layout;