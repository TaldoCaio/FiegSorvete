
const tagDias = document.querySelector(".days"),
    dataAtual = document.querySelector(".current-date"),
    anteriorIcone = document.querySelectorAll(".icons span");

let data = new Date(),
    anoAtual = data.getFullYear(),
    mesAtual = data.getMonth();


const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

const renderizarCalendario = () => {
    let primeiroDiaMes = new Date(anoAtual, mesAtual, 1).getDay()
    ultimaDataMes = new Date(anoAtual, mesAtual + 1, 0)
    ultimoDiaMes = new Date(anoAtual, mesAtual, ultimaDataMes).getDay()
    ultimaDataMes = new Date(anoAtual, mesAtual + 1, 0).getDate()
    let tagLi = "";

    for (let i = primeiroDiaMes; i > 0; i--) {
        tagLi += `<li class="inactive">${ultimaDataMes - i + 1}</li>`;
    }

    for (let i = 1; i <= ultimaDataMes; i++) {
        let diaAtual = i === data.getDate() && mesAtual === new Date().getMonth()
            && anoAtual === new Date().getFullYear() ? "diaHoje" : "";
        tagLi += `<li class="${diaAtual}">${i}</li>`;
    }

    for (let i = ultimoDiaMes; i < 6; i++) {
        tagLi += `<li class="inactive">${i - ultimoDiaMes + 1}</li>`
    }
    dataAtual.innerText = `${meses[mesAtual]} ${anoAtual}`;
    tagDias.innerHTML = tagLi;

    async function getDatas() {
        try {
            const datas = await fetch('http://localhost:3100/busca/datas');
            const info = await fetch('http://localhost:3100/busca/mes/' + (mesAtual + 1));
            const aniversarios = await datas.json();
            const muralInfo = await info.json();

            marcadores(aniversarios);
            muralAniversariantes(muralInfo);


        } catch (error) {
            console.error(error);
        }
    }

    getDatas()

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

    function muralAniversariantes(muralInfo) {
        let lembretesMural = document.querySelector('.lembretes');
        let tagLi = "";
      
        for (let usuario of muralInfo) {
          const data = usuario.aniversario.substring(0, 10);
          const nomes = usuario.nome;
          const mes = usuario.mesAniversario;
          const mesFormatado = usuario.aniversario.substring(0,10)
          const [year,month,day] = mesFormatado.split('-')
      
          if (mes === (mesAtual + 1)) {
            tagLi += `<li class="aniversariantes">${nomes + ": " + Number(day) + "/" + Number(month) + "/" + Number(year)}</li>`;
          }
        }
      
        lembretesMural.innerHTML = tagLi;
      }
      
}



renderizarCalendario();

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

