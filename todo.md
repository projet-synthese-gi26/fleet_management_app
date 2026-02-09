### 1. Configuration d'Infrastructure & Types Globaux
- [x]Harmonisation de l' `api-client.ts` (URL du serveur de la collab + gestion des erreurs RFC 7807).
- [x] Configuration du Proxy dans `next.config.ts` pour éviter les erreurs CORS.
- [x] Création d'une énumération stricte des rôles (`FLEET_SUPER_ADMIN`, `FLEET_ADMIN`, etc.).
- [x] Nettoyage des types TypeScript de base pour correspondre aux UUIDs du backend.

### 2. Cœur de l'Authentification (AuthContext)
- [x] Branchement du flux `Login` avec stockage sécurisé des tokens.
- [x] Implémentation du `refresh-token` automatique sur les erreurs 401.
- [x] Synchronisation forcée du profil via `GET /me` (déclenche le "Self-Healing" côté backend).
- [x] Gestion de l'état `isLoading` global pour éviter les flashs de contenu non autorisé.

### 3. Routage Dynamique & Sécurité (RBAC)
- [x] Mise à jour du `middleware.ts` pour protéger les routes par rôle.
- [x] Adaptation de la `Sidebar.tsx` pour n'afficher que les menus autorisés.
- [x] Logique de redirection intelligente après connexion (Dashboard Admin vs Manager vs Driver).

### 4. Référentiels Souverains (Ressources Admin)
- [x] Création d'un hook `useResources` pour consommer `GET /vehicles/resources/all`.
- [x] Mapping des données de référence (Marques, Modèles, Carburants) pour les futurs formulaires.
- [x] Mise en cache locale (React Query ou simple state) pour éviter les appels redondants.

### 5. Module SuperAdmin (Gestion des Admins)
- [x] Listing des comptes `FLEET_ADMIN`.
- [x] Formulaire de création d'Admin (Multipart/JSON avec photo).
- [x] Action "Toggle Status" pour activer/bloquer un administrateur.

### 6. Module Admin (Gestion des Managers)
- [x] Listing global des `Fleet Managers` avec filtres de statut.
- [x] Vue détaillée d'un manager (Infos entreprise + Stats flottes).
- [x] Endpoint des Statistiques Globales du système pour le dashboard Admin.

### 7. Module Fleet Manager (Gestion des Flottes)
- [x] CRUD complet des Flottes (`fleets`).
- [x] Intégration des KPIs Manager (Total véhicules, chauffeurs actifs, km du jour).
- [x] Mise à jour des informations de l'entreprise (`companyName`).

### 8. Gestion du Parc (Véhicules & Médias)
- [x] Formulaire de création de véhicule utilisant les IDs des référentiels (Step 4).
- [x] Upload des documents administratifs (Photo VIN / Carte Grise) via Multipart.
- [x] Gestion de la galerie d'images d'illustration (Ajout/Suppression).
- [x] Vue "Opérationnelle" pour le suivi individuel (Fuel, Odomètre, Vitesse).

### 9. Gestion Humaine (Drivers & Assignations)
- [x] Inscription directe d'un nouveau chauffeur dans une flotte.
- [x] Moteur de recherche et recrutement de chauffeurs existants.
- [x] Logique d'assignation/libération de véhicule (avec gestion des conflits).

### 10. Opérations Live (Trips & Télémétrie)
- [x] Flux "Start Trip" pour les chauffeurs (vérification des pré-requis).
- [x] Boucle d'envoi de télémétrie GPS (toutes les 10-15s).
- [x] Flux "End Trip" avec résumé de la course (distance, temps).
- [x] Monitoring temps réel sur carte pour le Manager.

### 11. Moteur Spatial (Geofencing & Alertes)
- [x] Interface de dessin de zones (Cercles et Polygones).
- [x] Assignation des zones aux flottes (activation de la surveillance).
- [x] Centre de notifications pour les alertes de violation (Entrée/Sortie).

### 12. Module Financier (Payments)
- [ ] Initialisation du Wallet pour les nouveaux managers/drivers.
- [ ] Consultation du solde et historique des transactions.
- [ ] Simulation/Passerelle de recharge de compte.
