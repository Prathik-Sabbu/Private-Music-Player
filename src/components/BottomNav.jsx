import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Music2 } from 'lucide-react';

const BottomNav = () => {

    const navItems = [
        { name: 'Home', path: '/', icon: Home, end: true },
        { name: 'Search', path: '/search', icon: Search },
        { name: 'Library', path: '/library', icon: Library },
        { name: 'Playlists', path: '/playlists', icon: Music2 }
    ];

    return (
        <nav className="flex justify-around items-center bg-[#0f0f0f] border-t border-white/10 pt-2 pb-6 px-4">
        {navItems.map((item) => (
            <NavLink
            end={item.end || false}
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
                `flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-white' : 'text-gray-400'
                }`
            }
            >
            {({ isActive }) => (
                <>
                <item.icon 
                    size={24} 
                    strokeWidth={isActive ? 2.5 : 1.5} 
                />
                <span className="text-[10px] font-medium">{item.name}</span>
                </>
            )}
            </NavLink>
        ))}
        </nav>
    );
};

export default BottomNav;