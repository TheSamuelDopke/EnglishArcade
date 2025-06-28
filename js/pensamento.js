// Palavras por nível - Mantenha esta declaração única
const words = {
  basic: [
    {en: 'cat', pt: 'gato'}, {en: 'dog', pt: 'cachorro'}, {en: 'house', pt: 'casa'},
    {en: 'sun', pt: 'sol'}, {en: 'book', pt: 'livro'}, {en: 'car', pt: 'carro'},
    {en: 'milk', pt: 'leite'}, {en: 'water', pt: 'água'}, {en: 'bread', pt: 'pão'},
    {en: 'apple', pt: 'maçã'}, {en: 'school', pt: 'escola'},
    {en: 'pen', pt: 'caneta'}, {en: 'chair', pt: 'cadeira'}, {en: 'table', pt: 'mesa'},
    {en: 'window', pt: 'janela'}, {en: 'door', pt: 'porta'}, {en: 'tree', pt: 'árvore'},
    {en: 'flower', pt: 'flor'}, {en: 'phone', pt: 'telefone'}
  ],
  intermediate: [
    {en: 'kitchen', pt: 'cozinha'}, {en: 'mirror', pt: 'espelho'}, {en: 'garden', pt: 'jardim'},
    {en: 'bottle', pt: 'garrafa'}, {en: 'teacher', pt: 'professor'}, {en: 'student', pt: ['aluno', 'estudante']},
    {en: 'market', pt: 'mercado'}, {en: 'clothes', pt: 'roupas'}, {en: 'computer', pt: 'computador'},
    {en: 'keyboard', pt: 'teclado'}, {en: 'mouse', pt: 'rato'}, {en: 'pencil', pt: 'lápis'},
    {en: 'notebook', pt: 'caderno'}, {en: 'television', pt: 'televisão'}, {en: 'refrigerator', pt: 'geladeira'},
    {en: 'street', pt: 'rua'}, {en: 'traffic', pt: 'trânsito'}, {en: 'weather', pt: 'clima'},
    {en: 'holiday', pt: 'feriado'}, {en: 'birthday', pt: 'aniversário'}, {en: 'medicine', pt: 'remédio'},
    {en: 'hospital', pt: 'hospital'}, {en: 'airplane', pt: 'avião'}, {en: 'airport', pt: 'aeroporto'},
    {en: 'bicycle', pt: 'bicicleta'}, {en: 'mountain', pt: 'montanha'}, {en: 'river', pt: 'rio'},
    {en: 'forest', pt: 'floresta'}, {en: 'countryside', pt: ['campo', 'interior']}, {en: 'city', pt: 'cidade'}
  ],
  advanced: [
    {en: 'achievement', pt: ['realização', 'conquista']}, {en: 'development', pt: 'desenvolvimento'}, {en: 'relationship', pt: 'relacionamento'},
    {en: 'government', pt: 'governo'}, {en: 'environment', pt: 'meio ambiente'}, {en: 'responsibility', pt: 'responsabilidade'},
    {en: 'opportunity', pt: 'oportunidade'}, {en: 'investment', pt: 'investimento'}, {en: 'leadership', pt: 'liderança'},
    {en: 'partnership', pt: 'parceria'}, {en: 'knowledge', pt: 'conhecimento'}, {en: 'management', pt: 'gestão'},
    {en: 'entrepreneur', pt: 'empreendedor'}, {en: 'strategy', pt: 'estratégia'}, {en: 'sustainability', pt: 'sustentabilidade'},
    {en: 'technology', pt: 'tecnologia'}, {en: 'innovation', pt: 'inovação'}, {en: 'negotiation', pt: 'negociação'},
    {en: 'performance', pt: 'desempenho'}, {en: 'efficiency', pt: 'eficiência'}, {en: 'productivity', pt: 'produtividade'},
    {en: 'communication', pt: 'comunicação'}, {en: 'motivation', pt: 'motivação'},
    {en: 'achievement', pt: 'conquista'}, {en: 'perception', pt: 'percepção'}, {en: 'contribution', pt: 'contribuição'},
    {en: 'collaboration', pt: 'colaboração'}, {en: 'situation', pt: 'situação'}, {en: 'evaluation', pt: 'avaliação'},
    {en: 'qualification', pt: 'qualificação'}, {en: 'application', pt: 'aplicação'}, {en: 'registration', pt: 'registro'},
    {en: 'participation', pt: 'participação'}, {en: 'interview', pt: 'entrevista'}, {en: 'requirement', pt: 'requisito'},
    {en: 'department', pt: 'departamento'}, {en: 'experience', pt: 'experiência'}, {en: 'discipline', pt: 'disciplina'},
    {en: 'laboratory', pt: 'laboratório'}, {en: 'experiment', pt: 'experimento'}
  ]
};

