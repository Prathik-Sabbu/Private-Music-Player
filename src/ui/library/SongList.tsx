import React from "react"
import songs from "../../data/songs.json"
import { SongItem } from "./SongItem"
import { useAudioContext } from "../../state/AudioContext"

export function SongList() {
    const {currentSong, play} = useAudioContext() 

    return (
    <div style={{ padding: "1rem" }}>
        <h2>Songs</h2>

        {songs.map((song) => (
            <SongItem
                key={song.id}
                song={song}
                onPlay={play}
                isActive={currentSong?.id === song.id}
            />
        ))}
    </div>
    )
}