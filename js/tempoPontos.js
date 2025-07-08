let errorMessageElementTime = document.getElementById("errorMessage");
let responseInterval
let remainingTime = 11
let showTimer = document.getElementById('showTimer')
import { stopBackgroundMusic, startBackgroundMusic } from "./music.js";

  var sendButton = document.querySelector("#gameSection button:nth-of-type(1)");
  var giveUpButton = document.querySelector("#gameSection button:nth-of-type(2)");

export function iniciarIntervaloResposta(){

    clearInterval(responseInterval)
    if(showTimer.classList.contains('timeOver')){
        showTimer.classList.remove('timeOver')
    }

    showTimer.classList.add("timeOver")
    remainingTime = 11
    responseInterval = setInterval(() => {
    if(!sendButton.classList.contains("hidden")){
        remainingTime--;
    }

    showTimer.textContent = `${remainingTime}`
    console.log(remainingTime)
    if (remainingTime <= 0){
        clearInterval(responseInterval)
        if (errorMessageElementTime.textContent == "" && errorMessageElementTime.innerHTML == "" && !sendButton.classList.contains("hidden")){

       showTimer.textContent = `Seu tempo acabou!`;
        afterMistakeButtons.classList.remove("hidden");
        translationInput.disabled = true;
        sendButton.classList.add("hidden");
        giveUpButton.classList.add("hidden");
        stopBackgroundMusic()
        }

    }

}, 1000)
}

export function resetTimer(){
    remainingTime = 11
    

}