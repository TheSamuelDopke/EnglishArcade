// Palavras por nível - Mantenha esta declaração única
const words = {
  basic: [
    { en: 'cat', pt: 'gato' }, { en: 'dog', pt: 'cachorro' }, { en: 'house', pt: 'casa' },
    { en: 'sun', pt: 'sol' }, { en: 'book', pt: 'livro' }, { en: 'car', pt: 'carro' },
    { en: 'milk', pt: 'leite' }, { en: 'water', pt: 'água' }, { en: 'bread', pt: 'pão' },
    { en: 'apple', pt: 'maçã' }, { en: 'school', pt: 'escola' },
    { en: 'pen', pt: 'caneta' }, { en: 'chair', pt: 'cadeira' }, { en: 'table', pt: 'mesa' },
    { en: 'window', pt: 'janela' }, { en: 'door', pt: 'porta' }, { en: 'tree', pt: 'árvore' },
    { en: 'flower', pt: 'flor' }, { en: 'phone', pt: 'telefone' }
  ],
  intermediate: [
    { en: 'kitchen', pt: 'cozinha' }, { en: 'mirror', pt: 'espelho' }, { en: 'garden', pt: 'jardim' },
    { en: 'bottle', pt: 'garrafa' }, { en: 'teacher', pt: 'professor' }, { en: 'student', pt: ['aluno', 'estudante'] },
    { en: 'market', pt: 'mercado' }, { en: 'clothes', pt: 'roupas' }, { en: 'computer', pt: 'computador' },
    { en: 'keyboard', pt: 'teclado' }, { en: 'mouse', pt: 'rato' }, { en: 'pencil', pt: 'lápis' },
    { en: 'notebook', pt: 'caderno' }, { en: 'television', pt: 'televisão' }, { en: 'refrigerator', pt: 'geladeira' },
    { en: 'street', pt: 'rua' }, { en: 'traffic', pt: 'trânsito' }, { en: 'weather', pt: 'clima' },
    { en: 'holiday', pt: 'feriado' }, { en: 'birthday', pt: 'aniversário' }, { en: 'medicine', pt: 'remédio' },
    { en: 'hospital', pt: 'hospital' }, { en: 'airplane', pt: 'avião' }, { en: 'airport', pt: 'aeroporto' },
    { en: 'bicycle', pt: 'bicicleta' }, { en: 'mountain', pt: 'montanha' }, { en: 'river', pt: 'rio' },
    { en: 'forest', pt: 'floresta' }, { en: 'countryside', pt: ['campo', 'interior'] }, { en: 'city', pt: 'cidade' }
  ],
  advanced: [
    { en: 'achievement', pt: ['realização', 'conquista'] }, { en: 'development', pt: 'desenvolvimento' }, { en: 'relationship', pt: 'relacionamento' },
    { en: 'government', pt: 'governo' }, { en: 'environment', pt: 'meio ambiente' }, { en: 'responsibility', pt: 'responsabilidade' },
    { en: 'opportunity', pt: 'oportunidade' }, { en: 'investment', pt: 'investimento' }, { en: 'leadership', pt: 'liderança' },
    { en: 'partnership', pt: 'parceria' }, { en: 'knowledge', pt: 'conhecimento' }, { en: 'management', pt: 'gestão' },
    { en: 'entrepreneur', pt: 'empreendedor' }, { en: 'strategy', pt: 'estratégia' }, { en: 'sustainability', pt: 'sustentabilidade' },
    { en: 'technology', pt: 'tecnologia' }, { en: 'innovation', pt: 'inovação' }, { en: 'negotiation', pt: 'negociação' },
    { en: 'performance', pt: 'desempenho' }, { en: 'efficiency', pt: 'eficiência' }, { en: 'productivity', pt: 'produtividade' },
    { en: 'communication', pt: 'comunicação' }, { en: 'motivation', pt: 'motivação' },
    { en: 'achievement', pt: 'conquista' }, { en: 'perception', pt: 'percepção' }, { en: 'contribution', pt: 'contribuição' },
    { en: 'collaboration', pt: 'colaboração' }, { en: 'situation', pt: 'situação' }, { en: 'evaluation', pt: 'avaliação' },
    { en: 'qualification', pt: 'qualificação' }, { en: 'application', pt: 'aplicação' }, { en: 'registration', pt: 'registro' },
    { en: 'participation', pt: 'participação' }, { en: 'interview', pt: 'entrevista' }, { en: 'requirement', pt: 'requisito' },
    { en: 'department', pt: 'departamento' }, { en: 'experience', pt: 'experiência' }, { en: 'discipline', pt: 'disciplina' },
    { en: 'laboratory', pt: 'laboratório' }, { en: 'experiment', pt: 'experimento' }
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
let lastRanking = [];
const successSound = new Audio('sounds/success.mp3');
const failSound = new Audio('sounds/derrota2.mp3')

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
    successSound.currentTime = 0;
    successSound.play();
    triggerFirework();
    score++;
    document.getElementById('score').textContent = score;

    // Atualiza ranking em tempo real após acerto
    saveToRanking(nickname, score, () => {
      loadRanking(); // Recarrega a lista no HTML
    });

    nextWord();
  } else {
    failSound.currentTime = 0; // Garante que o som reinicie
    failSound.play();
    saveToRanking(nickname, score, () => {
      alert(`Errou! A tradução correta era: ${validAnswers.join(' ou ')}. Você fez ${score} pontos.`);
      resetGame();
    });
  }
}

