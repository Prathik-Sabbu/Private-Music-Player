import React from 'react';
import BottomNav from './BottomNav.jsx';
import PlayerBar from './PlayerBar.jsx';
import NowPlayingSheet from './NowPlayingSheet.jsx';

const Layout = ({ children }) => {

    const [SheetOpen, setSheetOpen] = React.useState(false);

    return (
        <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
            <NowPlayingSheet isOpen={SheetOpen} onClose={() => setSheetOpen(false)} />
            <main className="flex-1 overflow-y-auto pb-32"> 
                {children}
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#030303] border-t border-white/10">
                <PlayerBar onClick={() => setSheetOpen(true)} />
                <BottomNav />
            </div>
        </div>
    );
};

export default Layout;