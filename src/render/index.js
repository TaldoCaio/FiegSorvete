const tagDias = document.querySelector(".days"),//dias
    dataAtual = document.querySelector(".current-date"),//data atual
    anteriorIcone = document.querySelectorAll(".icons span");// icone de maior e menor para navegar no calendário
//puxar todas as classes para inserir as informações

//essa desgraça desse mesAtual é a razão de tudo estar dentro do index
let data = new Date(),
    anoAtual = data.getFullYear(),
    mesAtual = data.getMonth();
//pegar ano e mês atual

//armazenar os nomes dos meses para mostrar na tela
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

const renderizarCalendario = () => {
    //sinceramente não tenho nem ideia do q eu fiz nesssas datas
    let primeiroDiaMes = new Date(anoAtual, mesAtual, 1).getDay()
    ultimaDataMes = new Date(anoAtual, mesAtual + 1, 0)
    ultimoDiaMes = new Date(anoAtual, mesAtual, ultimaDataMes).getDay()
    ultimaDataMes = new Date(anoAtual, mesAtual + 1, 0).getDate()
    let tagLi = "";

    //puxa os últimos dias do último mês para formatar o mês atual
    for (let i = primeiroDiaMes; i > 0; i--) {
        tagLi += `<li class="inactive">${ultimaDataMes - i + 1}</li>`;
    }
    //puxa o dia atual para destacar
    for (let i = 1; i <= ultimaDataMes; i++) {
        let diaAtual = i === data.getDate() && mesAtual === new Date().getMonth()
            && anoAtual === new Date().getFullYear() ? "diaHoje" : "";
        tagLi += `<li class="${diaAtual}">${i}</li>`;
    }
    //não tenho a menor ideia
    for (let i = ultimoDiaMes; i < 6; i++) {
        tagLi += `<li class="inactive">${i - ultimoDiaMes + 1}</li>`
    }
    //gera as <li> para inserir os dias e coloca o mês e ano atual em cima do calendário
    dataAtual.innerText = `${meses[mesAtual]} ${anoAtual}`;
    tagDias.innerHTML = tagLi;

    //só serve pra rodar junto com a render do calendário
    async function getDatas() {
        try {
            const mesFormatado = (mesAtual + 1).toString().padStart(2, '0');
            const datas = await fetch('http://localhost:3000/usuario/buscarTodos');
            const info = await fetch('http://localhost:3000/usuario/buscaMes/' + mesFormatado);

            const aniversarios = await datas.json();
            const muralInfo = await info.json();

            marcadores(aniversarios);
            muralAniversariantes(muralInfo);
            renderizarMenu();

        } catch (error) {
            console.error(error);
        }
    }

    getDatas()
    //marca os aniversários no calendário 
    function marcadores(aniversarios) {
        const diasCalendario = document.querySelectorAll('.days li');

        for (let aniversario of aniversarios) {
            const data = aniversario.aniversario.substring(0, 10);
            const [year, month, day] = data.split('-');
            const monthNumber = parseInt(month, 10);
            const dayNumber = parseInt(day, 10);

            if (monthNumber === mesAtual + 1) {
                for (let diaCalendario of diasCalendario) {
                    if (parseInt(diaCalendario.innerText) === dayNumber && !diaCalendario.classList.contains('inactive')) {
                        diaCalendario.classList.add('marked');
                    }
                }
            }
        }
    }


    //mostra no mural quando que deve ser pago o sorvete e o status(P = pago; Q = quitado)
    async function muralAniversariantes(muralInfo) {

        let lembretesMural = document.querySelector('.lembretes');
        let tagLi = "";

        for (let usuario of muralInfo) {

            const id = usuario.user_id;
            const nomes = usuario.nome;
            const mesFormatado = usuario.aniversario.substring(0, 10);
            const [year, month, day] = mesFormatado.split('-');

            const buscaStatus = await fetch('http://localhost:3000/cobranca/buscar/usuario/' + id);
            const status = await buscaStatus.json();
            let aniversarianteAdicionado = false;

            for (let stat of status) {
                const statusAtual = stat.statusCobranca;

                if (Number(month) === (mesAtual + 1)) {
                    if (!aniversarianteAdicionado) {
                        if (statusAtual === "A") {
                            tagLi += `<li class="aniversariantes" id="pendente" ">${nomes + ": " + Number(day) + "/" + Number(month) + " = " + "Aberto"}</li>`;
                        } else {
                            tagLi += `<li class="aniversariantes" id="quitado" ">${nomes + ": " + Number(day) + "/" + Number(month) + " = " + "Pago"}</li>`;
                        }
                        aniversarianteAdicionado = true;
                    }
                }
            }
        }
        lembretesMural.innerHTML = tagLi;
    }
}