function loadRanking() {
  getRanking((ranking) => {
    const list = document.getElementById('ranking');
    const itemsMap = {};

    // Guarda posição inicial de cada item (First)
    const firstPositions = new Map();
    Array.from(list.children).forEach(li => {
      itemsMap[li.dataset.nickname] = li;
      firstPositions.set(li.dataset.nickname, li.getBoundingClientRect());
    });

    // Cria a nova lista reorganizada
    const newItems = [];

    ranking.forEach((entry, index) => {
      let li = itemsMap[entry.nickname];
      if (!li) {
        li = document.createElement('li');
        li.dataset.nickname = entry.nickname;
      }
      li.textContent = `${entry.nickname} - ${entry.score} pontos`;
      newItems.push(li);
    });

    // Substitui a lista sem apagar os elementos
    list.innerHTML = '';
    newItems.forEach(li => list.appendChild(li));

    // Espera o DOM aplicar as novas posições (Last)
    requestAnimationFrame(() => {
      newItems.forEach(li => {
        const first = firstPositions.get(li.dataset.nickname);
        if (!first) return;

        const last = li.getBoundingClientRect();

        const dx = first.left - last.left;
        const dy = first.top - last.top;

        if (dx !== 0 || dy !== 0) {
          li.style.transition = 'none';
          li.style.transform = `translate(${dx}px, ${dy}px)`;

          // Força reflow
          li.offsetHeight;

          // Ativa transição suave
          li.style.transition = 'transform 0.4s ease';
          li.style.transform = 'translate(0, 0)';

          // Após a transição, limpa o estilo
          li.addEventListener('transitionend', () => {
            li.style.transition = '';
            li.style.transform = '';
          }, { once: true });
        }
      });
    });

    lastRanking = ranking.map(e => ({ ...e }));
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

function triggerFirework() {
  const container = document.getElementById('fireworkContainer');

  const launch = document.createElement('div');
  launch.classList.add('firework-launch');
  const left = Math.random() * 80 + 10; // entre 10% e 90%
  launch.style.left = `${left}%`;
  container.appendChild(launch);

  // Após o lançamento, cria partículas
  setTimeout(() => {
    launch.remove();
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.classList.add('firework-particle');
      particle.style.left = `${left}%`;
      particle.style.bottom = `300px`; // mesmo valor da explosão
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 80 + 20;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${-y}px`);
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
      container.appendChild(particle);

      setTimeout(() => particle.remove(), 600);
    }
  }, 600);
}

window.startGame = startGame;
window.checkTranslation = checkTranslation;
window.giveUp = giveUp;