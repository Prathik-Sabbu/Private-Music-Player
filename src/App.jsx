import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Page Imports
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import PlaylistPage from './pages/PlaylistPage';
import PlaylistDetail from './pages/PlaylistDetail';


function App() {

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/playlists" element={<PlaylistPage />} />
                <Route path="/playlist/:id" element={<PlaylistDetail />} />
            </Routes>
        </Layout>
    );
}

export default App;