export function runComponentTests() {

    // Teste 1: campo nickname 
    testar("COMPONENT - input nickname existe", () => {
        const input = document.getElementById("nicknameInput");
        if (!input) throw new Error("Input nickname não encontrado");
    });

    // Teste 2: seção de jogo 
    testar("COMPONENT - gameSection existe", () => {
        const section = document.getElementById("gameSection");
        if (!section) throw new Error("gameSection não encontrado");
    });

    // Teste 3: campo de tradução
    testar("COMPONENT - input da tradução da palavra existe", () => {
        const input = document.getElementById("translationInput");
        if (!input) throw new Error("input da tradução da palavra não encontrado");
    });

    // Teste 4: área de exibição da palavra correta em inglês
    testar("COMPONENT - englishWord existe", () => {
        const el = document.getElementById("englishWord");
        if (!el) throw new Error("englishWord não encontrado");
    });

    // Teste 5: botão de mute/unmute 
    testar("COMPONENT - botão de mute/unmute existe", () => {
        const botaomute = document.getElementById("Mute")
        if (!botaomute) throw new Error("botão de mute não encontrado")
    })

    // Teste 6: rank dos jogadores
    testar("COMPONENT - ranking existe", () => {
        const ranking = document.getElementById("rankingSection")
        if(!ranking) throw new Error("rank dos jogadores não encontrado")
    })
}

window.runComponentTests = runComponentTests
