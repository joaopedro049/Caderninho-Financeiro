const btnEntrada = document.getElementById("btn-entrada");
const modalEntrada = document.getElementById("modal-entrada");
const fecharEntrada = document.getElementById("fechar-entrada");

const formEntrada = document.getElementById("form-entrada");
const tipoEntrada = document.getElementById("tipo-entrada");
const descricaoEntrada = document.getElementById("descricao-entrada");
const valorEntrada = document.getElementById("valor-entrada");

const saldoElemento = document.getElementById("saldo");
const mesAtualElemento = document.getElementById("mes-atual");
const btnMesAnterior = document.getElementById("mes-anterior");
const btnProximoMes = document.getElementById("proximo-mes");
const totalEntradasElemento = document.getElementById("total-entradas");
const totalSaidasElemento = document.getElementById("total-saidas");
const listaMovimentacoes = document.getElementById("lista-movimentacoes");
const btnSaida = document.getElementById("btn-saida");
const modalSaida = document.getElementById("modal-saida");
const fecharSaida = document.getElementById("fechar-saida");

const formSaida = document.getElementById("form-saida");
const tipoSaida = document.getElementById("tipo-saida");
const descricaoSaida = document.getElementById("descricao-saida");
const valorSaida = document.getElementById("valor-saida");

const btnVenda = document.getElementById("btn-venda");

const modalVenda = document.getElementById("modal-venda");

const fecharVenda = document.getElementById("fechar-venda");

const formVenda = document.getElementById("form-venda");

const produtoVenda = document.getElementById("produto-venda");

const quantidadeVenda = document.getElementById("quantidade-venda");

const valorVenda = document.getElementById("valor-venda");
// ===============================
// DADOS
// ===============================

let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];


// ===============================
// ABRIR E FECHAR MODAL
// ===============================

btnEntrada.addEventListener("click", () => {
    modalEntrada.classList.add("ativo");
});

fecharEntrada.addEventListener("click", () => {
    modalEntrada.classList.remove("ativo");
});

modalEntrada.addEventListener("click", (evento) => {
    if (evento.target === modalEntrada) {
        modalEntrada.classList.remove("ativo");
    }
});
// ===============================
// ABRIR E FECHAR MODAL DE SAÍDA
// ===============================

btnSaida.addEventListener("click", () => {
    modalSaida.classList.add("ativo");
});

fecharVenda.addEventListener("click", () => {
    modalVenda.classList.remove("ativo");
});

modalVenda.addEventListener("click", (evento) => {
    if (evento.target === modalVenda) {
        modalVenda.classList.remove("ativo");
    }
});

// ===============================
// ABRIR MODAL DE VENDA
// ===============================

btnVenda.addEventListener("click", () => {
    modalVenda.classList.add("ativo");
});

fecharSaida.addEventListener("click", () => {
    modalSaida.classList.remove("ativo");
});

modalSaida.addEventListener("click", (evento) => {
    if (evento.target === modalSaida) {
        modalSaida.classList.remove("ativo");
    }
});

// ===============================
// FORMATAR DINHEIRO
// ===============================

function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}
function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ===============================
// FORMATAR DATA
// ===============================

function formatarData(data) {

    const dataMovimentacao = new Date(data);

    return dataMovimentacao.toLocaleDateString("pt-BR");
}
// ===============================
// VERIFICAR MÊS ATUAL
// ===============================

function ehDoMesAtual(data) {

    const dataMovimentacao = new Date(data);

    return (
        dataMovimentacao.getMonth() === mesSelecionado.getMonth() &&
        dataMovimentacao.getFullYear() === mesSelecionado.getFullYear()
    );
}


// ===============================
// SALVAR NO NAVEGADOR
// ===============================

function salvarDados() {
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));
}

// ===============================
// CALCULAR RESUMO DO MÊS ATUAL
// ===============================

function atualizarResumo() {

    let totalEntradas = 0;
    let totalSaidas = 0;

    movimentacoes.forEach((movimentacao) => {

        // Só considera movimentações do mês atual
        if (!ehDoMesAtual(movimentacao.data)) {
            return;
        }

        if (movimentacao.tipo === "entrada") {
            totalEntradas += movimentacao.valor;
        }

        if (movimentacao.tipo === "saida") {
            totalSaidas += movimentacao.valor;
        }

    });

    const saldo = totalEntradas - totalSaidas;

    totalEntradasElemento.textContent = formatarDinheiro(totalEntradas);

    totalSaidasElemento.textContent = formatarDinheiro(totalSaidas);

    saldoElemento.textContent = formatarDinheiro(saldo);


    // Deixar o saldo vermelho quando estiver negativo
if (saldo < 0) {
    saldoElemento.classList.add("saldo-negativo");
} else {
    saldoElemento.classList.remove("saldo-negativo");
}
}

// ===============================
// MOSTRAR HISTÓRICO
// ===============================

