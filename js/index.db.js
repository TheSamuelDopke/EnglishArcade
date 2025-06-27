let db;

export function initDB(callback) {
  const request = indexedDB.open('EnglishGameDB', 1);

  request.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains('users')) {
      db.createObjectStore('users', { keyPath: 'nickname' });
    }
    if (!db.objectStoreNames.contains('ranking')) {
      db.createObjectStore('ranking', { keyPath: 'nickname' });
    }
  };

  request.onsuccess = (e) => {
    db = e.target.result;
    callback();
  };

  request.onerror = () => {
    console.error("Erro ao abrir o banco de dados.");
  };
}

export function saveNickname(nickname) {
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  store.put({ nickname });
}

export function getSavedNickname(callback) {
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const request = store.getAll();

  request.onsuccess = () => {
    const result = request.result;
    if (result.length > 0) callback(result[0].nickname);
  };
}

export function saveToRanking(nickname, score, callback) { // Adicionado callback
  const tx = db.transaction('ranking', 'readwrite');
  const store = tx.objectStore('ranking');

  const getAllReq = store.getAll();
  getAllReq.onsuccess = () => {
    let data = getAllReq.result;
    const existing = data.find(entry => entry.nickname === nickname);

    if (existing) {
      if (score > existing.score) existing.score = score;
    } else {
      data.push({ nickname, score });
    }

    data.sort((a, b) => b.score - a.score);
    data = data.slice(0, 10);

    const clearReq = store.clear(); // Limpa o store
    clearReq.onsuccess = () => {
      let putCount = 0;
      if (data.length === 0) { // Se não há dados para adicionar, chama o callback imediatamente
          if (callback) callback();
          return;
      }

      data.forEach(entry => {
        const putReq = store.put(entry);
        putReq.onsuccess = () => {
          putCount++;
          if (putCount === data.length) { // Se todos os 'puts' foram concluídos
            if (callback) callback(); // Chama o callback
          }
        };
        putReq.onerror = () => {
          console.error("Erro ao adicionar item ao ranking.");
          putCount++; // Mesmo com erro, incrementa para tentar finalizar
          if (putCount === data.length) {
            if (callback) callback();
          }
        };
      });
    };
    clearReq.onerror = () => {
      console.error("Erro ao limpar o store de ranking.");
      if (callback) callback(); // Chamar callback mesmo em caso de erro para não travar
    };
  };
  getAllReq.onerror = () => {
    console.error("Erro ao obter ranking para salvar.");
    if (callback) callback(); // Chamar callback mesmo em caso de erro para não travar
  };
}

export function getRanking(callback) {
  const tx = db.transaction('ranking', 'readonly');
  const store = tx.objectStore('ranking');
  const request = store.getAll();

  request.onsuccess = () => {
    const result = request.result.sort((a, b) => b.score - a.score);
    callback(result);
  };
}