const macrodistritos = [
  {
    id: "max-paredes",
    nombre: "Max Paredes",
    descripcion: "Distritos 18, 19",
    ruta: "MaxParedes/index.html"
  },
  {
    id: "sur",
    nombre: "Sur",
    descripcion: "Distrito 21",
    ruta: "Sur/index.html"
  }
];

const datosElectorales = [
  { macro: "SUR",          recintos: 34, mesas: 599, habilitados: 140489, pct: 21.96, destacado: true },
  { macro: "PERIFÉRICA",   recintos: 36, mesas: 515, habilitados: 119412, pct: 18.66, destacado: false },
  { macro: "COTAHUMA",     recintos: 45, mesas: 516, habilitados: 119343, pct: 18.65, destacado: false },
  { macro: "MAX PAREDES",  recintos: 30, mesas: 433, habilitados: 101136, pct: 15.81, destacado: true },
  { macro: "SAN ANTONIO",  recintos: 28, mesas: 383, habilitados: 88607,  pct: 13.85, destacado: false },
  { macro: "CENTRO",       recintos: 27, mesas: 261, habilitados: 59276,  pct: 9.26,  destacado: false },
  { macro: "MALLASA",      recintos: 4,  mesas: 32,  habilitados: 7406,   pct: 1.16,  destacado: false },
  { macro: "RURALES",      recintos: 9,  mesas: 21,  habilitados: 4134,   pct: 0.65,  destacado: false },
];

const totales = { recintos: 213, mesas: 2760, habilitados: 639803 };

function fmt(n) {
  return n.toLocaleString("es-BO");
}

function renderStats() {
  const el = document.getElementById("statsInner");
  const items = [
    { label: "Habilitados",     value: fmt(totales.habilitados) },
    { label: "Recintos",        value: totales.recintos },
    { label: "Mesas Electorales", value: fmt(totales.mesas) },
    { label: "Macrodistritos",  value: 8 },
  ];
  el.innerHTML = items.map(i => `
    <div class="stat-item">
      <div class="stat-value">${i.value}</div>
      <div class="stat-label">${i.label}</div>
    </div>
  `).join("");
}

function renderMacroCards() {
  const grid = document.getElementById("macroGrid");
  grid.innerHTML = macrodistritos.map(m => `
    <button class="macro-card" data-id="${m.id}" data-ruta="${m.ruta}" onclick="handleMacroClick(this)">
      <div class="macro-card-icon">
        <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
      <div>
        <div class="macro-card-name">${m.nombre}</div>
        <div class="macro-card-sub">${m.descripcion}</div>
      </div>
      <div class="macro-card-arrow">
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </button>
  `).join("");
}

function handleMacroClick(btn) {
  const allBtns = document.querySelectorAll(".macro-card");
  const isActive = btn.classList.contains("active");
  allBtns.forEach(b => b.classList.remove("active"));

  if (!isActive) {
    btn.classList.add("active");
    const ruta = btn.dataset.ruta;

    if (ruta && ruta !== "#") {
      window.location.href = ruta;    // Abre en nueva pestaña
    }
  }
}

function renderTable() {
  const tbody = document.getElementById("tableBody");
  const maxHab = totales.habilitados;

  let html = datosElectorales.map(d => {
    const pctBar = ((d.habilitados / maxHab) * 100).toFixed(1);
    const hl = d.destacado ? "row-highlight" : "";
    const barHL = d.destacado ? "highlight" : "";
    const dot = d.destacado ? '<span class="dot"></span>' : "";

    return `
      <tr class="${hl}">
        <td>${dot}${d.macro}</td>
        <td>${d.recintos}</td>
        <td>${fmt(d.mesas)}</td>
        <td>
          <div class="bar-cell">
            <div class="bar-fill ${barHL}" style="width:${pctBar}%"></div>
            <div class="bar-value">${fmt(d.habilitados)}</div>
          </div>
        </td>
        <td>${d.pct.toFixed(2)}%</td>
      </tr>
    `;
  }).join("");

  html += `
    <tr class="row-total">
      <td>TOTAL GENERAL</td>
      <td>${totales.recintos}</td>
      <td>${fmt(totales.mesas)}</td>
      <td><strong style="font-family:var(--font-mono)">${fmt(totales.habilitados)}</strong></td>
      <td>100%</td>
    </tr>
  `;

  tbody.innerHTML = html;
}

// ---- Navbar scroll effect ----
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

function solicitarAcceso() {
  window.open("https://notebooklm.google.com/notebook/07cf6d01-a17d-4a85-99e2-8c6e169a0d58", "_blank");
}

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderMacroCards();
  renderTable();
});
