const REDUZIR_MOVIMENTO = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const GRAFICOS_DISPONIVEIS = typeof Chart !== "undefined";
const PLUGIN_DATALABELS = GRAFICOS_DISPONIVEIS && typeof ChartDataLabels !== "undefined";

if (PLUGIN_DATALABELS) {
  Chart.register(ChartDataLabels);
}

let graficoEnergetica = null;
let graficoEletrica = null;
let graficoComparativo = null;

const CORES_FONTE_ESCURA = ["#f7c948", "#26c6da", "#aed581", "#c5e1a5", "#8fd6a9"];

function rotuloPercentual(valor) {
  return valor.toFixed(1).replace(".", ",").replace(",0", "") + "%";
}

function opcoesRosca() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "56%",
    layout: { padding: 4 },
    animation: REDUZIR_MOVIMENTO ? false : { animateRotate: true, duration: 900 },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0b3d2e",
        titleFont: { family: "'Poppins', sans-serif", weight: "600" },
        bodyFont: { family: "'Inter', sans-serif" },
        padding: 12,
        cornerRadius: 10,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: contexto => ` ${contexto.label}: ${contexto.parsed.toFixed(1).replace(".", ",")}%`
        }
      },
      datalabels: {
        formatter: valor => rotuloPercentual(valor),
        display: contexto => contexto.dataset.data[contexto.dataIndex] >= 4,
        color: contexto => {
          const cor = contexto.dataset.backgroundColor[contexto.dataIndex];
          return CORES_FONTE_ESCURA.includes(cor) ? "#123a24" : "#ffffff";
        },
        font: { family: "'Poppins', sans-serif", weight: "700", size: 12 },
        textAlign: "center",
        textShadowBlur: 3,
        textShadowColor: "rgba(0,0,0,0.2)"
      }
    }
  };
}

function dadosRosca(conjunto) {
  return {
    labels: conjunto.itens.map(item => item.rotulo),
    datasets: [
      {
        data: conjunto.itens.map(item => item.valor),
        backgroundColor: conjunto.itens.map(item => item.cor),
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 12,
        borderRadius: 3
      }
    ]
  };
}

function renderizarLegenda(idUl, conjunto) {
  const ul = document.getElementById(idUl);
  if (!ul) {
    return;
  }
  ul.innerHTML = "";
  conjunto.itens.forEach(item => {
    const li = document.createElement("li");
    li.className = "legenda-item";
    li.innerHTML =
      `<span class="legenda-dot" style="background:${item.cor}"></span>` +
      `<span class="legenda-nome">${item.rotulo}</span>` +
      `<span class="legenda-valor">${rotuloPercentual(item.valor)}</span>`;
    ul.appendChild(li);
  });
}

function ligarHoverLegenda(idUl, grafico) {
  const ul = document.getElementById(idUl);
  if (!ul || !grafico) {
    return;
  }
  Array.from(ul.children).forEach((li, indice) => {
    li.addEventListener("mouseenter", () => {
      grafico.setActiveElements([{ datasetIndex: 0, index: indice }]);
      grafico.update();
      li.classList.add("destacado");
    });
    li.addEventListener("mouseleave", () => {
      grafico.setActiveElements([]);
      grafico.update();
      li.classList.remove("destacado");
    });
  });
}

function inserirAvisoSemChart(container) {
  const aviso = document.createElement("p");
  aviso.className = "nota-dados";
  aviso.textContent = "⚠ Não foi possível carregar os gráficos: verifique sua conexão de internet (biblioteca Chart.js via CDN).";
  container.appendChild(aviso);
}

function initGraficos() {
  if (!GRAFICOS_DISPONIVEIS) {
    $$(".area-canvas").forEach(inserirAvisoSemChart);
    return;
  }

  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = "#3f554a";

  const canvasEnergetica = $("#graficoEnergetica");
  const canvasEletrica = $("#graficoEletrica");
  const canvasComparativo = $("#graficoComparativo");

  if (canvasEnergetica) {
    graficoEnergetica = new Chart(canvasEnergetica, { type: "doughnut", data: { labels: [], datasets: [] }, options: opcoesRosca() });
  }
  if (canvasEletrica) {
    graficoEletrica = new Chart(canvasEletrica, { type: "doughnut", data: { labels: [], datasets: [] }, options: opcoesRosca() });
  }

  if (canvasComparativo) {
    graficoComparativo = new Chart(canvasComparativo, {
      type: "bar",
      data: {
        labels: ["Matriz Energética", "Matriz Elétrica"],
        datasets: [
          {
            label: "🇧🇷 Brasil",
            data: [
              DADOS_MATRIZES.energetica.brasil.renovavel,
              DADOS_MATRIZES.eletrica.brasil.renovavel
            ],
            backgroundColor: ["rgba(46,158,91,0.85)", "rgba(46,158,91,0.55)"],
            hoverBackgroundColor: "#146b3a",
            borderRadius: 10,
            borderSkipped: false,
            barThickness: 44
          },
          {
            label: "🌍 Mundo",
            data: [
              DADOS_MATRIZES.energetica.mundo.renovavel,
              DADOS_MATRIZES.eletrica.mundo.renovavel
            ],
            backgroundColor: ["rgba(100,116,139,0.75)", "rgba(100,116,139,0.45)"],
            hoverBackgroundColor: "#334155",
            borderRadius: 10,
            borderSkipped: false,
            barThickness: 44
          }
        ]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        animation: REDUZIR_MOVIMENTO ? false : { duration: 900 },
        layout: { padding: { right: 52 } },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: { color: "rgba(20,107,58,0.08)" },
            ticks: { callback: valor => `${valor}%` }
          },
          y: {
            grid: { display: false },
            ticks: { font: { weight: "600", size: 13 } }
          }
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 9, padding: 18 }
          },
          datalabels: {
            anchor: "end",
            align: "end",
            clamp: true,
            offset: 2,
            color: "#10513c",
            font: { family: "'Poppins', sans-serif", weight: "700", size: 12 },
            formatter: valor => rotuloPercentual(valor)
          },
          tooltip: {
            backgroundColor: "#0b3d2e",
            padding: 12,
            cornerRadius: 10,
            callbacks: {
              label: contexto => ` ${contexto.dataset.label}: ${contexto.parsed.x.toFixed(1).replace(".", ",")}% renovável`
            }
          }
        }
      }
    });
  }
}

function atualizarGraficos(escopo) {
  if (!GRAFICOS_DISPONIVEIS || !graficoEnergetica || !graficoEletrica) {
    return;
  }

  const dadosEnergetica = dadosRosca(DADOS_MATRIZES.energetica[escopo]);
  const dadosEletrica = dadosRosca(DADOS_MATRIZES.eletrica[escopo]);

  graficoEnergetica.data.labels = dadosEnergetica.labels;
  graficoEnergetica.data.datasets = dadosEnergetica.datasets;
  graficoEnergetica.update();

  graficoEletrica.data.labels = dadosEletrica.labels;
  graficoEletrica.data.datasets = dadosEletrica.datasets;
  graficoEletrica.update();

  renderizarLegenda("legendaEnergetica", DADOS_MATRIZES.energetica[escopo]);
  renderizarLegenda("legendaEletrica", DADOS_MATRIZES.eletrica[escopo]);
  ligarHoverLegenda("legendaEnergetica", graficoEnergetica);
  ligarHoverLegenda("legendaEletrica", graficoEletrica);
}

document.addEventListener("DOMContentLoaded", () => {
  initGraficos();
});
