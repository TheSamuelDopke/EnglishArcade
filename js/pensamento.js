// Palavras por nível - Mantenha esta declaração única
import { words } from "./palavras.js";

import { resetTimer } from "./tempoPontos.js"


import {
   initDB,
   saveNickname,
   getSavedNickname,
   saveToRanking,
   getRanking,
} from "./index.db.js";

import { startBackgroundMusic, stopBackgroundMusic } from "./music.js";

import { iniciarIntervaloResposta } from "./tempoPontos.js";





const audio = document.getElementById("backgroundMusic");
audio.src = "sounds/backgroundMusic.mp3";
let lastVolumeBackground = 1;
let lastVolumeEffects = 1;
let isMuted = false;
const botao = document.getElementById("Mute");
botao.innerHTML = `<img src="img/mute.png" alt="Mutar" style="width: 20px; height: 20px;">`;

let nickname = "";
let score = 0;
let usedWords = [];
let currentWord;
const successSound = new Audio("sounds/success.mp3");
const failSound = new Audio("sounds/derrota2.mp3");

let nicknameInput;
let playerNameSpan;
let nicknameSection;
let gameSection;
let englishWordDiv;
let translationInput;
let scoreSpan;
let errorMessageElement;
let afterMistakeButtons;
let rankingList;
let muteButton;
let erroNick;

let sendButton;
let giveUpButton;

document.addEventListener("DOMContentLoaded", () => {
   nicknameInput = document.getElementById("nicknameInput");
   playerNameSpan = document.getElementById("playerName");
   nicknameSection = document.getElementById("nicknameSection");
   gameSection = document.getElementById("gameSection");
   englishWordDiv = document.getElementById("englishWord");
   translationInput = document.getElementById("translationInput");
   scoreSpan = document.getElementById("score");
   errorMessageElement = document.getElementById("errorMessage");
   afterMistakeButtons = document.getElementById("afterMistakeButtons");
   rankingList = document.getElementById("ranking");
   erroNick = document.getElementById("erroNick");

   sendButton = document.querySelector("#gameSection button:nth-of-type(1)");
   giveUpButton = document.querySelector("#gameSection button:nth-of-type(2)");

   sendButton = document.querySelector("#gameSection button:nth-of-type(1)");
   giveUpButton = document.querySelector("#gameSection button:nth-of-type(2)");

   if (muteButton) {
      muteButton.addEventListener("click", toggleAllSoundsMute);
   }

   initDB(() => {
      getSavedNickname((savedNickname) => {
         displayRanking();
      });
   });
});

function startGame() {
   resetTimer()
   nickname = nicknameInput.value.trim();
   if (nickname.length <= 0) {
      erroNick.textContent = "Digite um nome válido!";
      return;
   }

   erroNick.innerHTML = "";
   errorMessageElement.innerHTML = "";
   afterMistakeButtons.classList.add("hidden");

   saveNickname(nickname, 0);

   playerNameSpan.textContent = nickname;
   nicknameSection.classList.add("hidden");
   gameSection.classList.remove("hidden");

   translationInput.value = "";
   translationInput.focus();
   score = 0;
   scoreSpan.textContent = score;
   usedWords = [];

   translationInput.disabled = false;
   sendButton.classList.remove("hidden");
   giveUpButton.classList.remove("hidden");


   iniciarIntervaloResposta()
   nextWord();
   if (!isMuted) {
      startBackgroundMusic();
   }
}

