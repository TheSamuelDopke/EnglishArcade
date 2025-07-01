// Palavras por nível - Mantenha esta declaração única
import { words } from "./palavras.js";

// Importações do banco de dados
import {
   initDB,
   saveNickname,
   getSavedNickname,
   saveToRanking,
   getRanking,
} from "./index.db.js";

// Importações das funções musicais
import { startBackgroundMusic, stopBackgroundMusic } from "./music.js";

let nickname = "";
let score = 0;
let usedWords = [];
let currentWord;
const successSound = new Audio("sounds/success.mp3");
const failSound = new Audio("sounds/derrota2.mp3");
let errorMessageElement; // Declare it here

export function startGame() {
   const input = document.getElementById("nicknameInput");
   nickname = input.value.trim();
   if (!nickname) {
      alert("Digite um nome válido!");
      return;
   }

   saveNickname(nickname, 0); // salva inicialmente com score 0

   document.getElementById("playerName").textContent = nickname;
   document.getElementById("nicknameSection").classList.add("hidden");
   document.getElementById("gameSection").classList.remove("hidden");
   var translationInput = document.getElementById("translationInput");
   translationInput.focus();
   score = 0;
   document.getElementById("score").textContent = score;
   usedWords = [];

   // Initialize errorMessageElement here when the game starts
   errorMessageElement = document.getElementById("errorMessage"); // Get reference here
   if (errorMessageElement) {
      // Ensure it exists before trying to clear it
      errorMessageElement.innerHTML = ""; // Clear any previous error message
   }

   nextWord(); // This will display the first word and clear any error

   startBackgroundMusic();
}

function giveUp() {
   saveNickname(nickname, score); // salva com pontuação real

   // Prepare the correct answers for display
   const validAnswers = Array.isArray(currentWord.pt)
      ? currentWord.pt
      : [currentWord.pt];
   failSound.play();
   // Exibe a mensagem de desistência
   errorMessageElement.innerHTML = `
        Você desistiu com ${score} pontos.<br>
        <span class="correct-answer">${validAnswers.join(" ou ")}</span>
   `;

   // Agenda o reset do jogo após 10 segundos para que o usuário possa ver a mensagem.
   setTimeout(() => {
      saveToRanking(nickname, score, () => {
         resetGame();
      });
   }, 10000); // 10 segundos de atraso

   stopBackgroundMusic();
}

function checkTranslation() {
   const input = document
      .getElementById("translationInput")
      .value.trim()
      .toLowerCase();

   const validAnswers = Array.isArray(currentWord.pt)
      ? currentWord.pt
      : [currentWord.pt];
   const validAnswersLower = validAnswers.map((ans) => ans.toLowerCase());

   if (validAnswersLower.includes(input)) {
      successSound.currentTime = 0;
      successSound.play();
      triggerFirework();
      score++;
      document.getElementById("score").textContent = score;
      errorMessageElement.innerHTML = ""; // Limpa a mensagem de erro em caso de sucesso
      nextWord();
   } else {
      failSound.currentTime = 0;
      failSound.play();

      // Exibe a mensagem de erro
      errorMessageElement.innerHTML = `
            <span class="wrong-answer">${input}</span><br>
            <span class="correct-answer">${validAnswers.join(" ou ")}</span>
        `;

      saveNickname(nickname, score); // Salva a pontuação antes de resetar ou continuar

      setTimeout(() => {
         saveToRanking(nickname, score, () => {
            // Continua com o salvamento no ranking
            resetGame(); // Agora o reset acontece após o atraso
         });
      }, 10000); //atraso
   }
}

function loadRanking() {
   getRanking((ranking) => {
      const list = document.getElementById("ranking");
      list.innerHTML = "";
      ranking.forEach((entry) => {
         const li = document.createElement("li");
         li.textContent = `${entry.nickname} - ${entry.score} pontos`;
         list.appendChild(li);
      });
   });
}

