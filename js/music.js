const audio = document.getElementById("backgroundMusic");
audio.src = "sounds/backgroundMusic.mp3";
let lastVolume = 1;
let isMuted = false;
const botao = document.getElementById("Mute");
botao.innerHTML = `<img src="img/mute.png" alt="Mutar" style="width: 20px; height: 20px;">`;

export function startBackgroundMusic() {
   audio.play();
   audio.loop = true;
   console.log(audio);
}

export function stopBackgroundMusic() {
   audio.pause();
   audio.currentTime = 0;
}

export function muteMusic() {
   if (!isMuted) {
      lastVolume = audio.volume;
      audio.volume = 0;

      if (window.successSound) {
         window.successSound.pause();
         window.successSound.currentTime = 0;
      }
      if (window.failSound) {
         window.failSound.pause();
         window.failSound.currentTime = 0;
      }

      isMuted = true;
      window.isMuted = true;
      botao.innerHTML = `<img src="img/unmute.png" alt="Som desligado" style="width: 20px; height: 20px;">`;
   } else {
      audio.volume = lastVolume;

      isMuted = false;
      window.isMuted = false;
      botao.innerHTML = `<img src="img/mute.png" alt="Som ligado" style="width: 20px; height: 20px;">`;
   }
}


window.muteMusic = muteMusic;