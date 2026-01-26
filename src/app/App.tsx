import { AudioProvider } from "../state/AudioContext"
import { SongList } from "../ui/library/SongList"
import { PlayerBar } from "../ui/layout/PlayerBar"

function App() {
  return (
    <AudioProvider>
      <SongList />
      <PlayerBar />
    </AudioProvider>
  )
}

export default App
