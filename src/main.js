import { markers } from "./data.js";
import { bottomNav } from "./components.js";
import { getRoute, navigate, onRouteChange, replace } from "./router.js";
import {
  adminView,
  callView,
  channelsView,
  chatView,
  heatmapView,
  homeView,
  interventionView,
  loginView,
  mapHomeView,
  mediatorView,
  notificationsView,
  onboardingView,
  profileView,
  registerView,
  reportDetailsView,
  reportTypeView,
  roleSelectionView,
  safeRouteView,
  sosView,
  splashView,
  validationView,
  videoCallView
} from "./views.js";

const app = document.querySelector("#app");

const initialState = {
  userRole: localStorage.getItem("safeblock.role") || "habitant",
  onboardingStep: Number(localStorage.getItem("safeblock.onboarding") || 0),
  selectedMarker: "m3",
  mapFilter: "Tout",
  heatFilter: "Aujourd’hui",
  notificationFilter: "Toutes",
  mediatorStatus: "Disponible",
  forms: {
    loginId: "",
    loginPassword: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    terms: false
  },
  errors: {},
  ui: {
    showPassword: false,
    toast: "",
    haptic: false
  },
  report: {
    type: "tension",
    description: "",
    photo: "",
    video: "",
    audio: "",
    gps: false,
    position: false,
    anonymous: true
  },
  validation: {
    status: "En validation",
    confirm: 7,
    reject: 2,
    commentDraft: "",
    comments: []
  },
  chatMessages: [],
  messageDraft: "",
  micMuted: false,
  sos: {
    active: false,
    referents: 5
  }
};

let state = structuredClone(initialState);

function setState(partial) {
  state = { ...state, ...partial };
  render();
}

function render() {
  const route = getRoute();
  let html = "";
  const queryRoute = route.split("?")[0];

  if (queryRoute === "/splash") html = splashView();
  else if (queryRoute === "/login") html = loginView(state);
  else if (queryRoute === "/register") html = registerView(state);
  else if (queryRoute === "/role-selection") html = roleSelectionView(state);
  else if (queryRoute === "/onboarding") html = onboardingView(state);
  else if (queryRoute === "/app/home") html = homeView(state);
  else if (queryRoute === "/app/map") html = route.includes("heatmap") ? heatmapView(state) : mapHomeView(state);
  else if (queryRoute === "/app/report") html = reportTypeView(state);
  else if (queryRoute === "/app/report/details") html = reportDetailsView(state);
  else if (queryRoute === "/app/report/validation") html = validationView(state);
  else if (queryRoute === "/app/intervention") html = interventionView(state);
  else if (queryRoute === "/app/channels") html = channelsView(state);
  else if (queryRoute.startsWith("/app/channels/")) html = chatView(state, queryRoute.split("/").pop());
  else if (queryRoute === "/app/call") html = callView(state);
  else if (queryRoute === "/app/video-call") html = videoCallView(state);
  else if (queryRoute === "/app/sos") html = sosView(state);
  else if (queryRoute === "/app/safe-route") html = safeRouteView(state);
  else if (queryRoute === "/app/profile") html = profileView(state);
  else if (queryRoute === "/app/notifications") html = notificationsView(state);
  else if (queryRoute === "/mediator") html = mediatorView(state);
  else if (queryRoute === "/admin") html = adminView(state);
  else html = splashView();

  const showNav = shouldShowNav(queryRoute);
  app.innerHTML = `<main class="app-shell">${html}${showNav ? bottomNav(activeTab(queryRoute)) : ""}${toast()}</main>`;
}

function shouldShowNav(route) {
  const immersiveRoutes = new Set([
    "/splash",
    "/login",
    "/register",
    "/role-selection",
    "/onboarding",
    "/app/call",
    "/app/video-call",
    "/app/sos",
    "/app/safe-route"
  ]);

  if (immersiveRoutes.has(route)) return false;
  return route.startsWith("/app/") || route === "/mediator" || route === "/admin";
}

function activeTab(route) {
  if (route.startsWith("/app/map") || route.startsWith("/app/report") || route.startsWith("/app/intervention")) return "/app/map";
  if (route.startsWith("/app/channels") || route === "/app/call" || route === "/app/video-call") return "/app/channels";
  if (route.startsWith("/app/profile") || route === "/mediator" || route === "/admin") return "/app/profile";
  return "/app/home";
}

function toast() {
  return state.ui.toast ? `<div class="toast">${state.ui.toast}</div>` : "";
}

function showToast(message) {
  state.ui.toast = message;
  state.ui.haptic = true;
  render();
  window.setTimeout(() => {
    state.ui.toast = "";
    state.ui.haptic = false;
    render();
  }, 1600);
}

