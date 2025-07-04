function testar(nomeDoTeste, funcaoDeTeste) {
    const resultadosDiv = document.getElementById("testes-resultados");
    try {
        funcaoDeTeste();
        resultadosDiv.innerHTML += `<p style="color: white;">✅ ${nomeDoTeste}</p>`;
    } catch (erro) {
        resultadosDiv.innerHTML += `<p style="color: red;">❌ ${nomeDoTeste} - ${erro.message}</p>`;
    }
}

// Torna a função visível para os testes
window.testar = testar;

document.addEventListener("DOMContentLoaded", () => {
    const resultadosDiv = document.getElementById("testes-resultados");

    const botaoUnit = document.getElementById("rodarTestesUnitBtn");
    const botaoComponent = document.getElementById("rodarTestesComponentBtn");

    if (botaoUnit) {
        botaoUnit.addEventListener("click", () => {
            resultadosDiv.textContent = "";
            if (typeof runUnitTests === "function") {
                runUnitTests();
            } else {
                resultadosDiv.textContent = "❌ Função runUnitTests() não encontrada!";
            }
        });
    }

    if (botaoComponent) {
        botaoComponent.addEventListener("click", () => {
            resultadosDiv.textContent = "";
            if (typeof runComponentTests === "function") {
                runComponentTests();
            } else {
                resultadosDiv.textContent = "❌ Função runComponentTests() não encontrada!";
            }
        });
    }
});