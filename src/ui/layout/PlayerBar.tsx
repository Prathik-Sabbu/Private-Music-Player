import React from "react"
import { useAudioContext } from "../../state/AudioContext"

export function PlayerBar() {
    const { currentSong, isPlaying, play, pause } = useAudioContext()

    return (
    <div style={{ padding: "1rem", borderTop: "1px solid #ccc" }}>
      <span>
        Now Playing: {currentSong ? `${currentSong.title} – ${currentSong.artist}` : "None"}
      </span>
      
      {isPlaying ? (
        <button onClick={pause} style={{ marginLeft: "1rem" }}>⏸ Pause</button>
      ) : (
        <button
          onClick={() => currentSong && play(currentSong)}
          style={{ marginLeft: "1rem" }}
          disabled={!currentSong}>▶️ Play </button>
      )}
    </div>
  )
}