function nextWord() {
   // Clear error message when a new word is presented
   if (errorMessageElement) {
      // Ensure it exists before trying to clear it
      errorMessageElement.innerHTML = "";
   }
   document.getElementById("translationInput").value = ""; // Clear the input field

   const level =
      score < 20 ? "basic" : score < 50 ? "intermediate" : "advanced";
   const availableWords = words[level].filter((w) => !usedWords.includes(w.en));

   if (availableWords.length === 0) {
      let nextLevelWords = [];
      if (level === "basic" && words["intermediate"]) {
         nextLevelWords = words["intermediate"].filter(
            (w) => !usedWords.includes(w.en)
         );
      } else if (level === "intermediate" && words["advanced"]) {
         nextLevelWords = words["advanced"].filter(
            (w) => !usedWords.includes(w.en)
         );
      }

      if (nextLevelWords.length > 0) {
         currentWord =
            nextLevelWords[Math.floor(Math.random() * nextLevelWords.length)];
         usedWords.push(currentWord.en);
         document.getElementById("englishWord").textContent = currentWord.en;
         document.getElementById("translationInput").value = "";
         return;
      } else {
         alert("Você completou todas as palavras disponíveis!");
         // Passa loadRanking como callback para saveToRanking
         saveToRanking(nickname, score, () => {
            resetGame();
         });
         return;
      }
   }

   currentWord =
      availableWords[Math.floor(Math.random() * availableWords.length)];
   usedWords.push(currentWord.en);
   document.getElementById("englishWord").textContent = currentWord.en;
   document.getElementById("translationInput").value = "";
}

function resetGame() {
   document.getElementById("gameSection").classList.add("hidden");
   document.getElementById("nicknameSection").classList.remove("hidden");
   document.getElementById("nicknameInput").value = "";
   score = 0;
   usedWords = [];
   loadRanking(); // Mantido aqui para garantir que o ranking seja carregado quando o jogo é resetado manualmente
   if (errorMessageElement) {
      // Ensure it exists before trying to clear it
      errorMessageElement.innerHTML = ""; // Clear error message on game reset
   }

   stopBackgroundMusic();
}

initDB(() => {
   loadRanking();
});

document.addEventListener("keydown", (event) => {
   const nicknameInput = document.getElementById("nicknameInput");
   const translationInput = document.getElementById("translationInput");
   const nicknameVisible = !document
      .getElementById("nicknameSection")
      .classList.contains("hidden");
   const gameVisible = !document
      .getElementById("gameSection")
      .classList.contains("hidden");

   if (event.key === "Enter") {
      if (nicknameVisible && document.activeElement === nicknameInput) {
         event.preventDefault();
         startGame();
      } else if (gameVisible && document.activeElement === translationInput) {
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

   const launch = document.createElement("div");
   launch.classList.add("firework-launch");
   const left = Math.random() * 80 + 10; // entre 10% e 90%
   launch.style.left = `${left}%`;
   container.appendChild(launch);

   // Após o lançamento, cria partículas
   setTimeout(() => {
      launch.remove();
      for (let i = 0; i < 10; i++) {
         const particle = document.createElement("div");
         particle.classList.add("firework-particle");
         particle.style.left = `${left}%`;
         particle.style.bottom = `300px`; // mesmo valor da explosão
         const angle = Math.random() * 2 * Math.PI;
         const radius = Math.random() * 80 + 20;
         const x = Math.cos(angle) * radius;
         const y = Math.sin(angle) * radius;
         particle.style.setProperty("--x", `${x}px`);
         particle.style.setProperty("--y", `${-y}px`);
         particle.style.backgroundColor = `hsl(${
            Math.random() * 360
         }, 100%, 60%)`;
         container.appendChild(particle);

         setTimeout(() => particle.remove(), 600);
      }
   }, 600);
}

window.startGame = startGame;
window.checkTranslation = checkTranslation;
window.giveUp = giveUp;
