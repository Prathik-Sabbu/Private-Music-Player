import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { usePlayerStore } from './store/playerStore';

// Page Imports
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import PlaylistPage from './pages/PlaylistPage';
import PlaylistDetail from './pages/PlaylistDetail';

// Component Imports
import BottomNav from './components/BottomNav';

function App() {

    return (
        <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-32"> 
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/playlists" element={<PlaylistPage />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />
            </Routes>
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#030303] border-t border-white/10">
            <BottomNav />
        </div>
        </div>
    );
}

export default App;