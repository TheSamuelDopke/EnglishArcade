// Palavras por nível - Mantenha esta declaração única
const words = {
  basic: [
    {en: 'sun', pt: 'sol'},
    {en: 'dog', pt: 'cachorro'},
    {en: 'cat', pt: 'gato'},
    {en: 'book', pt: 'livro'},
    {en: 'car', pt: 'carro'},
    {en: 'milk', pt: 'leite'},
    {en: 'water', pt: 'água'},
    {en: 'bread', pt: 'pão'},
    {en: 'apple', pt: 'maçã'},
    {en: 'house', pt: 'casa'},
    {en: 'pen', pt: 'caneta'},
    {en: 'chair', pt: 'cadeira'},
    {en: 'table', pt: 'mesa'},
    {en: 'door', pt: 'porta'},
    {en: 'tree', pt: 'árvore'},
    {en: 'flower', pt: 'flor'},
    {en: 'phone', pt: 'telefone'},
    {en: 'fish', pt: 'peixe'},
    {en: 'bed', pt: 'cama'},
    {en: 'cup', pt: 'xícara'},
    {en: 'shirt', pt: 'camisa'},
    {en: 'hat', pt: 'chapéu'},
    {en: 'shoe', pt: 'sapato'},
    {en: 'milk', pt: 'leite'},
    {en: 'eye', pt: 'olho'},
    {en: 'nose', pt: 'nariz'},
    {en: 'ear', pt: 'orelha'},
    {en: 'mouth', pt: 'boca'},
    {en: 'hand', pt: 'mão'},
    {en: 'foot', pt: 'pé'},
    {en: 'bird', pt: 'pássaro'},
    {en: 'rain', pt: 'chuva'},
    {en: 'star', pt: 'estrela'},
    {en: 'sky', pt: 'céu'},
    {en: 'grass', pt: 'grama'},
    {en: 'road', pt: 'estrada'},
    {en: 'carrot', pt: 'cenoura'},
    {en: 'milk', pt: 'leite'},
    {en: 'egg', pt: 'ovo'},
    {en: 'cake', pt: 'bolo'},
    {en: 'fork', pt: 'garfo'},
    {en: 'knife', pt: 'faca'},
    {en: 'spoon', pt: 'colher'},
    {en: 'water', pt: 'água'},
    {en: 'cold', pt: 'frio'},
    {en: 'hot', pt: 'quente'},
    {en: 'day', pt: 'dia'}
  ],
  intermediate: [
    
    {en: 'delay', pt: 'atraso'},
    {en: 'fault', pt: 'culpa'},
    {en: 'trust', pt: 'confiança'},
    {en: 'guess', pt: 'palpite'},
    {en: 'trade', pt: 'comércio'},
    {en: 'task', pt: 'tarefa'},
    {en: 'deal', pt: 'acordo'},
    {en: 'shift', pt: 'mudança'},
    {en: 'aim', pt: 'objetivo'},
    {en: 'pace', pt: 'ritmo'},
    {en: 'scope', pt: 'alcance'},
    {en: 'grant', pt: 'concessão'},
    {en: 'urge', pt: 'impulso'},
    {en: 'wage', pt: 'salário'},
    {en: 'score', pt: 'pontuação'},
    {en: 'rule', pt: 'regra'},
    {en: 'track', pt: 'trilha'},
    {en: 'link', pt: 'vínculo'},
    {en: 'trend', pt: 'tendência'},
    {en: 'trial', pt: 'tentativa'},
    {en: 'scheme', pt: 'esquema'},
    {en: 'asset', pt: 'ativo'},
    {en: 'load', pt: 'carga'},
    {en: 'bid', pt: 'oferta'},
    {en: 'edge', pt: 'borda'},
    {en: 'claim', pt: 'alegação'},
    {en: 'sue', pt: 'processar'},
    {en: 'fine', pt: 'multa'},
    {en: 'gap', pt: 'lacuna'},
    {en: 'hint', pt: 'dica'},
    {en: 'bond', pt: 'laço'},
    {en: 'lease', pt: 'aluguel'},
    {en: 'rate', pt: 'taxa'},
    {en: 'gain', pt: 'ganho'},
    {en: 'loss', pt: 'perda'},
    {en: 'fee', pt: 'taxa'},
    {en: 'bulk', pt: 'volume'},
    {en: 'risk', pt: 'risco'},
    {en: 'fund', pt: 'fundo'},
    {en: 'share', pt: 'parte'},
    {en: 'blame', pt: 'culpa'},
    {en: 'draft', pt: 'rascunho'},
    {en: 'pile', pt: 'pilha'},
    {en: 'tide', pt: 'maré'},
    {en: 'grasp', pt: 'compreensão'},
    {en: 'trap', pt: 'armadilha'},
    {en: 'suit', pt: 'terno'}
   
  ],
  advanced: [
     {en: 'grit', pt: 'determinação'},
    {en: 'whim', pt: 'capricho'},
    {en: 'bliss', pt: 'felicidade plena'},
    {en: 'fluke', pt: 'acaso improvável'},
    {en: 'quirk', pt: 'peculiaridade'},
    {en: 'drought', pt: 'seca'},
    {en: 'slope', pt: 'inclinação'},
    {en: 'thaw', pt: 'degelo'},
    {en: 'wreck', pt: 'destroço'},
    {en: 'hunch', pt: 'pressentimento'},
    {en: 'glimpse', pt: 'vislumbre'},
    {en: 'flaw', pt: 'falha'},
    {en: 'guise', pt: 'aparência enganosa'},
    {en: 'stealth', pt: 'furtividade'},
    {en: 'wrath', pt: 'ira'},
    {en: 'grudge', pt: 'rancor'},
    {en: 'gleam', pt: 'brilho'},
    {en: 'smirk', pt: 'sorriso de canto'},
    {en: 'clutch', pt: 'agarrar'},
    {en: 'swamp', pt: 'pântano'},
    {en: 'brisk', pt: 'rápido e enérgico'},
    {en: 'hassle', pt: 'transtorno'},
    {en: 'bulk', pt: 'volume'},
    {en: 'doom', pt: 'ruína'},
    {en: 'haste', pt: 'pressa'},
    {en: 'spree', pt: 'farra'},
    {en: 'stray', pt: 'perdido'},
    {en: 'stumble', pt: 'tropeçar'},
    {en: 'plight', pt: 'apuro'},
    {en: 'glee', pt: 'alegria intensa'},
    {en: 'scorn', pt: 'desprezo'},
    {en: 'spunk', pt: 'coragem'},
    {en: 'rubble', pt: 'escombros'},
    {en: 'sling', pt: 'atirar'},
    {en: 'smug', pt: 'presunçoso'},
    {en: 'slum', pt: 'favela'},
    {en: 'dread', pt: 'pavor'},
    {en: 'nag', pt: 'implicar'},
    {en: 'shove', pt: 'empurrão'},
    {en: 'slack', pt: 'folgado'},
    {en: 'ramp', pt: 'rampa'},
    {en: 'grunt', pt: 'grunhido'},
    {en: 'moan', pt: 'gemido'},
    {en: 'crook', pt: 'ladrão'},
    {en: 'rookie', pt: 'novato'},
    {en: 'knack', pt: 'jeitinho'},
    {en: 'gulp', pt: 'engolir rapidamente'},
    {en: 'flick', pt: 'peteleco'},
    {en: 'jolt', pt: 'sacudida'},
    {en: 'shabby', pt: 'gasto / puído'},
    {en: 'repercussion', pt: 'repercussão'}, {en: 'jurisdiction', pt: 'jurisdição'}, {en: 'protagonism', pt: 'protagonismo'}
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

let nickname = '';
let score = 0;
let usedWords = [];
let currentWord;

function startGame() {
  const input = document.getElementById('nicknameInput');
  nickname = input.value.trim();
  if (!nickname) {
    alert('Digite um nome válido!');
    return;
  }
  saveNickname(nickname);
  document.getElementById('playerName').textContent = nickname;
  document.getElementById('nicknameSection').classList.add('hidden');
  document.getElementById('gameSection').classList.remove('hidden');
  var translationInput = document.getElementById('translationInput');
  translationInput.focus();
  score = 0;
  document.getElementById('score').textContent = score;
  usedWords = [];
  nextWord();
}

function checkSavedNickname() {
  getSavedNickname((savedName) => {
    if (savedName) {
      document.getElementById('nicknameInput').value = savedName;
    }
  });
}

function giveUp() {
  // Passa loadRanking como callback para saveToRanking
  saveToRanking(nickname, score, () => {
    alert(`Você desistiu com ${score} pontos.`);
    resetGame();
  });
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
  const level = score < 21 ? 'basic' : (score < 50 ? 'intermediate' : 'advanced');
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
}

initDB(() => {
  checkSavedNickname();
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