// Importações do banco de dados
import {
  initDB,
  saveNickname,
  getSavedNickname,
  saveToRanking,
  getRanking
} from './index.db.js';

// Importações das funções musicais
import {startBackgroundMusic, stopBackgroundMusic} from './music.js'

let nickname = '';
let score = 0;
let usedWords = [];
let currentWord;

export function startGame() {
  const input = document.getElementById('nicknameInput');
  nickname = input.value.trim();
  if (!nickname) {
    alert('Digite um nome válido!');
    return;
  }
  document.getElementById('playerName').textContent = nickname;
  document.getElementById('nicknameSection').classList.add('hidden');
  document.getElementById('gameSection').classList.remove('hidden');
  var translationInput = document.getElementById('translationInput');
  translationInput.focus();
  score = 0;
  document.getElementById('score').textContent = score;
  usedWords = [];
  nextWord();

  startBackgroundMusic()
}



function giveUp() {
  // Passa loadRanking como callback para saveToRanking
  saveToRanking(nickname, score, () => {
    alert(`Você desistiu com ${score} pontos.`);
    resetGame();
  });
  stopBackgroundMusic()
}

function checkTranslation() {
  const input = document.getElementById('translationInput').value.trim().toLowerCase();

  const validAnswers = Array.isArray(currentWord.pt) ? currentWord.pt : [currentWord.pt];
  const validAnswersLower = validAnswers.map(ans => ans.toLowerCase());

  if (validAnswersLower.includes(input)) {
    score++;
    document.getElementById('score').textContent = score;
    nextWord();
  } else {
    // Passa loadRanking como callback para saveToRanking
    saveToRanking(nickname, score, () => {
      alert(`Errou! A tradução correta era: ${validAnswers.join(' ou ')}. Você fez ${score} pontos.`);
      resetGame();
    });
  }
}

function loadRanking() {
  getRanking((ranking) => {
    const list = document.getElementById('ranking');
    list.innerHTML = '';
    ranking.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.nickname} - ${entry.score} pontos`;
      list.appendChild(li);
    });
  });
}

function nextWord() {
  const level = score < 20 ? 'basic' : (score < 50 ? 'intermediate' : 'advanced');
  const availableWords = words[level].filter(w => !usedWords.includes(w.en));

  if (availableWords.length === 0) {
    let nextLevelWords = [];
    if (level === 'basic' && words['intermediate']) {
      nextLevelWords = words['intermediate'].filter(w => !usedWords.includes(w.en));
    } else if (level === 'intermediate' && words['advanced']) {
      nextLevelWords = words['advanced'].filter(w => !usedWords.includes(w.en));
    }

    if (nextLevelWords.length > 0) {
      currentWord = nextLevelWords[Math.floor(Math.random() * nextLevelWords.length)];
      usedWords.push(currentWord.en);
      document.getElementById('englishWord').textContent = currentWord.en;
      document.getElementById('translationInput').value = '';
      return;
    } else {
      alert('Você completou todas as palavras disponíveis!');
      // Passa loadRanking como callback para saveToRanking
      saveToRanking(nickname, score, () => {
        resetGame();
      });
      return;
    }
  }

  currentWord = availableWords[Math.floor(Math.random() * availableWords.length)];
  usedWords.push(currentWord.en);
  document.getElementById('englishWord').textContent = currentWord.en;
  document.getElementById('translationInput').value = '';
}

function resetGame() {
  document.getElementById('gameSection').classList.add('hidden');
  document.getElementById('nicknameSection').classList.remove('hidden');
  document.getElementById('nicknameInput').value = '';
  score = 0;
  usedWords = [];
  loadRanking(); // Mantido aqui para garantir que o ranking seja carregado quando o jogo é resetado manualmente

  stopBackgroundMusic()
}

initDB(() => {
  loadRanking();
});

document.addEventListener('keydown', (event) => {
  const nicknameInput = document.getElementById('nicknameInput');
  const translationInput = document.getElementById('translationInput');
  const nicknameVisible = !document.getElementById('nicknameSection').classList.contains('hidden');
  const gameVisible = !document.getElementById('gameSection').classList.contains('hidden');

  if (event.key === 'Enter') {
    if (nicknameVisible && document.activeElement === nicknameInput) {
      event.preventDefault();
      startGame();
    } else if (gameVisible && document.activeElement === translationInput) {
      event.preventDefault();
      checkTranslation();
    }
  }

  if (event.key === 'Escape' && gameVisible && document.activeElement === translationInput) {
    event.preventDefault();
    giveUp();
  }
});
window.startGame = startGame;
window.checkTranslation = checkTranslation;
window.giveUp = giveUp;


