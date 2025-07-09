let errorMessageElementTime = document.getElementById("errorMessage");
let responseInterval
let remainingTime = 10
let showTimer = document.getElementById('showTimer')
import { stopBackgroundMusic, startBackgroundMusic } from "./music.js";

import { checkTranslation} from "./pensamento.js";

  var sendButton = document.querySelector("#gameSection button:nth-of-type(1)");
  var giveUpButton = document.querySelector("#gameSection button:nth-of-type(2)");

export function iniciarIntervaloResposta(){

    clearInterval(responseInterval)

    remainingTime = resetTimer()
    if(showTimer.classList.contains('timeOver')){
        showTimer.classList.remove('timeOver')
    }
    showTimer.classList.add("timeOver")



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
       errorMessageElementTime.classList.remove('hidden')
        checkTranslation(true)

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

    showTimer.textContent = '10'
    return 10
    

}