//a desgraça da geração de cobrança
async function gerarCobranca() {
    const mesFormatado = (mesAtual + 1).toString().padStart(2, '0'); // Formata o mês com zero à esquerda
    const info = await fetch('http://localhost:3000/usuario/buscaMes/' + mesFormatado)
    const infoUsers = await info.json();

    for (let usuario of infoUsers) {
        const nomes = usuario.user_id
        const data = usuario.aniversario;
        const [year, month, day] = data.split('-')

        console.log(Number(month) === (mesAtual + 1))

        if (Number(month) === (mesAtual + 1)) {
            await fetch('http://localhost:3000/cobranca/gerar', {
                method: "POST",
                body: JSON.stringify({
                    idCobrado: nomes,
                    datasorvete: data
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json()).then(json => console.log(json));

        }
    }
}
//nem sei se essa porra funciona ainda, mas por enquanto funciona
async function renderizarMenu() {
    let lembretesMural = document.querySelector('.menuContent');
    let menuBtn = document.getElementById('menuBtn')
    let menu = document.querySelector('.menu')

    menuBtn.onclick = function () {
        menu.showModal()
    }

    async function getAniversariantes() {
        const mesFormatado = (mesAtual + 1).toString().padStart(2, '0'); // Formata o mês com zero à esquerda
        const info = await fetch('http://localhost:3000/usuario/buscaMes/' + mesFormatado)
        const infoResponse = await info.json()
        let tagLi = ""; // Inicializa tagLi antes do loop

        for (let cadaInfo of infoResponse) {
            const status = await fetch('http://localhost:3000/cobranca/buscar');
            const statusResponse = await status.json()

            const aniversario = cadaInfo.aniversario.substring(0, 10)
            const idUser = cadaInfo.user_id
            const aniFormatado = [year, month, day] = aniversario.split('-')

            for (let cadaStatus of statusResponse) {
                const idcobranca = cadaStatus.idCobrado

                if (idUser === idcobranca) {
                    if (cadaStatus.cobStatus === 'P') {
                        tagLi += `<li class="menuAniversariantes">${cadaInfo.nome}: ${Number(day)}/${Number(month)} - Pago</li> `;
                    } else {
                        tagLi += `<li class="menuAniversariantes">${cadaInfo.nome}: ${Number(day)}/${Number(month)} - Aberto</li> `;
                    }
                }
            }
        }

        if (tagLi === "") {
            tagLi += `<h3 class="semAniversario">Não existem aniversariantes esse mês</h3>`;
        }

        lembretesMural.innerHTML = tagLi; // Move a atribuição para dentro do bloco if
    }

    getAniversariantes();
}


renderizarCalendario();
//faz os icones de avançar e voltar funcionarem
anteriorIcone.forEach(icon => {
    icon.addEventListener("click", () => {
        mesAtual = icon.id === "prev" ? mesAtual - 1 : mesAtual + 1;

        if (mesAtual < 0 || mesAtual > 11) {

            data = new Date(anoAtual, mesAtual, new Date().getDate());
            anoAtual = data.getFullYear();
            mesAtual = data.getMonth();
        } else {
            data = new Date();
        }
        renderizarCalendario();
    });
});

