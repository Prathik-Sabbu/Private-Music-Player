import React from "react"
import { Song } from "../../data/types"

type SongItemProps = {
    song: Song
    onPlay: (song: Song) => void
    isActive?: boolean
}

export function SongItem({song, onPlay, isActive = false}: SongItemProps){
    return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between",
      padding: "0.5rem 0",
      borderBottom: "1px solid #eee",
      backgroundColor: isActive ? "#6e6e6e" : "transparent"
    }}>
    <div>
        <strong>{song.title}</strong>
            <div style={{ fontSize: "0.85rem", color: "#ffffff" }}>
                {song.artist}
            </div>
        </div>
      <button onClick={() => onPlay(song)}> {isActive ? "⏸" : "▶️"}</button>
    </div>
    )
}