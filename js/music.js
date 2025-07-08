const audio = document.getElementById("backgroundMusic");

audio.src = "../sounds/backgroundMusic.mp3"
let lastVolume = 1
let isMuted = false;
const botao = document.getElementById("Mute")
botao.innerHTML = `<img src="img/mute.png" alt="Mutar" style="width: 40px; height: 40px;">`

audio.src = "sounds/backgroundMusic.mp3";


const defeatAudio = document.createElement('audio')
defeatAudio.src = "../sounds/derrota2.mp3"

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
   if (!isMuted) {
      lastVolume = audio.volume;
      audio.volume = 0;
      isMuted = true;
      botao.innerHTML = `<img src="img/unmute.png" alt="Som desligado" style="width: 40px; height: 40px;">`;
   } else {
      audio.volume = lastVolume;
      isMuted = false;
      botao.innerHTML = `<img src="img/mute.png" alt="Som ligado" style="width: 40px; height: 40px;">`;
   }
}

export function defeatMusic(){
   defeatAudio.play()
}

window.muteMusic = muteMusic