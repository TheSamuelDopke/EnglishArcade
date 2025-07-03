function runComponentTests() {
  testar("Componente - startGame com nickname vazio", () => {
    document.getElementById("nicknameInput").value = "   ";
    let alertCalled = false;
    const originalAlert = window.alert;
    window.alert = () => { alertCalled = true; };
    startGame();
    window.alert = originalAlert;
    if (!alertCalled) throw new Error("Alerta não foi chamado para nickname vazio");
  });

  // Teste 2: campo nickname existe
  testar("COMPONENT - input nickname existe", () => {
    const input = document.getElementById("nicknameInput");
    if (!input) throw new Error("Input nickname não encontrado");
  });

  // Teste 3: seção de jogo existe
  testar("COMPONENT - gameSection existe", () => {
    const section = document.getElementById("gameSection");
    if (!section) throw new Error("gameSection não encontrado");
  });

  // Teste 4: campo de tradução existe
  testar("COMPONENT - translationInput existe", () => {
    const input = document.getElementById("translationInput");
    if (!input) throw new Error("translationInput não encontrado");
  });

  // Teste 5: área de exibição da palavra existe
  testar("COMPONENT - englishWord existe", () => {
    const el = document.getElementById("englishWord");
    if (!el) throw new Error("englishWord não encontrado");
  });

  testar("COMPONENT - botão de mute/unmute", () => {
    const botaomute = document.getElementById("Mute")
    if (!botaomute) throw new Error("botão de mute não encontrado")
  })
}