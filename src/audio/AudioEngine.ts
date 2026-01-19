export class AudioEngine{
    private audio: HTMLAudioElement

    constructor(){
        this.audio = new Audio()
        this.audio.preload = "auto"
    }

    load(url: string){
        if(this.audio.src != url){
            this.audio.src = url
        }
    }

    play(){
        this.audio.play()
    }

    pause(){
        this.audio.pause()
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