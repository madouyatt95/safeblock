import {
  activities,
  badges,
  channels,
  markers,
  notifications,
  people,
  reportTypes,
  roles,
  safePlaces,
  statuses,
  user
} from "./data.js";
import { icon } from "./icons.js";
import {
  appHeader,
  audioWave,
  avatar,
  bottomSheet,
  glassCard,
  glyph,
  listRow,
  logo,
  mapView,
  metricChart,
  primaryButton,
  statusBadge
} from "./components.js";

export function splashView() {
  return `
    <section class="view splash-view">
      <div class="splash-center">
        ${logo("xl")}
        <h1>SafeBlock</h1>
        <p>Prévenir • Apaiser • Protéger</p>
      </div>
      <span class="loading-line"><i></i></span>
      <button class="tap-zone" type="button" data-route="/login">Continuer</button>
    </section>
  `;
}

export function loginView(state) {
  return `
    <section class="view auth-view">
      <div class="brand-row">${logo("sm")}<strong>SafeBlock</strong></div>
      <h1>Connectez-vous à votre compte</h1>
      ${formError(state.errors.login)}
      <label class="field"><span>Email ou téléphone</span><input name="loginId" autocomplete="username" value="${state.forms.loginId || ""}"></label>
      <label class="field has-icon"><span>Mot de passe</span><input name="loginPassword" type="${state.ui.showPassword ? "text" : "password"}" autocomplete="current-password" value="${state.forms.loginPassword || ""}"><button type="button" data-action="toggle-password">${icon("eye")}</button></label>
      <button class="primary-button" type="button" data-action="login">Se connecter</button>
      <button class="text-link right" type="button" data-action="toast" data-value="Un lien de réinitialisation fictif a été préparé.">Mot de passe oublié ?</button>
      <div class="divider">Ou continuer avec</div>
      <div class="social-row">
        <button type="button" data-action="toast" data-value="Connexion Google simulée">G</button>
        <button type="button" data-action="toast" data-value="Connexion Apple simulée">A</button>
      </div>
      <p class="switch-text">Pas encore de compte ? <button type="button" data-route="/register">Créer un compte</button></p>
    </section>
  `;
}

export function registerView(state) {
  return `
    <section class="view auth-view">
      <div class="brand-row">${logo("sm")}<strong>SafeBlock</strong></div>
      <h1>Créer un compte</h1>
      ${formError(state.errors.register)}
      <label class="field"><span>Nom complet</span><input name="fullName" autocomplete="name" value="${state.forms.fullName || ""}"></label>
      <label class="field"><span>Email</span><input name="email" type="email" autocomplete="email" value="${state.forms.email || ""}"></label>
      <label class="field"><span>Téléphone</span><input name="phone" type="tel" autocomplete="tel" value="${state.forms.phone || ""}"></label>
      <label class="field"><span>Mot de passe</span><input name="password" type="password" autocomplete="new-password" value="${state.forms.password || ""}"></label>
      <label class="field"><span>Confirmation</span><input name="confirm" type="password" autocomplete="new-password" value="${state.forms.confirm || ""}"></label>
      <label class="check-row"><input name="terms" type="checkbox" ${state.forms.terms ? "checked" : ""}><span>J’accepte les CGU et la confidentialité</span></label>
      <button class="primary-button gradient" type="button" data-action="register">Créer mon compte</button>
      <p class="switch-text">Déjà un compte ? <button type="button" data-route="/login">Se connecter</button></p>
    </section>
  `;
}

export function roleSelectionView(state) {
  return `
    <section class="view role-view">
      ${appHeader({ title: "Quel est votre rôle ?", subtitle: "SafeBlock s’adapte à votre profil" })}
      <div class="role-list">
        ${roles.map((role) => listRow({ title: role.title, meta: role.desc, tone: role.tone, action: "select-role", value: role.id, selected: state.userRole === role.id })).join("")}
      </div>
      <div class="role-rights">
        ${statusBadge(roleLabel(state.userRole), "cyan")}
        <span>${state.userRole === "mediateur" ? "Accès intervention et validation" : "Expérience citoyenne et confidentialité renforcée"}</span>
      </div>
      <button class="primary-button sticky" type="button" data-route="/onboarding">Suivant</button>
    </section>
  `;
}