export function checkTranslation(c = false) {
   
   let tempoAcabou = c

   const input = translationInput.value.trim().toLowerCase();

   errorMessageElement.innerHTML = "";
   afterMistakeButtons.classList.add("hidden");

   if (!currentWord) {
      errorMessageElement.textContent = "Nenhuma palavra para traduzir.";
      return;
   }

   let isCorrect = false;
   if (Array.isArray(currentWord.pt)) {
      isCorrect = currentWord.pt.some((p) => p.toLowerCase() === input);
   } else {
      isCorrect = currentWord.pt.toLowerCase() === input;
   }

   if (isCorrect) {
      if (!window.isMuted) {
         successSound.currentTime = 0;
         successSound.play();
      }
      triggerFirework();
      score++;
      scoreSpan.textContent = score;
      nextWord();
      iniciarIntervaloResposta()
   } else {
      stopBackgroundMusic();
      if (!window.isMuted) {
         failSound.currentTime = 0;
         failSound.play();
      }

      let correctTranslation;
      if (Array.isArray(currentWord.pt)) {
         correctTranslation = currentWord.pt.join(", ");
      } else {
         correctTranslation = currentWord.pt;

      }
      if(tempoAcabou == false){
         errorMessageElement.innerHTML = `
            <span class="wrong-answer">${input}</span><br>
            <span class="correct-answer">${correctTranslation}</span>
        `;
      }else{
         errorMessageElement.innerHTML = `
            <span class="correct-answer">${correctTranslation}</span>
        `;
      }


      afterMistakeButtons.classList.remove("hidden");

      translationInput.disabled = true;
      sendButton.classList.add("hidden");
      giveUpButton.classList.add("hidden");

      saveNickname(nickname, score);
   }
}

export function playAgain() {
   saveToRanking(nickname, score, () => {
      console.log("Pontuação salva no ranking ao jogar novamente.");
      displayRanking();
      resetTimer()
      score = 0;
      scoreSpan.textContent = score;
      usedWords = [];
      errorMessageElement.innerHTML = "";
      afterMistakeButtons.classList.add("hidden");
      translationInput.value = "";
      translationInput.focus();

      translationInput.disabled = false;
      sendButton.classList.remove("hidden");
      giveUpButton.classList.remove("hidden");

      nextWord();
      if (!isMuted) {
         startBackgroundMusic();
      }
      iniciarIntervaloResposta()
   });
}

export function goToNicknameScreen() {
   stopBackgroundMusic();
   gameSection.classList.add("hidden");
   nicknameSection.classList.remove("hidden");
   nicknameInput.value = "";
   nicknameInput.focus();
   errorMessageElement.innerHTML = "";
   afterMistakeButtons.classList.add("hidden");
   resetTimer()
   saveToRanking(nickname, score, () => {
      score = 0;
      scoreSpan.textContent = score;
      usedWords = [];
      displayRanking();
   });

   translationInput.disabled = false;
   sendButton.classList.remove("hidden");
   giveUpButton.classList.remove("hidden");


}

export function giveUp() {
   if (!currentWord) {
      errorMessageElement.textContent =
         "Nenhuma palavra para traduzir para desistir.";
      return;
   }

   let correctTranslation;
   if (Array.isArray(currentWord.pt)) {
      correctTranslation = currentWord.pt.join(", ");
   } else {
      correctTranslation = currentWord.pt;
      if (!isMuted) {
         failSound.play();
      }
   }

   errorMessageElement.innerHTML = `
         <span class="wrong-answer">Você desistiu!</span><br>
         <span class="correct-answer">${correctTranslation}</span>
     `;

   afterMistakeButtons.classList.remove("hidden");
   translationInput.disabled = true;
   sendButton.classList.add("hidden");
   giveUpButton.classList.add("hidden");

   saveToRanking(nickname, score, () => {
      console.log("Pontuação salva e ranking atualizado após desistência.");
      displayRanking();
   });

   stopBackgroundMusic();
}

function displayRanking() {
   getRanking((ranking) => {
      rankingList.innerHTML = "";
      if (ranking.length === 0) {
         rankingList.innerHTML = "<li>Nenhum recorde ainda.</li>";
         return;
      }
      ranking.forEach((entry, index) => {
         const li = document.createElement("li");
         li.textContent = `${index + 1}° ${entry.nickname}: ${entry.score
            } pontos`;
         rankingList.appendChild(li);
      });
   });
}

