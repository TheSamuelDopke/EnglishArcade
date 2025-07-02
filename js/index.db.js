let db;

export function initDB(callback) {
   const request = indexedDB.open("EnglishGameDB", 1);

   request.onupgradeneeded = (e) => {
      db = e.target.result;
      if (!db.objectStoreNames.contains("users")) {
         db.createObjectStore("users", { keyPath: "nickname" });
      }
      if (!db.objectStoreNames.contains("ranking")) {
         db.createObjectStore("ranking", { keyPath: "nickname" });
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

export function saveNickname(nickname, currentScore, callback) {
   if (!db) {
      console.error("Banco de dados não inicializado.");
      if (callback) callback();
      return;
   }

   const tx = db.transaction("users", "readwrite");
   const store = tx.objectStore("users");

   const getReq = store.get(nickname);
   getReq.onsuccess = () => {
      const existing = getReq.result;
      let userHighScore = currentScore;

      if (existing) {
         userHighScore = Math.max(existing.highScore || 0, currentScore);
      }

      const putReq = store.put({ nickname, highScore: userHighScore });

      putReq.onsuccess = () => {
         console.log("Usuário salvo/atualizado:", nickname, "Maior Pontuação:", userHighScore);
         if (callback) callback();
      };
      putReq.onerror = () => {
         console.error("Erro ao salvar usuário:", nickname);
         if (callback) callback();
      };
   };
   getReq.onerror = () => {
      console.error("Erro ao buscar usuário para salvar nickname:", nickname);
      if (callback) callback();
   };
}

export function getSavedNickname(callback) {
    if (!db) {
        console.error("Banco de dados não inicializado.");
        callback(null);
        return;
    }

    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");

    const request = store.getAll();
    request.onsuccess = () => {
        const result = request.result;
        if (result.length > 0) {
            callback(result[0].nickname);
        } else {
            callback(null);
        }
    };
    request.onerror = () => {
        console.error("Erro ao obter nickname salvo.");
        callback(null);
    };
}


export function saveToRanking(nickname, score, callback) {
   if (!db) {
      console.error("Banco de dados não inicializado.");
      if (callback) callback();
      return;
   }

   const txRanking = db.transaction("ranking", "readwrite");
   const storeRanking = txRanking.objectStore("ranking");

   const getAllReq = storeRanking.getAll();
   getAllReq.onsuccess = () => {
      let data = getAllReq.result;
      const existingInRanking = data.find((entry) => entry.nickname === nickname);

      if (existingInRanking) {
         if (score > existingInRanking.score) {
            existingInRanking.score = score;
         }
      } else {
         data.push({ nickname, score });
      }

      data.sort((a, b) => b.score - a.score);
      data = data.slice(0, 10);

      const clearReq = storeRanking.clear();
      clearReq.onsuccess = () => {
         let putCount = 0;
         if (data.length === 0) {
            saveNickname(nickname, score, callback);
            return;
         }

         data.forEach((entry) => {
            const putReq = storeRanking.put(entry);
            putReq.onsuccess = () => {
               putCount++;
               if (putCount === data.length) {
                  saveNickname(nickname, score, callback);
               }
            };
            putReq.onerror = () => {
               console.error("Erro ao adicionar item ao ranking.");
               putCount++;
               if (putCount === data.length) {
                  saveNickname(nickname, score, callback);
               }
            };
         });
      };
      clearReq.onerror = () => {
         console.error("Erro ao limpar o store de ranking.");
         saveNickname(nickname, score, callback);
      };
   };

   getAllReq.onerror = () => {
      console.error("Erro ao obter ranking para salvar.");
      saveNickname(nickname, score, callback);
   };
}

export function getRanking(callback) {
   if (!db) {
      console.error("Banco de dados não inicializado.");
      return;
   }

   const tx = db.transaction("ranking", "readonly");
   const store = tx.objectStore("ranking");
   const request = store.getAll();

   request.onsuccess = () => {
      const result = request.result.sort((a, b) => b.score - a.score);
      callback(result);
   };

   request.onerror = () => {
      console.error("Erro ao obter ranking.");
   };
}