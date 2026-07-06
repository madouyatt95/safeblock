import { icon } from "./icons.js";
import { markers } from "./data.js";

export function logo(size = "md") {
  return `<div class="brand-mark ${size}" aria-hidden="true">Sb</div>`;
}

export function appHeader({ title, subtitle = "", right = "" }) {
  return `
    <header class="app-header">
      <div>
        ${subtitle ? `<p>${subtitle}</p>` : ""}
        <h1>${title}</h1>
      </div>
      ${right ? `<div class="header-actions">${right}</div>` : ""}
    </header>
  `;
}

export function avatar(name, tone = "blue", size = "") {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return `<span class="avatar ${tone} ${size}" aria-hidden="true"><i></i><b>${initials}</b></span>`;
}

export function primaryButton(label, action, extra = "") {
  return `<button class="primary-button ${extra}" type="button" data-action="${action}">${label}</button>`;
}

export function glassCard(content, extra = "") {
  return `<article class="glass-card ${extra}">${content}</article>`;
}

export function glyph(tone = "blue") {
  return `<span class="glyph ${tone}" aria-hidden="true"></span>`;
}

export function listRow({ title, meta = "", tone = "blue", action = "", selected = false, value = "" }) {
  return `
    <button class="list-row ${selected ? "selected" : ""}" type="button" ${action ? `data-action="${action}"` : ""} ${value ? `data-value="${value}"` : ""}>
      ${glyph(tone)}
      <span><strong>${title}</strong>${meta ? `<small>${meta}</small>` : ""}</span>
      ${icon(selected ? "check" : "arrow")}
    </button>
  `;
}

export function bottomNav(active) {
  const tabs = [
    ["/app/home", "Accueil", "home"],
    ["/app/map", "Carte", "map"],
    ["/app/channels", "Canaux", "chat"],
    ["/app/profile", "Profil", "user"]
  ];
  return `
    <nav class="bottom-nav" aria-label="Navigation principale">
      ${tabs
        .map(
          ([route, label, name]) => `
            <button class="${active === route ? "active" : ""}" type="button" data-route="${route}">
              ${icon(name)}
              <span>${label}</span>
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

export function statusBadge(label, tone = "blue") {
  return `<span class="status-badge ${tone}">${label}</span>`;
}

export function mapView({ heatmap = false, route = false, intervention = false, selected = "" } = {}) {
  return `
    <div class="map-canvas ${heatmap ? "heatmap" : ""} ${route ? "route-mode" : ""} ${intervention ? "intervention-mode" : ""}">
      <span class="road r1"></span>
      <span class="road r2"></span>
      <span class="road r3"></span>
      <span class="road r4"></span>
      ${heatmap ? `<span class="heat h1"></span><span class="heat h2"></span><span class="heat h3"></span>` : ""}
      ${
        route
          ? `<svg class="route-line" viewBox="0 0 300 230" aria-hidden="true"><path d="M58 174 C96 130 106 94 149 102 S201 137 242 60"/><circle cx="58" cy="174" r="7"/><circle cx="242" cy="60" r="7"/></svg>`
          : ""
      }
      ${markers
        .map(
          (marker) => `
            <button class="map-marker ${marker.tone} ${selected === marker.id ? "selected" : ""}" style="--x:${marker.x}%;--y:${marker.y}%" type="button" data-action="marker" data-value="${marker.id}" aria-label="${marker.title}">
              <i></i>
            </button>
          `
        )
        .join("")}
      ${
        intervention
          ? `<span class="map-person p1">${avatar("Karim", "blue")}</span><span class="map-person p2">${avatar("Inès", "purple")}</span><span class="map-person p3">${avatar("Sarah", "green")}</span>`
          : ""
      }
    </div>
  `;
}

export function bottomSheet(marker) {
  if (!marker) return "";
  return `
    <section class="bottom-sheet">
      <div class="sheet-handle"></div>
      <div class="sheet-top">
        <div>
          <h2>${marker.title}</h2>
          <p>${marker.desc}</p>
        </div>
        ${statusBadge(marker.type === "tension" ? "Vigilance" : "Zone calme", marker.tone)}
      </div>
      <div class="sheet-meta">
        <span>Faible activité</span>
        <span>21 médiateurs à proximité</span>
      </div>
      <button class="primary-button" type="button" data-route="/app/report">Ouvrir les détails</button>
    </section>
  `;
}

export function metricChart() {
  return `
    <svg class="trend-chart" viewBox="0 0 132 76" aria-hidden="true">
      <path d="M6 62 C24 38 31 57 45 40 S70 50 82 25 S103 27 124 9"></path>
      <circle cx="106" cy="23" r="15"></circle>
      <circle cx="106" cy="23" r="4"></circle>
    </svg>
  `;
}

export function audioWave() {
  return `<div class="audio-wave">${Array.from({ length: 31 }, (_, i) => `<span style="--h:${4 + ((i * 5) % 9)}"></span>`).join("")}</div>`;
}
