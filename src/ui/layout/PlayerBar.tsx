import React from "react"
import { useAudio } from "../../hooks/useAudio"
import { Song } from "../../data/types"

const sampleSong: Song = {
    id: "test",
    title: "Test Tone",
    artist: "Test Artist",
    durationSec: 10,
    audioUrl: "505.mp3"
}

export function PlayerBar() {
    const { currentSong, isPlaying, play, pause } = useAudio()

    return (
    <div style={{ padding: "1rem", borderTop: "1px solid #ccc" }}>
      <span>Now Playing: {currentSong?.title || "None"}</span>
      {isPlaying ? (
        <button onClick={pause} style={{ marginLeft: "1rem" }}>⏸ Pause</button>
      ) : (
        <button onClick={() => play(sampleSong)} style={{ marginLeft: "1rem" }}>▶️ Play</button>
      )}
    </div>
  )
}