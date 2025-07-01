const audio = document.getElementById("backgroundMusic");
audio.src = "sounds/backgroundMusic.mp3"
let lastVolume = 1
const botao = document.getElementById("Mute")

export function startBackgroundMusic() {
   audio.play();
   audio.loop = true;
   console.log(audio);
}

export function stopBackgroundMusic() {
   audio.pause();
   audio.currentTime = 0;
}

export function muteMusic(){
   if (audio.volume > 0){
      lastVolume = audio.volume 
      audio.volume = 0
   }
   else {
      audio.volume = lastVolume
   }
}

window.muteMusic = muteMusic