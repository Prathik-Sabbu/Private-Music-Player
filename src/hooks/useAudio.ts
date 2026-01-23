import { useEffect, useRef, useState } from "react"
import { audioEngine, AudioEngine } from "../audio/AudioEngine"
import { Song } from "../data/types"

export function useAudio() {
    const engineRef = useRef<AudioEngine | null>(null)
    const [currentSong, setCurrentSong] = useState<Song | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        engineRef.current = new AudioEngine()
    }, [])

    const play = (song: Song) => {
        if(!engineRef.current) return
        engineRef.current.play(song)
        setCurrentSong(song)
        setIsPlaying(true)

        engineRef.current.onEnded(() => {
            setIsPlaying(false)
            setCurrentSong(null)
        })
    }

    const pause = () => {
        if(!engineRef.current) return
        engineRef.current.pause()
        setIsPlaying(false)
    }

    return {currentSong, isPlaying, play, pause}
}