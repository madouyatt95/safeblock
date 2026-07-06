export const routesWithNav = new Set([
  "/app/home",
  "/app/map",
  "/app/channels",
  "/app/profile",
  "/app/notifications",
  "/mediator",
  "/admin"
]);

export function getRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/splash";
}

export function navigate(path) {
  if (getRoute() === path) return;
  window.location.hash = path;
}

export function replace(path) {
  window.location.replace(`${window.location.pathname}${window.location.search}#${path}`);
}

export function onRouteChange(callback) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