export function onboardingView(state) {
  const slides = [
    ["Prévenons les tensions avant qu’elles ne dégénèrent", "Détecter les signaux faibles, sans surveillance ni dénonciation."],
    ["Signalez, informez et protégez votre quartier", "Chaque information est modérée, agrégée et validée."],
    ["Ensemble, créons des quartiers plus sûrs", "Activités, médiation et lieux sûrs au centre de l’expérience."]
  ];
  const [title, text] = slides[state.onboardingStep];
  return `
    <section class="view onboarding-view">
      <div class="hero-illustration">
        <span class="orbit one"></span><span class="orbit two"></span>
        <div class="human"><span class="head"></span><span class="torso"></span><span class="legs"></span></div>
        <span class="floating-icon walk">${icon("route")}</span>
        <span class="floating-icon chat">${icon("chat")}</span>
        <span class="floating-icon alert">${icon("bell")}</span>
      </div>
      <div class="copy-block">
        <h1>${title}</h1>
        <p>${text}</p>
      </div>
      <div class="dots">${slides.map((_, i) => `<span class="${i === state.onboardingStep ? "active" : ""}"></span>`).join("")}</div>
      <div class="inline-actions">
        <button class="text-link" type="button" data-route="/app/home">Passer</button>
        <button class="primary-button compact" type="button" data-action="next-onboarding">${state.onboardingStep === 2 ? "Entrer" : "Suivant"}</button>
      </div>
    </section>
  `;
}

export function homeView(state) {
  return `
    <section class="view app-view home-view">
      <header class="home-header">
        <button class="profile-mini" type="button" data-route="/app/profile">
          ${avatar(user.firstName, "electric")}
          <span><strong>Bonjour ${user.firstName} 👋</strong><small>${user.neighborhood}</small></span>
        </button>
        <div class="header-actions">
          <button class="icon-button" type="button" data-route="/app/notifications">${icon("bell")}<i></i></button>
          <button class="icon-button" type="button" data-action="toast" data-value="Centre d’alertes ouvert">${icon("alert")}<i class="red"></i></button>
        </div>
      </header>
      ${glassCard(`
        <div class="metric-card">
          <div><p>Indice de tranquillité</p><strong>76<span>/100</span></strong><small>+6,4 % cette semaine</small></div>
          ${metricChart()}
        </div>
        <p class="calm-copy">Quartier globalement calme</p>
      `, "peace-card")}
      <section class="section-block">
        <div class="section-title"><h2>Alertes actives</h2><button class="icon-button bare" data-action="toast" data-value="Alertes filtrées">${icon("close")}</button></div>
        <div class="mini-grid">
          ${miniStat("3", "nouvelles", "orange")}
          ${miniStat("12", "traitées", "red")}
        </div>
      </section>
      <section class="section-block">
        <div class="section-title"><h2>Activité du jour</h2><button class="text-link" data-action="toast" data-value="Calendrier synchronisé">Voir</button></div>
        ${activities.map(activityCard).join("")}
      </section>
    </section>
  `;
}

export function mapHomeView(state) {
  const selected = markers.find((marker) => marker.id === state.selectedMarker) || markers[2];
  return `
    <section class="view app-view map-view">
      ${appHeader({ title: "Carte intelligente", subtitle: "Zones calmes, vigilance et lieux sûrs", right: `<button class="icon-button" data-route="/app/report">${icon("plus")}</button>` })}
      <div class="filter-row">
        ${["Tout", "Calme", "Vigilance", "Tension", "Lieux sûrs"].map((label) => `<button class="${state.mapFilter === label ? "active" : ""}" data-action="filter-map" data-value="${label}">${label}</button>`).join("")}
      </div>
      ${mapView({ selected: selected.id })}
      ${bottomSheet(selected)}
      <div class="map-actions">
        <button class="ghost-button" data-route="/app/report/validation">Validation</button>
        <button class="ghost-button" data-route="/app/intervention">Intervention</button>
        <button class="ghost-button" data-route="/app/map?heatmap">Heatmap</button>
      </div>
    </section>
  `;
}

