import React from 'react';
import {SongList} from '../library/SongList';
import {PlayerBar} from './PlayerBar';
import '../../styles/theme.css';

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">MyMusic</div>
        <nav>
          <ul>
            <li className="active">Home</li>
            <li>Library</li>
            <li>Playlists</li>
          </ul>
        </nav>
      </aside>
      
      <main className="main-content">
        <header className="top-bar">
          <input type="text" placeholder="Search your library..." className="search-input" />
        </header>
        <section className="content-area">
          <h2>Your Library</h2>
          <SongList />
        </section>
      </main>

      <PlayerBar />
    </div>
  );
};

export default MainLayout;