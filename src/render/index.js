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
            const datas = await fetch('http://localhost:3000/usuario/busca');
            const info = await fetch('http://localhost:3000/usuario/buscaMes/' + (mesAtual + 1));

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

        let diasCalendario = document.querySelectorAll('.days li');

        for (let aniversario of aniversarios) {
            const data = aniversario.aniversario.substring(0, 10);
            const [year, month, day] = data.split('-');

            if (Number(month) === mesAtual + 1) {
                for (let diaCalendario of diasCalendario) {
                    if (diaCalendario.innerText === String(day) && diaCalendario.className != "inactive") {
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

            const id = usuario._id;
            const nomes = usuario.nome;
            const mes = usuario.mesAniversario;
            const mesFormatado = usuario.aniversario.substring(0, 10);
            const [year, month, day] = mesFormatado.split('-');

            const buscaStatus = await fetch('http://localhost:3000/cobranca/buscar/' + id);
            const status = await buscaStatus.json();
            let aniversarianteAdicionado = false;

            for (let stat of status) {
                const statusAtual = stat.cobStatus;

                if (mes === (mesAtual + 1)) {
                    if (!aniversarianteAdicionado) {
                        if (statusAtual === "P") {
                            tagLi += `<li class="aniversariantes" id="pendente" ">${nomes + ": " + Number(day) + "/" + Number(month) + " = " + "Pendente"}</li>`;
                        } else {
                            tagLi += `<li class="aniversariantes" id="quitado" ">${nomes + ": " + Number(day) + "/" + Number(month) + " = " + "Quitado"}</li>`;
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
    const info = await fetch('http://localhost:3000/usuario/buscaMes/' + (mesAtual + 1))
    const infoUsers = await info.json();

    for (let usuario of infoUsers) {

        const nomes = usuario._id;
        const mes = usuario.aniversario.substring(0, 10);
        const aniversarioString = [year, month, day] = mes.split('-')
        const aniversarioDate = new Date(aniversarioString)
        const monthDate = aniversarioDate.getMonth()
        const dayDate = aniversarioDate.getDay()

        if (Number(month) === (mesAtual + 1)) {
            await fetch('http://localhost:3000/cobranca/gerar', {
                method: "POST",
                body: JSON.stringify({
                    cobStatus: "P",
                    idCobrado: nomes,
                    dataSorvete: aniversarioDate//odeio esse esquema de data do mongo, simplesmente impossível essa desgraça

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
        const info = await fetch('http://localhost:3000/usuario/buscaMes/' + (mesAtual + 1))
        const infoResponse = await info.json()
        let tagLi = ""; // Inicializa tagLi antes do loop

        for (let cadaInfo of infoResponse) {
            const status = await fetch('http://localhost:3000/cobranca/buscar');
            const statusResponse = await status.json()

            const aniversario = cadaInfo.aniversario.substring(0, 10)
            const idUser = cadaInfo._id
            const mesAni = cadaInfo.mesAniversario
            const aniFormatado = [year, month, day] = aniversario.split('-')

            for (let cadaStatus of statusResponse) {
                const id = cadaStatus.idCobrado

                if (idUser === id) {
                    if (cadaStatus.cobStatus === 'P') {
                        tagLi += `<li class="menuAniversariantes">${cadaInfo.nome}: ${Number(day)}/${mesAni} - Pendente</li> `;
                    } else {
                        tagLi += `<li class="menuAniversariantes">${cadaInfo.nome}: ${Number(day)}/${mesAni} - Quitado</li> `;
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