function nextWord() {
   errorMessageElement.innerHTML = "";
   translationInput.value = "";
   translationInput.focus();

   translationInput.disabled = false;
   sendButton.classList.remove("hidden");
   giveUpButton.classList.remove("hidden");

   const level =
      score < 20 ? "basic" : score < 50 ? "intermediate" : "advanced";
   const allWordsInLevel = words[level];
   const availableWords = allWordsInLevel.filter(
      (w) => !usedWords.includes(w.en)
   );

   if (availableWords.length === 0) {
      let nextLevel = "";
      if (level === "basic") nextLevel = "intermediate";
      else if (level === "intermediate") nextLevel = "advanced";

      if (nextLevel && words[nextLevel] && words[nextLevel].length > 0) {
         usedWords = [];
         currentWord =
            words[nextLevel][
            Math.floor(Math.random() * words[nextLevel].length)
            ];
         usedWords.push(currentWord.en);
         englishWordDiv.textContent = currentWord.en;
         errorMessageElement.textContent = `Nível ${level} completo! Passando para o nível ${nextLevel}.`;
         setTimeout(() => {
            errorMessageElement.textContent = "";
         }, 3000);
         return;
      } else {
         errorMessageElement.textContent =
            "Parabéns! Você traduziu todas as palavras disponíveis. Reiniciando o conjunto de palavras.";
         usedWords = [];
         setTimeout(() => {
            errorMessageElement.textContent = "";
            nextWord();
         }, 3000);
         return;
      }
   }

   currentWord =
      availableWords[Math.floor(Math.random() * availableWords.length)];
   usedWords.push(currentWord.en);
   englishWordDiv.textContent = currentWord.en;
}

function resetGame() {
   gameSection.classList.add("hidden");
   nicknameSection.classList.remove("hidden");
   nicknameInput.value = "";
   nicknameInput.focus();
   score = 0;
   scoreSpan.textContent = score;
   usedWords = [];
   errorMessageElement.innerHTML = "";
   afterMistakeButtons.classList.add("hidden");

   translationInput.disabled = false;
   sendButton.classList.remove("hidden");
   giveUpButton.classList.remove("hidden");

   stopBackgroundMusic();
   displayRanking();
}

document.addEventListener("keydown", (event) => {
   if (!nicknameInput || !translationInput || !nicknameSection || !gameSection)
      return;

   const nicknameVisible = !nicknameSection.classList.contains("hidden");
   const gameVisible = !gameSection.classList.contains("hidden");

   if (event.key === "Enter") {
      if (nicknameVisible && document.activeElement === nicknameInput) {
         event.preventDefault();
         startGame();
      } else if (
         gameVisible &&
         document.activeElement === translationInput &&
         !translationInput.disabled
      ) {
         event.preventDefault();
         checkTranslation();
      }
   }

   if (
      event.key === "Escape" &&
      gameVisible &&
      document.activeElement === translationInput
   ) {
      event.preventDefault();
      giveUp();
   }
});

function triggerFirework() {
   const container = document.getElementById("fireworkContainer");
   if (!container) {
      console.warn(
         "Elemento com ID 'fireworkContainer' não encontrado. A animação do Firework não será reproduzida."
      );
      return;
   }

   const launch = document.createElement("div");
   launch.classList.add("firework-launch");
   const left = Math.random() * 80 + 10;
   launch.style.left = `${left}%`;
   container.appendChild(launch);

   setTimeout(() => {
      launch.remove();
      for (let i = 0; i < 10; i++) {
         const particle = document.createElement("div");
         particle.classList.add("firework-particle");
         particle.style.left = `${left}%`;
         particle.style.bottom = `300px`;
         const angle = Math.random() * 2 * Math.PI;
         const radius = Math.random() * 80 + 20;
         const x = Math.cos(angle) * radius;
         const y = Math.sin(angle) * radius;
         particle.style.setProperty("--x", `${x}px`);
         particle.style.setProperty("--y", `${-y}px`);
         particle.style.backgroundColor = `hsl(${Math.random() * 360
            }, 100%, 60%)`;
         container.appendChild(particle);

         setTimeout(() => particle.remove(), 600);
      }
   }, 600);
}

window.startGame = startGame;
window.checkTranslation = checkTranslation;
window.giveUp = giveUp;
window.playAgain = playAgain;
window.goToNicknameScreen = goToNicknameScreen;
window.getScore = () => score;
window.setScore = (val) => { score = val };
window.getUsedWords = () => usedWords;
window.setUsedWords = (val) => { usedWords = val };
window.getCurrentWord = () => currentWord;
window.setCurrentWord = (val) => { currentWord = val };
window.nextWord = nextWord;
window.resetGame = resetGame;
window.successSound = successSound
window.failSound = failSound;
window.isMuted = isMuted;