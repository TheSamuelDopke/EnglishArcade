
const audio = document.getElementById('backgroundMusic')

export function startBackgroundMusic() {
    audio.play()
    audio.loop = true
    console.log(audio)
}

export function stopBackgroundMusic(){
    audio.pause()
    audio.currentTime = 0
}