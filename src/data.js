export const user = {
  id: "kamal",
  name: "Kamal Diop",
  firstName: "Kamal",
  role: "habitant",
  neighborhood: "Quartier des Étoiles",
  badge: "Ambassadeur",
  points: 1250,
  rank: 124
};

export const roles = [
  { id: "habitant", title: "Habitant", desc: "Recevoir, aider, signaler sans stigmatiser", tone: "blue" },
  { id: "jeune", title: "Jeune", desc: "Activités, opportunités et entraide", tone: "orange" },
  { id: "parent", title: "Parent", desc: "Conseils et suivi apaisé du quartier", tone: "yellow" },
  { id: "mediateur", title: "Médiateur", desc: "Coordonner les interventions terrain", tone: "cyan" },
  { id: "association", title: "Association", desc: "Publier et mobiliser les habitants", tone: "purple" },
  { id: "commercant", title: "Commerçant", desc: "Commerce refuge et relais local", tone: "orange" },
  { id: "collectivite", title: "Collectivité", desc: "Piloter des actions préventives", tone: "green" }
];

export const people = [
  { name: "Karim", role: "Médiateur", tone: "blue" },
  { name: "Sophie", role: "Parent", tone: "gold" },
  { name: "Mamadou", role: "Éducateur", tone: "green" },
  { name: "Inès", role: "Association", tone: "purple" },
  { name: "Yacine", role: "Jeune", tone: "orange" },
  { name: "Sarah", role: "Médiatrice", tone: "cyan" },
  { name: "Lucas", role: "Éducateur", tone: "rose" },
  { name: "Vous", role: "Habitant", tone: "electric" }
];

export const activities = [
  { id: "a1", title: "Tournoi de football", meta: "18:30 • Parc Central", tone: "blue" },
  { id: "a2", title: "Atelier graffiti", meta: "19:00 • Maison de Quartier", tone: "purple" },
  { id: "a3", title: "Rencontre de médiation", meta: "20:00 • Centre-ville", tone: "green" },
  { id: "a4", title: "Atelier parents-jeunes", meta: "Samedi • Les Noues", tone: "orange" }
];

export const markers = [
  { id: "m1", x: 18, y: 24, type: "association", tone: "purple", title: "Maison des jeunes", desc: "Activité ouverte" },
  { id: "m2", x: 39, y: 17, type: "safe", tone: "cyan", title: "Commerce refuge", desc: "Ouvert jusqu’à 22:00" },
  { id: "m3", x: 53, y: 49, type: "tension", tone: "orange", title: "Parc Central", desc: "Zone calme, activité faible" },
  { id: "m4", x: 74, y: 36, type: "mediator", tone: "blue", title: "Karim", desc: "Médiateur disponible" },
  { id: "m5", x: 27, y: 66, type: "watch", tone: "yellow", title: "Les Noues", desc: "Vigilance modérée" },
  { id: "m6", x: 79, y: 72, type: "safe", tone: "green", title: "Centre social Nord", desc: "Lieu sûr partenaire" },
  { id: "m7", x: 52, y: 78, type: "activity", tone: "cyan", title: "Terrain multisport", desc: "Tournoi en préparation" }
];

export const reportTypes = [
  { id: "tension", label: "Tension / Altercation", tone: "blue" },
  { id: "group", label: "Regroupement préoccupant", tone: "purple" },
  { id: "harass", label: "Insulte / Harcèlement", tone: "yellow" },
  { id: "damage", label: "Dégradation", tone: "yellow" },
  { id: "violence", label: "Violence", tone: "orange" },
  { id: "other", label: "Autre situation", tone: "orange" }
];

export const statuses = ["Brouillon", "En attente d’analyse", "En validation", "Confirmé", "Intervention en cours", "Résolu", "Non pertinent"];

export const channels = [
  { id: "quartier", name: "Mon quartier", last: "Tournoi maintenu, rendez-vous 18h30.", time: "13:46", unread: 4, tone: "blue" },
  { id: "mediateurs", name: "Médiateurs", last: "Karim rejoint Parc Central.", time: "13:41", unread: 2, tone: "cyan" },
  { id: "parents", name: "Parents", last: "Nouveau guide disponible.", time: "12:20", unread: 0, tone: "gold" },
  { id: "jeunes", name: "Jeunes", last: "Atelier graffiti confirmé.", time: "11:55", unread: 8, tone: "orange" },
  { id: "associations", name: "Associations", last: "Besoin de bénévoles samedi.", time: "10:12", unread: 1, tone: "purple" },
  { id: "prevention", name: "Prévention", last: "Conseil : privilégier le dialogue.", time: "09:40", unread: 0, tone: "green" }
];

export const notifications = [
  { id: "n1", category: "Alertes", title: "Validation en cours", body: "Votre signalement est analysé par un médiateur.", tone: "orange" },
  { id: "n2", category: "Activités", title: "Tournoi de football", body: "Début dans 45 minutes au Parc Central.", tone: "blue" },
  { id: "n3", category: "Médiation", title: "Commentaire reçu", body: "Karim a ajouté une information utile.", tone: "cyan" },
  { id: "n4", category: "Système", title: "Confidentialité", body: "Votre mode anonyme est actif sur le dernier signalement.", tone: "green" }
];

export const badges = [
  { title: "Ambassadeur", desc: "Participation régulière aux actions positives", tone: "gold" },
  { title: "Médiateur actif", desc: "Médiations suivies et clôturées", tone: "cyan" },
  { title: "Citoyen vigilant", desc: "Informations utiles validées", tone: "blue" },
  { title: "Artisan de paix", desc: "Actions d’apaisement réussies", tone: "purple" },
  { title: "Référent jeunesse", desc: "Mentorat et présence terrain", tone: "orange" }
];

export const safePlaces = [
  { title: "Maison de Quartier", type: "Lieu sûr", time: "8 min", distance: "600 m", tone: "cyan" },
  { title: "Commerce partenaire", type: "Commerce refuge", time: "6 min", distance: "420 m", tone: "green" },
  { title: "Centre de médiation", type: "Médiation", time: "11 min", distance: "850 m", tone: "blue" }
];
