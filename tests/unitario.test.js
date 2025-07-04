export function runUnitTests() {
  const translationInput = document.getElementById("translationInput");
  const errorMessageElement = document.getElementById("errorMessage");
  
  if (!translationInput || !errorMessageElement) {
    throw new Error("Elementos translationInput e errorMessage precisam existir no DOM para testes");
  }

  // Teste 1: Resposta correta incrementa score
  testar("UNIT - checkTranslation com resposta correta incrementa a pontuação", () => {
    translationInput.value = "gato";
    errorMessageElement.innerHTML = "";

    window.setScore(0);
    window.setCurrentWord({ en: "cat", pt: "gato" });
    window.setUsedWords([]);

    window.checkTranslation();

    if (window.getScore() !== 1) throw new Error(`Esperado score 1, recebeu ${window.getScore()}`);
    if (errorMessageElement.innerHTML !== "") throw new Error("Erro: mensagem de erro deveria estar limpa");
  });

  // Teste 2: Resposta incorreta mostra erro
  testar("UNIT - checkTranslation com resposta errada mostra mensagem de erro", () => {
    translationInput.value = "cachorro";
    errorMessageElement.innerHTML = "";

    window.setScore(0);
    window.setCurrentWord({ en: "cat", pt: "gato" });
    window.setUsedWords([]);

    window.checkTranslation();

    if (window.getScore() !== 0) throw new Error(`Score não deve incrementar, esperado 0 e recebeu ${window.getScore()}`);
    if (!errorMessageElement.innerHTML.includes("cachorro")) throw new Error("Mensagem de erro não exibiu palavra errada");
  });

  // Teste 3: nextWord não escolhe palavra usada
  testar("UNIT - nextWord não escolhe palavra usada", () => {
    window.setUsedWords(["cat"]);
    window.nextWord();
    const cw = window.getCurrentWord();
    if (cw.en === "cat") throw new Error("nextWord escolheu palavra já usada");
  });

  // Teste 4: resetGame limpa estado e visibilidade
  testar("UNIT - resetGame reseta estado e visibilidade", () => {
    document.getElementById("gameSection").classList.remove("hidden");
    document.getElementById("nicknameSection").classList.add("hidden");

    window.setScore(10);
    window.setUsedWords(["cat"]);

    window.resetGame();

    if (window.getScore() !== 0) throw new Error("Score não resetado");
    if (window.getUsedWords().length !== 0) throw new Error("usedWords não resetado");
    if (!document.getElementById("gameSection").classList.contains("hidden"))
      throw new Error("gameSection deveria estar oculto");
    if (document.getElementById("nicknameSection").classList.contains("hidden"))
      throw new Error("nicknameSection deveria estar visível");
  });
}

window.runUnitTests = runUnitTests;
