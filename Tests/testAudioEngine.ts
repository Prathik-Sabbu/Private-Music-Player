import { AudioEngine } from "./AudioEngine"
import { Song } from "../data/types"

export function testAudioEngine() {
  const button = document.createElement("button")
  button.innerText = "Run Audio Engine Test"
  button.style.position = "fixed"
  button.style.top = "20px"
  button.style.left = "20px"
  button.style.zIndex = "9999"

  document.body.appendChild(button)

  button.onclick = async () => {
    const engine = new AudioEngine()

    const song: Song = {
      id: "test",
      title: "Test Tone",
      artist: "Test Artist",
      durationSec: 10,
      audioUrl: "505.mp3"
    }

    console.log("▶️ Playing:", song.title)
    engine.play(song)

    setTimeout(() => {
      console.log("⏸ Pausing")
      engine.pause()
    }, 3000)

    setTimeout(() => {
      console.log("▶️ Resuming")
      engine.play(song)
    }, 5000)

    engine.onEnded(() => {
      console.log("Song ended")
    })
  }
}