export function heatmapView(state) {
  return `
    <section class="view app-view">
      ${appHeader({ title: "Heatmap des tensions", subtitle: "Données agrégées et anonymisées" })}
      <div class="filter-row">
        ${["Aujourd’hui", "7 jours", "Parc Central", "Les Noues"].map((label) => `<button class="${state.heatFilter === label ? "active" : ""}" data-action="heat-filter" data-value="${label}">${label}</button>`).join("")}
      </div>
      ${mapView({ heatmap: true })}
      <div class="legend">
        <span><i class="calm"></i>Calme</span><span><i class="watch"></i>Vigilance</span><span><i class="tense"></i>Tension</span><span><i class="critical"></i>Critique</span>
      </div>
    </section>
  `;
}

export function reportTypeView(state) {
  return `
    <section class="view app-view">
      ${appHeader({ title: "Quel est le type de situation ?", subtitle: "Moins de 10 secondes, validation obligatoire" })}
      <div class="choice-list">
        ${reportTypes.map((type) => listRow({ title: type.label, tone: type.tone, action: "select-report", value: type.id, selected: state.report.type === type.id })).join("")}
      </div>
      <div class="inline-actions">
        <button class="text-link" data-route="/app/map">Annuler</button>
        <button class="primary-button compact" data-route="/app/report/details">Suivant</button>
      </div>
    </section>
  `;
}

export function reportDetailsView(state) {
  return `
    <section class="view app-view">
      ${appHeader({ title: "Détail du signalement", subtitle: selectedReportLabel(state) })}
      <label class="field textarea"><span>Description</span><textarea name="reportDescription" placeholder="Décrivez brièvement sans nommer de personnes...">${state.report.description || ""}</textarea></label>
      ${mediaAction("Ajouter une photo", "camera", "photo", state.report.photo)}
      ${mediaAction("Enregistrer une vidéo", "video", "video", state.report.video)}
      ${mediaAction("Enregistrer un audio", "mic", "audio", state.report.audio)}
      ${mediaAction("Utiliser ma position actuelle", "map", "gps", state.report.gps ? "GPS actif" : "")}
      ${mediaAction("Choisir une position sur la carte", "route", "pick", state.report.position ? "Position choisie" : "")}
      <label class="toggle-row"><span><strong>Signaler anonymement</strong><small>Votre identité ne sera pas visible par les autres utilisateurs.</small></span><input type="checkbox" name="anonymous" ${state.report.anonymous ? "checked" : ""}></label>
      <button class="primary-button gradient" data-action="send-report">Envoyer le signalement</button>
    </section>
  `;
}

export function validationView(state) {
  return `
    <section class="view app-view validation-view">
      ${appHeader({ title: "Validation collaborative", subtitle: "Aucune alerte publique sans analyse" })}
      ${glassCard(`
        <div class="alert-detail">
          ${glyph("orange")}
          <div><strong>Alerte #A1245</strong><p>${selectedReportLabel(state)}</p><small>Parc Central • 14:42 • zone approximative</small></div>
        </div>
        <p class="privacy-note">Aucune identité, adresse personnelle ou donnée privée n’est affichée publiquement.</p>
      `)}
      <div class="status-strip">${statuses.map((status) => `<span class="${status === state.validation.status ? "active" : ""}">${status}</span>`).join("")}</div>
      <div class="vote-grid">
        <button class="vote yes" data-action="vote-confirm"><span>Je confirme</span><strong>${state.validation.confirm}</strong><small>+1 depuis 2 min</small></button>
        <button class="vote no" data-action="vote-reject"><span>Information non pertinente</span><strong>${state.validation.reject}</strong></button>
      </div>
      <h2 class="subhead">Commentaires</h2>
      ${comment("Médiateur Karim B.", "J’y vais, j’observe la situation et je privilégie le dialogue.", "13:45")}
      ${state.validation.comments.map((text) => comment("Vous", text, "maintenant")).join("")}
      <div class="comment-input"><input name="commentDraft" placeholder="Ajouter un commentaire..." value="${state.validation.commentDraft || ""}"><button data-action="add-comment">${icon("chat")}</button></div>
      <button class="ghost-button" data-action="toast" data-value="Signalement d’abus enregistré pour démonstration">Signaler un abus</button>
    </section>
  `;
}

