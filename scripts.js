const root = document.getElementById("root");
const cores = ["um", "dois", "tres"];
const linhas = [];
const baseSize = 10;

function alternarCor(botao) {
    const corAtual = botao.classList[0];
    const proximaCor = corAtual ? cores[(cores.indexOf(corAtual) + 1) % cores.length] : "um";
    botao.className = proximaCor;
}

function atualizarPiramide() {
    for (let i = 1; i < linhas.length; i++) {
        const linhaAtual = linhas[i].children;
        const linhaAbaixo = linhas[i - 1].children;

        for (let j = 0; j < linhaAtual.length; j++) {
            const corEsquerda = linhaAbaixo[j].className;
            const corDireita = linhaAbaixo[j + 1].className;

            if (!corEsquerda || !corDireita) continue;

            if (corEsquerda === corDireita) linhaAtual[j].className = corEsquerda;
            else linhaAtual[j].className = cores.find(c => c !== corEsquerda && c !== corDireita);
        }
    }
}

for (let linhaIndex = 0; linhaIndex < baseSize; linhaIndex++) {
    const numBotoes = baseSize - linhaIndex;
    const linhaContainer = document.createElement('div');
    linhaContainer.className = 'linha';
    root.appendChild(linhaContainer);
    linhas.push(linhaContainer);

    for (let i = 0; i < numBotoes; i++) {
        const botao = document.createElement('button');
        if (linhaIndex === 0) {
            botao.addEventListener('click', () => {
                alternarCor(botao);
                atualizarPiramide();
            });
        }
        linhaContainer.appendChild(botao);
    }
}

atualizarPiramide();
