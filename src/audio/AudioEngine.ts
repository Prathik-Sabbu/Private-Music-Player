import { Song } from "../data/types"

export class AudioEngine{
    private audio: HTMLAudioElement
    private currentSong: Song | null = null

    constructor(){
        this.audio = new Audio()
        this.audio.preload = "auto"
    }

    load(url: string){
        if(this.audio.src != url){
            this.audio.src = url
        }
    }

    play(song: Song){
        // if the same song just resume
        if (this.currentSong?.id === song.id){
            this.audio?.play()
            return
        }

        // load new song
        this.currentSong = song
        if (!this.audio) return

        this.audio.src = song.audioUrl
        this.audio.currentTime = 0
        this.audio.play()        
    }

    pause(){
        this.audio?.pause()
    }

    stop(){
        this.audio.pause()
        this.audio.currentTime = 0
    }

    seek(seconds : number){
        this.audio.currentTime = seconds
    }

    onEnded(callback: () => void){
        this.audio.onended = callback
    }

    getCurrentTime(){
        return this.audio.currentTime
    }

}

export const audioEngine = new AudioEngine()