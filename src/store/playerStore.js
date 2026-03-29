class PlayerStore {
    playSong(song, songList) {
        this.currentSong = song;
        const currentIndex = songList.indexOf(song);
        this.queue = songList.slice(currentIndex + 1);
        this.isPlaying = true;
        this.proggress = 0;

        if (this.audio) {
            this.audio.src = song.url;
            this.audio.currentTime = 0;
            this.audio.play();
        }

    }

    pauseResume(){
        this.isPlaying = !this.isPlaying;
        if (this.audio) {
            if (this.isPlaying) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
        }
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
        
        if (this.shuffle) {
            this.queue.sort(() => Math.random() - 0.5);
        } else {
            const currentIndex = this.currentSongList.indexOf(this.currentSong);
            this.queue = this.currentSongList.slice(currentIndex + 1);
        }
    }

    nextSong() {
        if (this.repeatOne) {
        this.audio.currentTime = 0;
        this.audio.play();
        return;
        }

        if (this.queue.length === 0) {
            if (this.repeat) {
                this.queue = [...this.currentSongList];
                if (this.shuffle) this.queue.sort(() => Math.random() - 0.5);
            } else {
                this.isPlaying = false;
                return;
            }
        }

        this.currentSong = this.queue.shift();
        this.audio.src = this.currentSong.url;
        this.audio.play();
    }

    prevSong() {
        if (this.audio.currentTime > 3) {
            this.audio.currentTime = 0;
            this.audio.play();
            return;
        }

        const currentIndex = this.currentSongList.indexOf(this.currentSong);

        if (this.queue.length > 0) {
            const previousSong = this.currentSongList[currentIndex - 1];
            this.queue.unshift(this.currentSong);
            this.currentSong = previousSong;
            
            this.audio.src = this.currentSong.url;
            this.audio.currentTime = 0;

            if(this.isPlaying) {
                this.audio.play();
            }
        }
        else{
            this.audio.currentTime = 0;
             if(this.isPlaying) {
                this.audio.play();
            }
        }
    }

    setProgress(seconds){
        this.proggress = seconds;

        if (this.audio && Math.abs(this.audio.currentTime - seconds) > 0.5) {
            this.audio.currentTime = seconds;
        }
    }
}

