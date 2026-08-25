const $ = seletor => document.querySelector(seletor);
const $$ = seletor => Array.from(document.querySelectorAll(seletor));

function formatarPercentual(valor) {
  const texto = Number(valor).toFixed(1).replace(".", ",");
  return texto.endsWith(",0") ? texto.slice(0, -2) : texto;
}

function initNav() {
  const toggle = $(".nav-toggle");
  if (!toggle) {
    return;
  }
  toggle.addEventListener("click", () => {
    const aberto = document.body.classList.toggle("menu-aberto");
    toggle.setAttribute("aria-expanded", String(aberto));
  });
  $$(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-aberto");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  const elementos = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach(el => el.classList.add("visivel"));
    return;
  }
  const observador = new IntersectionObserver(
    entradas => {
      entradas.forEach((entrada, indice) => {
        if (entrada.isIntersecting) {
          entrada.target.style.transitionDelay = `${Math.min(indice * 90, 270)}ms`;
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );
  elementos.forEach(el => observador.observe(el));
}

function animarContador(elemento) {
  const alvo = parseFloat(elemento.dataset.valor);
  const casas = parseInt(elemento.dataset.casas, 10) || 0;
  const duracao = 1400;
  const inicio = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const suavizado = 1 - Math.pow(1 - progresso, 3);
    elemento.textContent = (alvo * suavizado).toFixed(casas).replace(".", ",");
    if (progresso < 1) {
      requestAnimationFrame(passo);
    }
  }
  if (REDUZIR_MOVIMENTO) {
    elemento.textContent = alvo.toFixed(casas).replace(".", ",");
    return;
  }
  requestAnimationFrame(passo);
}

function initContadores() {
  const contadores = $$(".contador");
  if (!contadores.length) {
    return;
  }
  if (!("IntersectionObserver" in window)) {
    contadores.forEach(animarContador);
    return;
  }
  const observador = new IntersectionObserver(
    entradas => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          animarContador(entrada.target);
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  contadores.forEach(el => observador.observe(el));
}

const ICONES = {
  hidro: '<path d="M12 2.7s5.5 6.2 5.5 10.3a5.5 5.5 0 1 1-11 0C6.5 8.9 12 2.7 12 2.7z"/>',
  sol: '<path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-13.5a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1.5a1 1 0 0 1-1 1zm0 19.5a1 1 0 0 1-1-1v-1.5a1 1 0 1 1 2 0V22a1 1 0 0 1-1 1zM4.22 5.64a1 1 0 0 1 0-1.41l1.06-1.06a1 1 0 0 1 1.42 1.41L5.64 5.64a1 1 0 0 1-1.42 0zm13.07 13.07a1 1 0 0 1 0-1.41l1.06-1.06a1 1 0 0 1 1.42 1.41l-1.07 1.06a1 1 0 0 1-1.41 0zM2 13H3.5a1 1 0 1 0 0-2H2a1 1 0 1 0 0 2zm18.5 0H22a1 1 0 1 0 0-2h-1.5a1 1 0 1 0 0 2zM5.64 18.36a1 1 0 0 1-1.42 0l-1.06-1.07a1 1 0 1 1 1.41-1.41l1.07 1.06a1 1 0 0 1 0 1.42zM18.72 5.64a1 1 0 0 1-1.42 0l-1.06-1.06a1 1 0 0 1 1.42-1.41l1.06 1.06a1 1 0 0 1 0 1.41z"/>',
  vento: '<path d="M13 3a2.5 2.5 0 0 0-2.45 2H3a1 1 0 1 0 0 2h7.55A2.5 2.5 0 1 0 13 3zm-3 6a2.5 2.5 0 0 0-2.45 2H1a1 1 0 1 0 0 2h6.55A2.5 2.5 0 1 0 10 9zm8.5-2a2.5 2.5 0 0 0-2.44 2H21a1 1 0 1 1 0 2h-4.94a2.5 2.5 0 1 0 2.44 3H23a1 1 0 1 0 0-2h-.06A2.5 2.5 0 0 0 19.5 7zM11 15a2.5 2.5 0 0 0-2.45 2H3a1 1 0 1 0 0 2h5.55A2.5 2.5 0 1 0 11 15z"/>',
  folha: '<path d="M17.6 2.2C11 2 4.9 4.6 3.1 10.4c-1.3 4.2.4 8.2 1.6 9.6l1.5-1.4C5.2 17.3 4 14 5 10.8c.4-1.3 1.1-2.4 2-3.3-.2 2.3.3 4.7 2.1 6.9 2.7 3.3 7 3.6 9.2 2 2.3-1.7 3-5.4.6-8.1-2-2.3-4.9-3.2-8.2-2.9 1.9-1 4.3-1.6 6.9-1.7v-1.5zM9.6 20.9c1.9 1 4.4 1.2 6.4.3l-.6-1.4c-1.6.7-3.5.5-5-.3l-.8 1.4z"/>',
  terra: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 3.1c1 .3 1.9.9 2.4 1.8.4.8.3 1.7-.2 2.4-.5.7-1.3 1-2.1.9-.9-.2-1.7-.9-1.9-1.8-.2-1.1.5-2.5 1.8-3.3zM6 18.9A8 8 0 0 1 4 13c0-.4 0-.8.1-1.2.9.6 1.5 1.6 1.6 2.7.1.8.6 1.5 1.4 1.8.8.3 1.4 1.2 1.3 2.1 0 .2-.1.4-.1.6-.8-.2-1.6-.5-2.3-1.1zm10.9-.9A8 8 0 0 1 12 20c-.4 0-.8 0-1.2-.1.5-.9 1.4-1.4 2.4-1.5 1-.1 1.8-.7 2.2-1.6.3-.7.9-1.2 1.7-1.4.9-.2 1.9.2 2.4 1-.2.6-.4 1.1-.6 1.6zm1-3.4c-.9-.5-2-.6-3-.3-1.5.4-2.7 1.5-3.2 2.9-.2.4-.5.6-.9.7-.9.2-1.9-.3-2.2-1.2-.3-1-1.2-1.8-2.3-2-1.3-.3-2.2-1.4-2.3-2.7-.1-1.5 1-2.9 2.5-3.2.6-.1 1.2-.1 1.7.1 1.3.4 2.8.1 3.8-.8 1-.9 2.4-1.1 3.6-.6 1.9.8 3.3 2.7 3.3 4.9 0 .8-.1 1.5-.4 2.2h-.6z"/>',
  onda: '<path d="M2 15c1.8 0 2.7-1.5 4-1.5S8.2 15 10 15s2.7-1.5 4-1.5S16.2 15 18 15s2.2-1.5 4-1.5V16c-1.8 0-2.7 1.5-4 1.5S15.8 16 14 16s-2.7 1.5-4 1.5S7.8 16 6 16s-2.2 1.5-4 1.5V15zm0 4c1.8 0 2.7-1.5 4-1.5S8.2 19 10 19s2.7-1.5 4-1.5 2.2 1.5 4 1.5 2.2-1.5 4-1.5V21c-1.8 0-2.7 1.5-4 1.5S15.8 21 14 21s-2.7 1.5-4 1.5S7.8 21 6 21s-2.2 1.5-4 1.5V19zM6.5 3.5C5 5.5 4 7.3 4 8.8 4 10.5 5.3 12 7 12s3-1.5 3-3.2C10 7.3 9 5.5 7.5 3.5L6.5 3.5zm10 0C15 5.5 14 7.3 14 8.8 14 10.5 15.3 12 17 12s3-1.5 3-3.2C20 7.3 19 5.5 17.5 3.5l-1 0z"/>',
  petroleo: '<path d="M12 2.7S5.5 9.8 5.5 14.5a6.5 6.5 0 0 0 13 0C18.5 9.8 12 2.7 12 2.7zm0 16.8a4.5 4.5 0 0 1-4.5-4.5c0-.6.1-1.3.4-2.1l1.8.8c-.2.5-.2 1-.2 1.3a2.5 2.5 0 0 0 2.5 2.5 1 1 0 1 1 0 2z"/>',
  chama: '<path d="M12.6 2.1c.3 2-.5 3.4-1.5 4.6-1 1.2-2.3 2.3-3.3 3.7-1.6 2.3-1.7 5.2.1 7.4 1.6 2 4.3 3 6.8 2.4 2.6-.6 4.7-2.8 5.1-5.4.5-3.1-1.3-5.6-3-7.4-.4 1-.9 2-1.8 2.7.3-2.9-.7-5.9-2.4-8zm-.9 11.2c.8.9 1 2.1.5 3.1-.4.8-1.2 1.3-2 1.3-1.5 0-2.5-1.6-1.8-3 .4-.9 1.2-1.5 1.9-2.1.5-.4 1-.4 1.4-.3.2 0 .3.1.4.2-.2.2-.3.5-.4.8z"/>',
  rocha: '<path d="M11.3 2.5 4 6.2v3.1l2.5 1.2v3.2L4 15v3.4l4.6 3.1h6.8l4.6-3.1V15l-2.5-1.3v-3.2L20 9.3V6.2l-7.3-3.7h-1.4zM9 9.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zm6.2 3.2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM10 15.6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/>',
  atomo: '<path d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm8.9 2.5c0-1.2-1-2.3-2.7-3.1.2-.8.3-1.5.3-2.2 0-1.8-.7-2.9-1.9-3.2-1.1-.3-2.5.2-4 1.4C11.1 3.5 9.7 3 8.6 3.3c-1.2.3-1.9 1.4-1.9 3.2 0 .7.1 1.4.3 2.2C5.4 9.7 4.4 10.8 4.4 12s1 2.3 2.6 3.1c-.2.8-.3 1.5-.3 2.2 0 1.8.7 2.9 1.9 3.2 1.1.3 2.5-.2 4-1.4 1.5 1.2 2.9 1.7 4 1.4 1.2-.3 1.9-1.4 1.9-3.2 0-.7-.1-1.4-.3-2.2 1.7-.8 2.7-1.9 2.7-3.1zm-4.3 6.5c-.6.2-1.5-.1-2.6-1 .5-.5 1-1.1 1.4-1.7.9-.1 1.8-.2 2.5-.4.1.4.1.8.1 1.2 0 1-.2 1.7-.9 1.9h-.5zM8.6 5.3c.7 0 1.5.4 2.4 1.1-.5.5-1 1.1-1.4 1.7-.9.1-1.8.2-2.5.4-.1-.4-.1-.8-.1-1.2 0-1 .2-1.7.9-1.9l.7-.1zm-1.5 5.4c.7-.2 1.6-.3 2.5-.4.3.6.7 1.1 1.2 1.7h-2.4c-.5-.5-.9-.9-1.3-1.3zm4.9-2.2c-.4.5-.8 1.1-1.1 1.7-.3-.6-.7-1.2-1.1-1.7.4 0 .7-.1 1.1-.1s.7.1 1.1.1zm-3.8 6.4h2.4c-.4.5-.8 1.1-1.2 1.7-.9-.1-1.8-.2-2.5-.4.4-.5.8-.9 1.3-1.3zm1.2 3.1c1.1-.9 2.1-2.2 2.6-3.1.6 0 1.1-.1 1.7-.2.5.9 1.5 2.2 2.6 3.1-2 1.5-4.8 1.5-6.9.2zm8.4-3.5c-.7.2-1.6.3-2.5.4l-1.2-1.7h2.4c.5.5.9.9 1.3 1.3zm-1.3-3.3h-2.4c.4-.5.8-1.1 1.2-1.7.9.1 1.8.2 2.5.4-.4.5-.8.9-1.3 1.3zm-2.1-5.9c.6-.2 1.5.1 2.6 1-1.1.9-2.1 2.2-2.6 3.1-.6 0-1.1.1-1.7.2-.5-.9-1.5-2.2-2.6-3.1 1.4-1 2.9-1.4 4.3-1.2z"/>'
};

function renderCards() {
  const grade = $("#grade-fontes");
  if (!grade || typeof FONTES === "undefined") {
    return;
  }
  FONTES.forEach(fonte => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `card-fonte reveal`;
    card.dataset.tipo = fonte.tipo;
    card.dataset.id = fonte.id;
    card.style.setProperty("--acento", fonte.tipo === "renovavel" ? "#2e9e5b" : "#b3402f");
    card.setAttribute("aria-haspopup", "dialog");
    card.innerHTML = `
      <div class="card-fonte-topo">
        <span class="card-fonte-icone" aria-hidden="true">
          <svg viewBox="0 0 24 24">${ICONES[fonte.icone] || ""}</svg>
        </span>
        <span class="tag-tipo ${fonte.tipo}">${fonte.tipo === "renovavel" ? "🌱 Renovável" : "⛽ Não renovável"}</span>
      </div>
      <h3>${fonte.nome}</h3>
      <p>${fonte.resumo}</p>
      <span class="card-fonte-saiba">Saiba mais <svg viewBox="0 0 24 24" aria-hidden="true" style="width:14px;height:14px;fill:currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></span>
    `;
    grade.appendChild(card);
  });
}

function initFiltros() {
  const filtros = $$(".filtro");
  filtros.forEach(filtro => {
    filtro.addEventListener("click", () => {
      filtros.forEach(f => f.classList.remove("ativo"));
      filtro.classList.add("ativo");
      const criterio = filtro.dataset.filtro;
      $$(".card-fonte").forEach(card => {
        const mostrar = criterio === "todas" || card.dataset.tipo === criterio;
        card.classList.toggle("oculta", !mostrar);
      });
    });
  });
}

let ultimoFocado = null;

function abrirModal(fonte) {
  const modal = $("#modal-fonte");
  ultimoFocado = document.activeElement;
  $("#modal-titulo").textContent = fonte.nome;
  $("#modal-detalhe").textContent = fonte.detalhe;
  $("#modal-curiosidade").textContent = fonte.curiosidade;
  const tag = $("#modal-tag");
  tag.textContent = fonte.tipo === "renovavel" ? "🌱 Renovável" : "⛽ Não renovável";
  tag.className = `modal-tag ${fonte.tipo}`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  $(".modal-fechar").focus();
}

function fecharModal() {
  const modal = $("#modal-fonte");
  modal.hidden = true;
  document.body.style.overflow = "";
  if (ultimoFocado) {
    ultimoFocado.focus();
  }
}

function initModal() {
  const grade = $("#grade-fontes");
  if (!grade) {
    return;
  }
  grade.addEventListener("click", evento => {
    const card = evento.target.closest(".card-fonte");
    if (!card) {
      return;
    }
    const fonte = FONTES.find(f => f.id === card.dataset.id);
    if (fonte) {
      abrirModal(fonte);
    }
  });

  $$("[data-fechar-modal]").forEach(el => el.addEventListener("click", fecharModal));

  document.addEventListener("keydown", evento => {
    const modal = $("#modal-fonte");
    if (modal.hidden) {
      return;
    }
    if (evento.key === "Escape") {
      fecharModal();
    }
    if (evento.key === "Tab") {
      const focaveis = $$('#modal-fonte button:not([tabindex="-1"])');
      if (!focaveis.length) {
        return;
      }
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }
  });
}

function atualizarDestaque(escopo) {
  const destaque = DESTAQUES[escopo];
  if (!destaque) {
    return;
  }
  $(".destaque-caixa .destaque-emoji").textContent = destaque.emoji;
  $("#destaque-titulo").textContent = destaque.titulo;
  $("#destaque-texto").textContent = destaque.texto;
}

function initTabs() {
  const tabs = $$(".tab");
  const painel = $("#painel-graficos");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => selecionarTab(tab));
    tab.addEventListener("keydown", evento => {
      if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") {
        return;
      }
      evento.preventDefault();
      const indiceAtual = tabs.indexOf(document.activeElement);
      const proximo = evento.key === "ArrowRight" ? (indiceAtual + 1) % tabs.length : (indiceAtual - 1 + tabs.length) % tabs.length;
      tabs[proximo].focus();
      selecionarTab(tabs[proximo]);
    });
  });

  function selecionarTab(tab) {
    tabs.forEach(t => {
      const ativa = t === tab;
      t.classList.toggle("ativa", ativa);
      t.setAttribute("aria-selected", String(ativa));
      t.tabIndex = ativa ? 0 : -1;
    });
    if (painel) {
      painel.setAttribute("aria-labelledby", tab.id);
    }
    const escopo = tab.dataset.escopo;
    atualizarGraficos(escopo);
    $("#badge-energetica").textContent = `${formatarPercentual(DADOS_MATRIZES.energetica[escopo].renovavel)}% renovável`;
    $("#badge-eletrica").textContent = `${formatarPercentual(DADOS_MATRIZES.eletrica[escopo].renovavel)}% renovável`;
    atualizarDestaque(escopo);
  }

  selecionarTab($(".tab.ativa"));
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderCards();
  initFiltros();
  initTabs();
  initModal();
  initReveal();
  initContadores();
  $("#ano-atual").textContent = new Date().getFullYear();
});
