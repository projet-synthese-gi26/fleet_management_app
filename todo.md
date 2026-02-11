# 📝 Plan de Finalisation UI/UX - Fleet Management
**Date :** Mercredi 11 Février 2026
**Statut :** Version Intégrale (Backend-Driven)

---

### Jalon 1 : Visibilité Publique & Souveraineté Admin (Modules 01 & 06)
*Priorité : Rendre la landing page dynamique et permettre à l'Admin de configurer le système.*

- [x] **Tâche 1.1 : Dynamisation de la Landing Page (01)**
    *   Implémenter le rafraîchissement automatique (polling ou bouton) des statistiques globales.
    *   *Route :* `GET /api/v1/health/public-stats`
- [ ] **Tâche 1.2 : CRUD complet des Ressources (06a-06i)**
    *   Ajouter les fonctions d'écriture (Créer, Modifier, Supprimer) pour les 9 référentiels (Marques, Modèles, Types de véhicules, etc.). Actuellement, seule la lecture est gérée.
    *   *Routes :* `POST/PUT/DELETE /api/v1/admin/resources/...`
- [ ] **Tâche 1.3 : Dashboard de Diagnostic profond (01)**
    *   Créer une vue Admin pour visualiser l'état de santé de chaque micro-service (Redis, Kafka, Pynfi).
    *   *Route :* `GET /api/v1/health/diagnostic`

### Jalon 2 : Identité, Sécurité & Notifications (Modules 02, 03, 04, 05)
*Priorité : Sortir des données mockées pour l'utilisateur et sécuriser les accès.*

- [ ] **Tâche 2.1 : Centre de Notifications Réel (03)**
    *   Remplacer les mocks de `MOCK_NOTIFICATIONS` par l'appel au backend et gérer le marquage "lu/non-lu".
    *   *Route :* `GET /api/v1/notifications`
- [ ] **Tâche 2.2 : Validation du flux Refresh Token (02)**
    *   Tester et stabiliser l'intercepteur Axios pour garantir que la session ne coupe pas après expiration du JWT.
    *   *Route :* `POST /api/v1/auth/refresh`
- [ ] **Tâche 2.3 : Pages de Détails Admin & Manager (04 & 05)**
    *   Créer les vues détaillées pour un Administrateur et un Fleet Manager (actuellement trop simplifiées).
    *   *Routes :* `GET /api/v1/admin/super/admins/{id}` et `GET /api/v1/admin/management/managers/{id}`

### Jalon 3 : Gestion Opérationnelle du Parc (Modules 08, 09, 10)
*Priorité : Permettre au Manager de manipuler ses ressources.*

- [ ] **Tâche 3.1 : Cycle de vie des Flottes (10b, 10c)**
    *   Ajouter les boutons "Retirer du parc" dans les tableaux pour détacher un véhicule ou un chauffeur d'une flotte.
    *   *Routes :* `DELETE /api/v1/fleets/{id}/vehicles/{vehicleId}` et `DELETE /api/v1/fleets/{id}/drivers/{driverId}`
- [ ] **Tâche 3.2 : Galerie d'images Véhicules (09b)**
    *   Finaliser l'UI pour l'ajout et la suppression des photos dans la galerie d'illustration (Relation 1-N).
    *   *Routes :* `POST /api/v1/vehicles/{id}/media/gallery` et `DELETE /.../gallery/{imageId}`
- [ ] **Tâche 3.3 : Recherche & Recrutement (08)**
    *   Activer la recherche réelle de chauffeurs par email/username pour le recrutement.
    *   *Route :* `GET /api/v1/drivers/search`

### Jalon 4 : Trajets & Geofencing (Modules 11 & 12)
*Priorité : Visualiser l'activité temps réel et l'historique.*

- [ ] **Tâche 4.1 : Historique des Trajets & Tracé Carte (11b)**
    *   Remplacer le tableau de trajets mocké par les données réelles.
    *   Implémenter la vue `trips/[id]` avec le tracé GPS historique sur la carte Leaflet.
    *   *Routes :* `GET /api/v1/trips` et `GET /api/v1/trips/{id}`
- [ ] **Tâche 4.2 : Gestionnaire d'Alertes Geofencing (12)**
    *   Créer une page "Historique des violations" filtrable par véhicule et par zone.
    *   *Route :* `GET /api/v1/geofence/alerts`
- [ ] **Tâche 4.3 : Édition des Zones (12)**
    *   Permettre la modification des paramètres d'une zone (nom, horaires, géométrie) directement depuis l'UI.
    *   *Route :* `PUT /api/v1/geofence/{type}/{id}`

### Jalon 5 : Finances & Finalisation (Module 13)
*Priorité : Clôturer l'intégration technique.*

- [ ] **Tâche 5.1 : Historique des Transactions (13)**
    *   Afficher la liste réelle des recharges et débits effectués sur le wallet.
- [ ] **Tâche 5.2 : Audit des accès (Middleware)**
    *   Vérification finale des protections de routes Next.js par rapport aux rôles retournés par le profil.

---