function handleInput(event) {
  const target = event.target;
  if (!target.name) return;
  const value = target.type === "checkbox" ? target.checked : target.value;

  if (target.name in state.forms) state.forms[target.name] = value;
  if (target.name === "reportDescription") state.report.description = value;
  if (target.name === "anonymous") state.report.anonymous = value;
  if (target.name === "commentDraft") state.validation.commentDraft = value;
  if (target.name === "messageDraft") state.messageDraft = value;
}

function validateLogin() {
  const { loginId, loginPassword } = state.forms;
  if (!loginId || !loginPassword) {
    state.errors.login = "Renseignez votre identifiant et votre mot de passe.";
    render();
    return;
  }
  state.errors.login = "";
  navigate("/app/home");
}

function validateRegister() {
  const { fullName, email, phone, password, confirm, terms } = state.forms;
  if (!fullName || !email || !phone || !password || !confirm) {
    state.errors.register = "Tous les champs sont requis.";
    render();
    return;
  }
  if (password !== confirm) {
    state.errors.register = "Les mots de passe ne correspondent pas.";
    render();
    return;
  }
  if (!terms) {
    state.errors.register = "Vous devez accepter les CGU et la confidentialité.";
    render();
    return;
  }
  state.errors.register = "";
  navigate("/role-selection");
}

function handleAction(action, value) {
  switch (action) {
    case "toggle-password":
      state.ui.showPassword = !state.ui.showPassword;
      render();
      break;
    case "login":
      validateLogin();
      break;
    case "register":
      validateRegister();
      break;
    case "select-role":
      state.userRole = value;
      localStorage.setItem("safeblock.role", value);
      showToast("Rôle mis à jour");
      break;
    case "next-onboarding":
      if (state.onboardingStep < 2) {
        state.onboardingStep += 1;
        localStorage.setItem("safeblock.onboarding", String(state.onboardingStep));
        render();
      } else {
        navigate("/app/home");
      }
      break;
    case "filter-map":
      state.mapFilter = value;
      showToast(`Filtre : ${value}`);
      break;
    case "heat-filter":
      state.heatFilter = value;
      render();
      break;
    case "marker":
      state.selectedMarker = value;
      showToast(markers.find((marker) => marker.id === value)?.title || "Marqueur");
      break;
    case "select-report":
      state.report.type = value;
      render();
      break;
    case "media":
      state.report[value] = value === "gps" || value === "pick" ? !state.report[value] : "Ajouté";
      if (value === "pick") state.report.position = state.report.pick;
      showToast("Élément ajouté au signalement");
      break;
    case "send-report":
      if (!state.report.description.trim()) {
        showToast("Ajoutez une description courte.");
        return;
      }
      state.validation.status = "En validation";
      navigate("/app/report/validation");
      break;
    case "vote-confirm":
      state.validation.confirm += 1;
      showToast("Confirmation enregistrée");
      break;
    case "vote-reject":
      state.validation.reject += 1;
      showToast("Vote non pertinent enregistré");
      break;
    case "add-comment":
      if (state.validation.commentDraft.trim()) {
        state.validation.comments.push(state.validation.commentDraft.trim());
        state.validation.commentDraft = "";
        showToast("Commentaire ajouté");
      }
      break;
    case "join-intervention":
      showToast("Vous avez rejoint la cellule d’intervention.");
      break;
    case "follow-intervention":
      showToast("Suivi de l’évolution activé.");
      break;
    case "send-message":
      if (state.messageDraft.trim()) {
        state.chatMessages.push(state.messageDraft.trim());
        state.messageDraft = "";
        showToast("Message envoyé");
      }
      break;
    case "toggle-mic":
      state.micMuted = !state.micMuted;
      showToast(state.micMuted ? "Micro coupé" : "Micro activé");
      break;
    case "toggle-sos":
      state.sos.active = !state.sos.active;
      showToast(state.sos.active ? "SOS activé, position temporaire partagée" : "SOS désactivé");
      break;
    case "cancel-sos":
      state.sos.active = false;
      showToast("Alerte annulée");
      break;
    case "notification-filter":
      state.notificationFilter = value;
      render();
      break;
    case "mark-all-read":
      showToast("Notifications marquées comme lues");
      break;
    case "mediator-status":
      state.mediatorStatus = value;
      showToast(`Statut : ${value}`);
      break;
    case "route-proxy":
      navigate(value);
      break;
    case "toast":
      showToast(value);
      break;
    default:
      showToast("Action disponible en démonstration");
  }
}

document.addEventListener("click", (event) => {
  const routeTarget = event.target.closest("[data-route]");
  if (routeTarget) {
    navigate(routeTarget.dataset.route);
    return;
  }
  const actionTarget = event.target.closest("[data-action]");
  if (actionTarget) {
    handleAction(actionTarget.dataset.action, actionTarget.dataset.value || "");
  }
});

document.addEventListener("input", handleInput);
document.addEventListener("change", handleInput);

onRouteChange(render);

if (!window.location.hash) {
  replace("/splash");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

render();
