import { Song } from "../data/types"

export class AudioEngine{
    private audio: HTMLAudioElement
    private currentSong: Song | null = null

    public seek(time: number): void {
        if (this.audio) {
            this.audio.currentTime = time;
        }
    }

    public getCurrentTime(): number {
        return this.audio ? this.audio.currentTime : 0;
    }

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

    onEnded(callback: () => void){
        this.audio.onended = callback
    }

}

export const audioEngine = new AudioEngine()