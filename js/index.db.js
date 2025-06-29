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

export function saveNickname(nickname, highScore = 0) {
   if (!db) {
      console.error("Banco de dados não inicializado.");
      return;
   }

   const tx = db.transaction("users", "readwrite");
   const store = tx.objectStore("users");

   const getReq = store.get(nickname);
   getReq.onsuccess = () => {
      const existing = getReq.result;
      const maxScore =
         existing && existing.highScore > highScore
            ? existing.highScore
            : highScore;

      const putReq = store.put({ nickname, highScore: maxScore });

      putReq.onsuccess = () => {
         console.log("Usuário salvo:", nickname, "Pontuação:", maxScore);
      };
      putReq.onerror = () => {
         console.error("Erro ao salvar usuário:", nickname);
      };
   };
   getReq.onerror = () => {
      console.error("Erro ao buscar usuário:", nickname);
   };
}

export function getSavedNickname(callback) {
   if (!db) {
      console.error("Banco de dados não inicializado.");
      return;
   }

   const tx = db.transaction("users", "readonly");
   const store = tx.objectStore("users");
   const request = store.getAll();

   request.onsuccess = () => {
      const result = request.result;
      if (result.length > 0) callback(result[0].nickname);
   };

   request.onerror = () => {
      console.error("Erro ao buscar nickname salvo.");
   };
}

export function saveToRanking(nickname, score, callback) {
   if (!db) {
      console.error("Banco de dados não inicializado.");
      if (callback) callback();
      return;
   }

   const tx = db.transaction("ranking", "readwrite");
   const store = tx.objectStore("ranking");

   const getAllReq = store.getAll();
   getAllReq.onsuccess = () => {
      let data = getAllReq.result;
      const existing = data.find((entry) => entry.nickname === nickname);

      if (existing) {
         if (score > existing.score) existing.score = score;
      } else {
         data.push({ nickname, score });
      }

      data.sort((a, b) => b.score - a.score);
      data = data.slice(0, 10);

      const clearReq = store.clear();
      clearReq.onsuccess = () => {
         let putCount = 0;
         if (data.length === 0) {
            if (callback) callback();
            return;
         }

         data.forEach((entry) => {
            const putReq = store.put(entry);
            putReq.onsuccess = () => {
               putCount++;
               if (putCount === data.length && callback) callback();
            };
            putReq.onerror = () => {
               console.error("Erro ao adicionar item ao ranking.");
               putCount++;
               if (putCount === data.length && callback) callback();
            };
         });
      };
      clearReq.onerror = () => {
         console.error("Erro ao limpar o store de ranking.");
         if (callback) callback();
      };
   };

   getAllReq.onerror = () => {
      console.error("Erro ao obter ranking para salvar.");
      if (callback) callback();
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
