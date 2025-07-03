const audio = document.getElementById("backgroundMusic");
audio.src = "sounds/backgroundMusic.mp3";

export function startBackgroundMusic() {
   audio.play();
   audio.loop = true;
   console.log(audio);
}

export function stopBackgroundMusic() {
   audio.pause();
   audio.currentTime = 0;
}