export function interventionView(state) {
  const canJoin = state.userRole === "mediateur";
  return `
    <section class="view app-view">
      ${appHeader({ title: "Intervention #1254", subtitle: "Parc Central • 3 médiateurs sur place" })}
      ${mapView({ intervention: true })}
      ${glassCard(`
        <div class="intervention-meta">
          ${statusBadge("Intervention en cours", "orange")}
          <p>Lieu sûr le plus proche : Maison de Quartier • 8 min</p>
        </div>
      `)}
      <button class="primary-button" data-action="${canJoin ? "join-intervention" : "follow-intervention"}">${canJoin ? "Rejoindre" : "Suivre l’évolution"}</button>
      <button class="ghost-button" data-action="toast" data-value="Statut consulté">Voir le statut</button>
    </section>
  `;
}

export function channelsView() {
  return `
    <section class="view app-view">
      ${appHeader({ title: "Canaux", subtitle: "Quartiers, médiateurs et activités", right: `<button class="icon-button" data-route="/app/call">${icon("phone")}</button>` })}
      <div class="channel-list">
        ${channels.map((channel) => `
          <button class="channel-row" data-route="/app/channels/${channel.id}">
            ${avatar(channel.name, channel.tone)}
            <span><strong>${channel.name}</strong><small>${channel.last}</small></span>
            <em>${channel.time}${channel.unread ? `<b>${channel.unread}</b>` : ""}</em>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

export function chatView(state, id = "quartier") {
  const channel = channels.find((item) => item.id === id) || channels[0];
  return `
    <section class="view app-view chat-view">
      ${appHeader({ title: channel.name, subtitle: "Chat temps réel simulé", right: `<button class="icon-button" data-route="/app/call">${icon("phone")}</button><button class="icon-button" data-route="/app/video-call">${icon("video")}</button>` })}
      <div class="messages">
        ${message("Karim B.", "Situation sous contrôle, pas d’escalade.", "13:42", "blue")}
        ${message("Vous", "Reçu, j’arrive en renfort.", "13:46", "electric", true)}
        ${message("Inès M.", "Merci, restons coordonnés.", "13:47", "purple")}
        ${state.chatMessages.map((msg) => message("Vous", msg, "maintenant", "electric", true)).join("")}
      </div>
      <div class="message-input sticky-input">
        <button data-action="toast" data-value="Message vocal prêt">${icon("mic")}</button>
        <input name="messageDraft" placeholder="Votre message..." value="${state.messageDraft || ""}">
        <button data-action="send-message">${icon("chat")}</button>
      </div>
    </section>
  `;
}

export function callView(state) {
  return `
    <section class="view immersive-view">
      ${appHeader({ title: "Salon • Parc Central", subtitle: `${people.length} participants`, right: `<button class="icon-button bare" data-route="/app/channels">${icon("close")}</button>` })}
      <div class="participant-grid">
        ${people.map((person) => `<button class="participant ${person.name === "Vous" ? "active" : ""}" data-action="toast" data-value="${person.name} • ${person.role}">${avatar(person.name, person.tone)}<strong>${person.name}</strong><small>${person.role}</small></button>`).join("")}
      </div>
      ${audioWave()}
      <div class="call-controls">
        <button class="${state.micMuted ? "" : "active"}" data-action="toggle-mic">${icon("mic")}</button>
        <button data-action="toast" data-value="Demande de parole envoyée">${icon("plus")}</button>
        <button class="end" data-route="/app/channels">${icon("phone")}</button>
      </div>
    </section>
  `;
}

export function videoCallView() {
  const names = ["Karim", "Sophie", "Mamadou", "Lucas", "Inès", "Sarah"];
  return `
    <section class="view immersive-view video-view">
      ${appHeader({ title: "Visioconférence", subtitle: "Médiation • 18:42", right: `<button class="icon-button bare" data-route="/app/channels">${icon("close")}</button>` })}
      <div class="video-grid">
        ${names.map((name, i) => `<div class="video-tile face-${i + 1}"><span>${name}</span></div>`).join("")}
      </div>
      <div class="call-controls">
        <button>${icon("mic")}</button><button>${icon("video")}</button><button>${icon("phone")}</button><button class="end" data-route="/app/channels">${icon("close")}</button>
      </div>
    </section>
  `;
}

export function sosView(state) {
  return `
    <section class="view immersive-view sos-view">
      ${appHeader({ title: "Mode urgence SOS", subtitle: "Réservé aux situations de danger immédiat" })}
      <button class="sos-button ${state.sos.active ? "active" : ""}" data-action="toggle-sos">${icon("shield")}<strong>SOS</strong></button>
      <p class="sos-copy">${state.sos.active ? `Alerte active • référents alertés : ${state.sos.referents}` : "Maintenez pendant 3 secondes"}</p>
      <p class="emergency-note">En cas de danger immédiat, contactez les services d’urgence compétents. SafeBlock ne les remplace pas.</p>
      <div class="sos-actions">
        ${listRow({ title: "Partage de position", meta: state.sos.active ? "Actif temporairement" : "Désactivé", tone: "blue", action: "toggle-sos" })}
        ${listRow({ title: "Référents configurés", meta: "5 personnes de confiance", tone: "orange", action: "toast", value: "Liste des contacts alertés ouverte" })}
      </div>
      <button class="danger-button" data-action="cancel-sos">Annuler l’alerte</button>
      <button class="primary-button" data-route="/app/safe-route">Voir l’itinéraire sécurisé</button>
    </section>
  `;
}

export function safeRouteView() {
  return `
    <section class="view app-view">
      ${appHeader({ title: "Vers un lieu sûr", subtitle: "Guidage GPS sécurisé" })}
      ${mapView({ route: true })}
      <div class="safe-list">
        ${safePlaces.map((place) => listRow({ title: place.title, meta: `${place.type} • ${place.time} • ${place.distance}`, tone: place.tone, action: "toast", value: "Destination sélectionnée" })).join("")}
      </div>
      <button class="primary-button" data-action="toast" data-value="Guidage démarré">Démarrer le guidage</button>
    </section>
  `;
}

export function profileView() {
  return `
    <section class="view app-view">
      ${appHeader({ title: "Profil citoyen", subtitle: "Actions positives et confidentialité" })}
      <div class="profile-head">
        ${avatar(user.name, "electric", "large")}
        <div><h2>${user.name}</h2><p>Habitant</p><small>${user.neighborhood} • ${user.badge}</small></div>
      </div>
      <div class="score-grid">
        ${miniStat("1 250", "points citoyens", "blue")}
        ${miniStat("#124", "classement", "cyan")}
      </div>
      <div class="profile-menu">
        ${["Mes signalements", "Mes interventions", "Mes activités", "Mes badges", "Mes paramètres", "Confidentialité", "Notifications"].map((label) => listRow({ title: label, meta: label === "Mes badges" ? "5 badges positifs" : "", tone: label === "Confidentialité" ? "green" : "blue", action: label === "Notifications" ? "route-proxy" : "toast", value: label === "Notifications" ? "/app/notifications" : `${label} ouvert` })).join("")}
      </div>
      <h2 class="subhead">Badges positifs</h2>
      ${badges.map((badge) => listRow({ title: badge.title, meta: badge.desc, tone: badge.tone, action: "toast", value: badge.title })).join("")}
    </section>
  `;
}

export function notificationsView(state) {
  return `
    <section class="view app-view">
      ${appHeader({ title: "Notifications", subtitle: "Alertes, médiation, activités", right: `<button class="text-link" data-action="mark-all-read">Tout lu</button>` })}
      <div class="filter-row">${["Toutes", "Alertes", "Médiation", "Activités", "Système"].map((cat) => `<button class="${state.notificationFilter === cat ? "active" : ""}" data-action="notification-filter" data-value="${cat}">${cat}</button>`).join("")}</div>
      ${notifications.filter((n) => state.notificationFilter === "Toutes" || n.category === state.notificationFilter).map((n) => listRow({ title: n.title, meta: `${n.category} • ${n.body}`, tone: n.tone, action: "toast", value: "Notification ouverte" })).join("")}
    </section>
  `;
}

export function mediatorView(state) {
  return `
    <section class="view app-view dashboard-view">
      ${appHeader({ title: "Espace médiateur", subtitle: `Statut : ${state.mediatorStatus}` })}
      <div class="filter-row">${["Disponible", "Occupé", "Hors ligne"].map((status) => `<button class="${state.mediatorStatus === status ? "active" : ""}" data-action="mediator-status" data-value="${status}">${status}</button>`).join("")}</div>
      <div class="score-grid">${miniStat("6", "alertes à analyser", "orange")}${miniStat("3", "interventions", "cyan")}${miniStat("4", "demandes", "purple")}${miniStat("2", "équipes", "green")}</div>
      ${["Accepter une intervention", "Créer une équipe", "Mettre à jour le statut", "Rédiger un compte rendu", "Clôturer une intervention"].map((label) => listRow({ title: label, tone: "blue", action: "toast", value: `${label} simulé` })).join("")}
    </section>
  `;
}

export function adminView() {
  const modules = ["Dashboard", "Utilisateurs", "Signalements", "Validations", "Interventions", "Médiateurs", "Associations", "Quartiers", "Lieux sûrs", "Activités", "Modération", "Statistiques", "Paramètres"];
  return `
    <section class="view app-view dashboard-view wide-view">
      ${appHeader({ title: "Administration", subtitle: "Données anonymisées et agrégées" })}
      <div class="score-grid">${miniStat("42", "signalements", "blue")}${miniStat("81%", "validation", "green")}${miniStat("14 min", "prise en charge", "cyan")}${miniStat("18", "activités préventives", "purple")}</div>
      ${mapView({ heatmap: true })}
      <div class="module-grid">${modules.map((label) => `<button data-action="toast" data-value="${label} ouvert">${glyph("blue")}<span>${label}</span></button>`).join("")}</div>
    </section>
  `;
}

function formError(error) {
  return error ? `<p class="form-error">${error}</p>` : "";
}

function roleLabel(roleId) {
  return roles.find((role) => role.id === roleId)?.title || "Habitant";
}

function selectedReportLabel(state) {
  return reportTypes.find((type) => type.id === state.report.type)?.label || "Tension / Altercation";
}

function miniStat(value, label, tone) {
  return `<article class="mini-stat ${tone}">${glyph(tone)}<strong>${value}</strong><small>${label}</small></article>`;
}

function activityCard(activity) {
  return `<button class="activity-card" data-action="toast" data-value="${activity.title} ajouté au calendrier">${avatar(activity.title, activity.tone)}<span><strong>${activity.title}</strong><small>${activity.meta}</small></span>${icon("arrow")}</button>`;
}

function mediaAction(title, iconName, key, meta = "") {
  return `<button class="media-row" data-action="media" data-value="${key}">${icon(iconName)}<span><strong>${title}</strong>${meta ? `<small>${meta}</small>` : ""}</span>${icon("arrow")}</button>`;
}

function comment(name, text, time) {
  return `<article class="comment-card">${avatar(name, "gold")}<div><strong>${name}</strong><p>${text}</p></div><time>${time}</time></article>`;
}

function message(name, text, time, tone, own = false) {
  return `<article class="message ${own ? "own" : ""}">${own ? "" : avatar(name, tone)}<p><strong>${name}</strong><span>${text}</span></p><time>${time}</time></article>`;
}
