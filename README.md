# LIEN — PWA de prévention et de médiation

LIEN est un prototype produit mobile-first destiné à prévenir les rixes, faciliter la médiation et coordonner les acteurs locaux sans encourager la confrontation.

## Lancer le prototype

```bash
cd /chemin/vers/le-depot
python3 -m http.server 4173
```

Ouvrir ensuite `http://localhost:4173`.

## Déploiement

Le dépôt est configuré comme site statique Vercel. Chaque push sur la branche
`main` déclenche le déploiement de production via l'intégration GitHub/Vercel.

## Fonctionnalités intégrées

- onboarding et sept rôles : Habitant, Jeune, Parent, Médiateur, Association, Commerçant et Collectivité ;
- accueil personnalisé, indice de tranquillité sur 100, niveau de confiance, tendance, alertes et activités ;
- carte dark interactive, filtres, heatmap, zones volontairement agrégées et lieux sûrs ;
- signalement en quatre étapes avec six catégories, photo, vidéo, audio, GPS, confidentialité et suivi ;
- corroboration citoyenne encadrée et validation professionnelle ;
- canaux modérés, messages, notes vocales et actions d'appel ou de visioconférence ;
- salle d'intervention réservée aux rôles professionnels ;
- SOS avec compte à rebours, annulation, contacts alertés et itinéraire vers un lieu sûr ;
- profil privé, badges de formation, contributions et historique ;
- tableau de bord collectivité/médiateur, file de validation, statistiques, gestion et exports CSV/PDF ;
- compte local, statut de vérification, double authentification préparée et gestion des sessions ;
- notifications adaptées au rôle, aperçus discrets et heures silencieuses ;
- centre opérationnel médiateur avec disponibilité, escalade, clôture documentée et suivi ;
- espace jeune protégé, aide sans identité et sortie rapide vers un écran neutre ;
- programme de lieux sûrs vérifiés avec disponibilité, renouvellement et QR officiel ;
- prévention anti-abus locale : rapprochement des doublons, limitation temporaire et recours humain ;
- modération confidentielle des messages et journal d'examen ;
- réglages d'accessibilité : texte, contraste, réduction des mouvements, français simplifié et usage à une main ;
- indicateurs d'impact responsables sans classement de quartier ;
- assistant « Que faire maintenant ? » avec réponses sans confrontation ;
- plan personnel de sécurité conservé uniquement sur l'appareil ;
- frein anti-rumeur qui évalue les risques de partage sans prétendre vérifier la vérité ;
- kit hors connexion et préparation locale des signalements quand le réseau disparaît ;
- parcours guidé d'installation de la PWA ;
- confirmation « Je suis en sécurité » avec arrêt du partage et demande de suivi ;
- scénarios d'entraînement sans score ni compétition ;
- centre de micro-formations avec progression locale privée ;
- consignes essentielles en français, français facile, anglais et arabe avec lecture vocale ;
- système visuel LIEN 5.0 : typographie lisible, espacements cohérents, cartes sans chevauchement et zones tactiles adaptées au mobile ;
- signalement en liste verticale, messagerie plein écran, navigation basse protégée et profil mobile simplifié ;
- mode texte agrandi étendu à l'accueil, la carte, les formulaires, les canaux, le profil et le SOS ;
- gestion locale des permissions, téléchargement et suppression des données ;
- manifeste PWA, icônes, raccourcis et cache hors ligne.

## Sécurité du prototype

Les positions publiques sont agrégées, les rôles professionnels sont identifiés comme vérifiés, les interventions ne sont pas accessibles aux rôles citoyens et le vocabulaire évite toute incitation à la confrontation.

## Passage en production

Les données et nouveaux états sont actuellement simulés et stockés localement. Les écrans sont prêts à être raccordés, mais une version déployée nécessitera notamment :

- authentification et vérification des rôles professionnels ;
- backend multi-territoires et base géospatiale ;
- messagerie temps réel et notifications ;
- stockage chiffré des médias avec floutage et durées de conservation ;
- contrôle d'accès par rôle, journal d'audit et file de modération ;
- protocole opérationnel avec les collectivités, médiateurs et services d'urgence ;
- AIPD, documentation RGPD et validation juridique ;
- application ou couche mobile native pour les fonctions SOS critiques en arrière-plan.