function mostrarMovimentacoes() {
const movimentacoesDoMes = movimentacoes.filter((movimentacao) => {
    return ehDoMesAtual(movimentacao.data);
});
   if (movimentacoesDoMes.length === 0) {
        listaMovimentacoes.innerHTML = `
            <p>Nenhuma movimentação registrada.</p>
        `;

        listaMovimentacoes.className = "lista-vazia";
        return;
    }

    listaMovimentacoes.className = "";

    listaMovimentacoes.innerHTML = movimentacoesDoMes
        .slice()
        .reverse()
        .map((movimentacao) => {

            return `
                <div class="movimentacao-item">

                    <div>
                        <strong>${movimentacao.categoria}</strong>

                        <span>
                            ${movimentacao.descricao || "Sem descrição"}
                        </span>
                        <small class="data-movimentacao">
    ${formatarData(movimentacao.data)}
</small>
                    </div>

<div class="movimentacao-acoes">

    <strong class="${movimentacao.tipo === "entrada" ? "valor-entrada" : "valor-saida"}">
        ${movimentacao.tipo === "entrada" ? "+" : "−"}
        ${formatarDinheiro(movimentacao.valor)}
    </strong>

    <button
        class="btn-excluir"
        data-id="${movimentacao.id}"
        type="button"
    >
        Excluir
    </button>

</div>
                </div>
            `;

        })
        .join("");
}
// ===============================
// EXCLUIR MOVIMENTAÇÃO
// ===============================

listaMovimentacoes.addEventListener("click", (evento) => {

    if (!evento.target.classList.contains("btn-excluir")) {
        return;
    }

    const id = Number(evento.target.dataset.id);
    const confirmar = confirm("Tem certeza que deseja excluir esta movimentação?");

if (!confirmar) {
    return;
}

    movimentacoes = movimentacoes.filter((movimentacao) => {
        return movimentacao.id !== id;
    });

    salvarDados();
    atualizarResumo();
    mostrarMovimentacoes();
});


// ===============================
// REGISTRAR ENTRADA
// ===============================

formEntrada.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const valor = Number(valorEntrada.value);

    if (!tipoEntrada.value || valor <= 0) {
        return;
    }

    const novaMovimentacao = {
        id: Date.now(),
        tipo: "entrada",
        categoria: tipoEntrada.value,
        descricao: descricaoEntrada.value.trim(),
        valor: valor,
        data: new Date().toISOString()
    };

    movimentacoes.push(novaMovimentacao);

    salvarDados();
    atualizarResumo();
    mostrarMovimentacoes();

    formEntrada.reset();

    modalEntrada.classList.remove("ativo");
});

// ===============================
// REGISTRAR SAÍDA
// ===============================

formSaida.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const valor = Number(valorSaida.value);

    if (!tipoSaida.value || valor <= 0) {
        return;
    }

    const novaMovimentacao = {
        id: Date.now(),
        tipo: "saida",
        categoria: tipoSaida.value,
        descricao: descricaoSaida.value.trim(),
        valor: valor,
        data: new Date().toISOString()
    };

    movimentacoes.push(novaMovimentacao);

    salvarDados();
    atualizarResumo();
    mostrarMovimentacoes();

    formSaida.reset();
    modalSaida.classList.remove("ativo");
});
// ===============================
// REGISTRAR VENDA
// ===============================

formVenda.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const produto = produtoVenda.value.trim();
    const quantidade = Number(quantidadeVenda.value);
    const valorUnitario = Number(valorVenda.value);

    const valorTotal = quantidade * valorUnitario;

    if (!produto || quantidade <= 0 || valorUnitario <= 0) {
        return;
    }

    const novaMovimentacao = {
        id: Date.now(),
        tipo: "entrada",
        categoria: "Venda",
        descricao: `${quantidade}x ${produto}`,
        valor: valorTotal,
        data: new Date().toISOString()
    };

    movimentacoes.push(novaMovimentacao);

    salvarDados();
    atualizarResumo();
    mostrarMovimentacoes();

    formVenda.reset();
    quantidadeVenda.value = 1;

    modalVenda.classList.remove("ativo");
});
// ===============================
// INICIAR APLICAÇÃO
// ===============================

let mesSelecionado = new Date();


// ===============================
// ATUALIZAR NOME DO MÊS
// ===============================

function atualizarNomeMes() {

    const nomeMes = mesSelecionado.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
    });

    mesAtualElemento.textContent =
        nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

}


// ===============================
// VOLTAR MÊS
// ===============================

btnMesAnterior.addEventListener("click", () => {

    mesSelecionado.setMonth(mesSelecionado.getMonth() - 1);

    atualizarNomeMes();
    atualizarResumo();
mostrarMovimentacoes();
});


// ===============================
// AVANÇAR MÊS
// ===============================

btnProximoMes.addEventListener("click", () => {

    mesSelecionado.setMonth(mesSelecionado.getMonth() + 1);

    atualizarNomeMes();
    atualizarResumo();
mostrarMovimentacoes();
});


// ===============================
// CARREGAR APLICAÇÃO
// ===============================

atualizarNomeMes();
atualizarResumo();
mostrarMovimentacoes();