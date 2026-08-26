// ============================================================
// CONTENU & TRADUCTIONS — toutes les données du site sont ici.
// Pour modifier un projet, une expérience ou un texte, c'est l'endroit.
//
// ADAPTÉ À PARTIR DE VOTRE FICHIER. Ce qui a changé, et rien d'autre :
//   1. UI.nav.certifications   → nouveau (lien de navigation)
//   2. UI.projectDetail        → 4 clés ajoutées
//   3. UI.certifications       → 4 clés ajoutées
//   4. CATEGORY_ORDER          → nouvel export (ordre des filtres)
//   5. CERTIFICATIONS          → strings converties en objets (aucune retirée)
//   6. PROJECTS                → champ `link` + 1 projet ajouté (domaine/SSL)
//                                + 2 jeux renommés
//   7. hero.stats              → chiffres alignés sur le contenu réel
// Vos textes, vos 4 catégories, vos 4 covers, vos 8 groupes de
// compétences, vos expériences et votre formation : inchangés.
// ============================================================

export const PROFILE = {
  name: 'Junior Dokmegho Tefo',
  email: 'junior.tefo01@gmail.com',
  phone: '418-561-9642',
  github: 'https://github.com/archi-cyber',
  linkedin: 'https://linkedin.com/in/junior-tefo9',
}

// ============================================================
// ORDRE DES FILTRES DE PROJETS  ← NOUVEAU
// App.jsx s'en sert pour afficher les filtres dans un ordre stable
// plutôt que dans l'ordre d'apparition des projets dans le tableau.
// ============================================================

export const CATEGORY_ORDER = ['web-mobile', 'devops-cloud', 'self-hosted', 'desktop-games']

// ============================================================
// I18N — Interface
// ============================================================

export const UI = {
  fr: {
    nav: {
      about: 'À propos',
      experience: 'Expérience',
      projects: 'Projets',
      skills: 'Compétences',
      certifications: 'Formation', // ← NOUVEAU
      contact: 'Contact',
      cta: 'Discutons',
    },
    hero: {
      portfolio: 'Portfolio · 2026',
      role: 'Développeur Full-Stack & DevOps',
      location: 'Québec, Canada',
      availability: 'Ouvert aux opportunités',
      tagline:
        "Quatre ans à construire des applications web et mobiles de bout en bout, du React au déploiement Kubernetes. Une passion pour le DevOps, l'automatisation et l'infrastructure cloud.",
      labelRole: 'Rôle',
      labelLocation: 'Localisation',
      labelAvailability: 'Disponibilité',
      scroll: 'Défiler',
      stats: [
        { value: '4+', label: "Années d'expérience" },
        { value: '18', label: 'Projets livrés' },   // ← 18 projets réels dans le tableau
        { value: '12', label: 'Certifications' },   // ← 12 entrées réelles
        { value: '2', label: 'Langues' },
      ],
    },
    about: {
      number: '01 / À propos',
      titleA: 'Le profil',
      titleB: 'en bref.',
      p1: "Plus de quatre ans à construire des applications web et mobiles, du frontend au déploiement en production. Je travaille principalement avec ",
      p1bold: "React, Next.js, React Native, Node.js, C#",
      p1end: " et ",
      p1end2: "Python",
      p1period: ".",
      p2: "J'ai développé une vraie passion pour le DevOps : monter des pipelines CI/CD, conteneuriser avec Docker, orchestrer avec Kubernetes, automatiser l'infra avec Terraform.",
      p3: "Une base solide en réseaux et télécoms me permet de comprendre les problématiques d'infrastructure de bout en bout — du paquet réseau jusqu'à l'utilisateur final.",
      languages: 'Français (langue maternelle) · Anglais (bilingue professionnel)',
    },
    experience: {
      number: '02 / Expérience',
      titleA: 'Parcours',
      titleB: 'professionnel.',
    },
    projects: {
      number: '03 / Projets',
      titleA: 'Travaux',
      titleB: 'sélectionnés.',
      all: 'Tous',
      featured: '★ Phare',
      shown: (n) => `${n} projet${n > 1 ? 's' : ''} affiché${n > 1 ? 's' : ''}`,
      viewAll: 'Voir tous les dépôts sur GitHub →',
      viewDetails: 'Voir le projet',
    },
    projectDetail: {
      back: '← Retour au portfolio',
      year: 'Année',
      role: 'Rôle',
      category: 'Catégorie',
      highlights: 'Points forts',
      stack: 'Stack technique',
      otherProjects: 'Autres projets',
      overview: "Vue d'ensemble",                             // ← NOUVEAU
      viewLive: 'Voir en ligne',                              // ← NOUVEAU
      notFound: "Ce projet n'existe pas ou a été renommé.",   // ← NOUVEAU
      techWord: (n) => (n > 1 ? 'technos' : 'techno'),        // ← NOUVEAU
    },
    skills: {
      number: '04 / Compétences',
      titleA: 'Le',
      titleB: 'toolkit.',
    },
    certifications: {
      number: '05 / Formation',
      titleA: 'Apprentissage',
      titleB: 'continu.',
      education: 'Formation académique',
      certs: 'Certifications',
      countLabel: 'certifications et formations complétées', // ← NOUVEAU
      singular: 'certification',                             // ← NOUVEAU
      plural: 'certifications',                              // ← NOUVEAU
      status: {                                              // ← NOUVEAU
        done: 'Obtenue',
        inProgress: 'En cours',
      },
    },
    contact: {
      number: '06 / Contact',
      titleA: 'Une idée',
      titleB: 'un projet',
      titleC: 'une équipe ?',
      body: "Je suis ouvert aux opportunités, freelance comme temps plein. Écrivez-moi directement — je réponds toujours.",
      emailLabel: 'Courriel',
      phoneLabel: 'Téléphone',
    },
    footer: {
      built: 'Conçu & développé à Québec',
    },
    categories: {
      'web-mobile': 'Apps Web & Mobile',
      'devops-cloud': 'DevOps & Cloud',
      'self-hosted': 'Self-hosted & Infra',
      'desktop-games': 'Desktop & Jeux',
    },
    skillGroups: {
      languages: 'Langages',
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Bases de données',
      devops: 'DevOps & CI/CD',
      cloud: 'Cloud',
      monitoring: 'Monitoring',
      network: 'Réseaux & Télécoms',
    },
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      certifications: 'Education', // ← NOUVEAU
      contact: 'Contact',
      cta: "Let's talk",
    },
    hero: {
      portfolio: 'Portfolio · 2026',
      role: 'Full-Stack & DevOps Developer',
      location: 'Quebec, Canada',
      availability: 'Open to opportunities',
      tagline:
        'Four years building web and mobile applications end-to-end, from React to Kubernetes deployments. Passionate about DevOps, automation and cloud infrastructure.',
      labelRole: 'Role',
      labelLocation: 'Location',
      labelAvailability: 'Availability',
      scroll: 'Scroll',
      stats: [
        { value: '4+', label: 'Years of experience' },
        { value: '18', label: 'Projects shipped' },
        { value: '12', label: 'Certifications' },
        { value: '2', label: 'Languages' },
      ],
    },
    about: {
      number: '01 / About',
      titleA: 'The profile',
      titleB: 'in brief.',
      p1: 'Over four years building web and mobile applications, from frontend to production deployment. I primarily work with ',
      p1bold: 'React, Next.js, React Native, Node.js, C#',
      p1end: ' and ',
      p1end2: 'Python',
      p1period: '.',
      p2: "I've developed a real passion for DevOps: building CI/CD pipelines, containerizing with Docker, orchestrating with Kubernetes, automating infrastructure with Terraform.",
      p3: 'A solid foundation in networking and telecoms allows me to understand infrastructure challenges end-to-end — from network packet to end user.',
      languages: 'French (native) · English (professional bilingual)',
    },
    experience: {
      number: '02 / Experience',
      titleA: 'Professional',
      titleB: 'journey.',
    },
    projects: {
      number: '03 / Projects',
      titleA: 'Selected',
      titleB: 'work.',
      all: 'All',
      featured: '★ Featured',
      shown: (n) => `${n} project${n > 1 ? 's' : ''} shown`,
      viewAll: 'Browse all repos on GitHub →',
      viewDetails: 'View project',
    },
    projectDetail: {
      back: '← Back to portfolio',
      year: 'Year',
      role: 'Role',
      category: 'Category',
      highlights: 'Highlights',
      stack: 'Tech stack',
      otherProjects: 'Other projects',
      overview: 'Overview',                                         // ← NOUVEAU
      viewLive: 'View live',                                        // ← NOUVEAU
      notFound: 'This project does not exist or has been renamed.', // ← NOUVEAU
      techWord: (n) => (n > 1 ? 'techs' : 'tech'),                  // ← NOUVEAU
    },
    skills: {
      number: '04 / Skills',
      titleA: 'The',
      titleB: 'toolkit.',
    },
    certifications: {
      number: '05 / Education',
      titleA: 'Continuous',
      titleB: 'learning.',
      education: 'Academic background',
      certs: 'Certifications',
      countLabel: 'certifications and training completed', // ← NOUVEAU
      singular: 'certification',                           // ← NOUVEAU
      plural: 'certifications',                            // ← NOUVEAU
      status: {                                            // ← NOUVEAU
        done: 'Earned',
        inProgress: 'In progress',
      },
    },
    contact: {
      number: '06 / Contact',
      titleA: 'An idea',
      titleB: 'a project',
      titleC: 'a team?',
      body: "I'm open to opportunities, freelance or full-time. Write to me directly — I always reply.",
      emailLabel: 'Email',
      phoneLabel: 'Phone',
    },
    footer: {
      built: 'Designed & built in Quebec',
    },
    categories: {
      'web-mobile': 'Web & Mobile Apps',
      'devops-cloud': 'DevOps & Cloud',
      'self-hosted': 'Self-hosted & Infra',
      'desktop-games': 'Desktop & Games',
    },
    skillGroups: {
      languages: 'Languages',
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Databases',
      devops: 'DevOps & CI/CD',
      cloud: 'Cloud',
      monitoring: 'Monitoring',
      network: 'Networking & Telecoms',
    },
  },
}

// ============================================================
// EXPÉRIENCES PROFESSIONNELLES — inchangées
// ============================================================

export const EXPERIENCES = [
  {
    period: '2023 — Présent',
    periodEn: '2023 — Present',
    location: { fr: 'Freelance — à distance', en: 'Freelance — remote' },
    role: { fr: 'DevOps Technical Lead', en: 'DevOps Technical Lead' },
    company: 'Spe.store SARL',
    points: {
      fr: [
        "Chaîne DevOps complète : de l'intégration continue jusqu'au déploiement en production.",
        "Stack d'observabilité avec ELK (Elasticsearch, Logstash, Kibana), Prometheus et Grafana.",
        "Tableaux de bord Grafana personnalisés pour latence API, taux d'erreur et utilisation CPU/mémoire.",
        "Conteneurisation des microservices avec Docker et orchestration sur Kubernetes.",
        "Provisionnement d'infrastructure avec Terraform, configuration avec Ansible.",
        "Pipelines GitHub Actions : build, tests, analyse statique, déploiement blue-green.",
      ],
      en: [
        'Complete DevOps chain: from continuous integration to production deployment.',
        'Observability stack with ELK (Elasticsearch, Logstash, Kibana), Prometheus and Grafana.',
        'Custom Grafana dashboards for API latency, error rates and CPU/memory usage.',
        'Microservices containerization with Docker and orchestration on Kubernetes.',
        'Infrastructure provisioning with Terraform, configuration with Ansible.',
        'GitHub Actions pipelines: build, tests, static analysis, blue-green deployment.',
      ],
    },
  },
  {
    period: '2025 — 2026',
    periodEn: '2025 — 2026',
    location: { fr: 'Québec, QC', en: 'Quebec City, QC' },
    role: { fr: 'Développeur Full-Stack / DevOps', en: 'Full-Stack / DevOps Developer' },
    company: 'Rampex Gardex',
    points: {
      fr: [
        "Conception et développement de A à Z d'une application de gestion métier (React/Next.js + Node.js/Express + SQL Server).",
        "Optimisation des requêtes SQL : certaines sont passées de 8 s à moins d'une seconde.",
        'Pipeline CI/CD complet sur GitLab CI : tests, lint ESLint et déploiement automatique sur staging.',
        'Conteneurisation Docker, reverse proxy Nginx avec HTTPS, authentification JWT et gestion des rôles.',
        'Sécurisation : CORS, validation des entrées, prévention SQL injection et XSS.',
        'Méthode Scrum : sprints, daily standups, revues de code, rétros.',
      ],
      en: [
        'End-to-end design and development of a business management application (React/Next.js + Node.js/Express + SQL Server).',
        'SQL query optimization: some went from 8s to under one second.',
        'Full GitLab CI/CD pipeline: tests, ESLint linting, automatic staging deployment.',
        'Docker containerization, Nginx reverse proxy with HTTPS, JWT authentication and role management.',
        'Security: CORS, input validation, SQL injection and XSS prevention.',
        'Scrum methodology: sprints, daily standups, code reviews, retros.',
      ],
    },
  },
  {
    period: '2021 — 2022',
    periodEn: '2021 — 2022',
    location: { fr: 'Yaoundé, Cameroun', en: 'Yaoundé, Cameroon' },
    role: { fr: 'Ingénieur Télécoms & Développeur', en: 'Telecom Engineer & Developer' },
    company: 'Lucioles',
    points: {
      fr: [
        "Développement complet de l'app mobile Spe.store en Flutter (disponible sur App Store et Play Store).",
        'Pipelines de build et déploiement avec Jenkins et GitLab CI : commit → prod réduit de 45 min à 12 min.',
        'API REST : authentification, catalogue produits, gestion des commandes et notifications push.',
        'Sites web responsifs avec back-end Node.js et MySQL.',
        'Administration réseau radio (WiMax, WiFi, Nanostations), planification couverture avec Atoll.',
        'Maintenance parc informatique (~30 postes), formation des utilisateurs.',
      ],
      en: [
        'Full development of the Spe.store mobile app in Flutter (available on App Store and Play Store).',
        'Build and deployment pipelines with Jenkins and GitLab CI: commit → prod time cut from 45min to 12min.',
        'REST API: authentication, product catalog, order management and push notifications.',
        'Responsive websites with Node.js back-end and MySQL.',
        'Radio network administration (WiMax, WiFi, Nanostations), coverage planning with Atoll.',
        'IT fleet maintenance (~30 stations), user training.',
      ],
    },
  },
  {
    period: '2018 — 2021',
    periodEn: '2018 — 2021',
    location: { fr: 'Yaoundé, Cameroun', en: 'Yaoundé, Cameroon' },
    role: { fr: 'Développeur & Administrateur Réseau', en: 'Developer & Network Administrator' },
    company: 'Matrix Télécoms',
    points: {
      fr: [
        "Outil interne de planification et d'optimisation réseau utilisé par les techniciens terrain.",
        'Application de suivi des interventions avec Microsoft Power Apps.',
        "Déploiement d'infrastructures réseau : pfSense, fibre optique, Mikrotik, VLANs, switches managés.",
        'Installation et configuration des Nanostations M2/M3/M5.',
        'Réseau local et téléphonique complet pour deux sites (câblage structuré, PABX).',
        'Scripts Shell/Bash pour automatiser sauvegardes, monitoring de bande passante, redémarrages.',
      ],
      en: [
        'Internal network planning and optimization tool used by field technicians.',
        'Intervention tracking app with Microsoft Power Apps.',
        'Network infrastructure deployment: pfSense, fiber optics, Mikrotik, VLANs, managed switches.',
        'Installation and configuration of Nanostations M2/M3/M5.',
        'Complete local and phone network for two sites (structured cabling, PABX).',
        'Shell/Bash scripts to automate backups, bandwidth monitoring, restarts.',
      ],
    },
  },
]

// ============================================================
// PROJETS — 18
//
// ← AJOUT : champ `link` sur chaque projet.
//   Laissez '' si vous n'avez pas encore de lien. Dès qu'il est rempli,
//   un bouton « Voir en ligne » apparaît sur la page de détail.
//   C'est le champ le plus important du fichier : un recruteur technique
//   clique toujours avant d'appeler.
// ============================================================

export const PROJECTS = [
  // ----- Apps Web & Mobile -----
  {
    id: 'spe-store',
    category: 'web-mobile',
    title: 'Spe.store',
    year: '2021-2022',
    role: { fr: 'Lead Developer', en: 'Lead Developer' },
    cover: 'warm',
    icon: '🛒',
    featured: true,
    link: '', // ← App Store ou Play Store : à remplir en priorité absolue
    stack: ['Flutter', 'Node.js', 'MySQL', 'REST API', 'Firebase'],
    description: {
      fr: "Application e-commerce mobile complète en Flutter, publiée sur l'App Store et le Play Store avec des centaines de téléchargements.",
      en: 'Complete mobile e-commerce application in Flutter, published on App Store and Play Store with hundreds of downloads.',
    },
    longDescription: {
      fr: "Spe.store est mon plus grand projet personnel : une application d'achat en ligne développée intégralement en Flutter pour iOS et Android, soutenue par une API REST Node.js et une base de données MySQL.\n\nJ'ai conçu l'architecture complète de l'application — depuis le catalogue produits jusqu'au système de notifications push, en passant par la gestion des commandes et l'authentification utilisateur. La pipeline de déploiement a été optimisée pour que le temps entre un commit et la mise en production passe de 45 minutes à 12 minutes.",
      en: 'Spe.store is my biggest personal project: an online shopping app built entirely in Flutter for iOS and Android, backed by a Node.js REST API and MySQL database.\n\nI designed the complete architecture — from product catalog to push notification system, including order management and user authentication. The deployment pipeline was optimized to bring commit-to-prod time from 45 minutes to 12 minutes.',
    },
    highlights: {
      fr: [
        "Disponible sur l'App Store et le Play Store",
        'Plusieurs centaines de téléchargements',
        'Pipeline CI/CD réduit de 45 min à 12 min',
        'API REST robuste avec authentification, catalogue et notifications push',
      ],
      en: [
        'Available on App Store and Play Store',
        'Several hundred downloads',
        'CI/CD pipeline reduced from 45min to 12min',
        'Robust REST API with auth, catalog and push notifications',
      ],
    },
  },
  {
    id: 'rampex-metier',
    category: 'web-mobile',
    title: 'Rampex — Gestion métier',
    year: '2025-2026',
    role: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
    cover: 'warm',
    icon: '⚙️',
    featured: true,
    link: '',
    stack: ['React', 'Next.js', 'Node.js', 'SQL Server', 'Docker', 'GitLab CI'],
    description: {
      fr: 'Application de gestion métier livrée en production : React/Next.js en front, Node.js/Express en back, SQL Server en BD.',
      en: 'Business management application shipped to production: React/Next.js frontend, Node.js/Express backend, SQL Server database.',
    },
    longDescription: {
      fr: "Application complète de gestion métier conçue et développée de A à Z pour Rampex Gardex à Québec. Mission : remplacer un système legacy par une solution moderne, performante et sécurisée.\n\nJ'ai créé les modèles de données, écrit les requêtes SQL optimisées (certaines sont passées de 8 secondes à moins d'une seconde), mis en place le pipeline CI/CD complet sur GitLab et conteneurisé toute l'application avec Docker. Les utilisateurs finaux interagissent avec l'application tous les jours depuis le déploiement.",
      en: 'Complete business management application designed and built from scratch for Rampex Gardex in Quebec City. Mission: replace a legacy system with a modern, performant and secure solution.\n\nI created the data models, wrote optimized SQL queries (some went from 8 seconds to under one second), set up the complete CI/CD pipeline on GitLab and containerized the whole app with Docker. End users interact with the app daily since deployment.',
    },
    highlights: {
      fr: [
        'Requêtes SQL optimisées : 8s → <1s',
        'Pipeline GitLab CI complet avec déploiement automatique',
        'Authentification JWT avec gestion des rôles (admin, gestionnaire, employé)',
        'Sécurisée : CORS, validation, prévention SQL injection et XSS',
        'Documentation technique et guides utilisateur complets',
      ],
      en: [
        'Optimized SQL queries: 8s → <1s',
        'Complete GitLab CI pipeline with automatic deployment',
        'JWT auth with role management (admin, manager, employee)',
        'Secured: CORS, validation, SQL injection and XSS prevention',
        'Complete technical documentation and user guides',
      ],
    },
  },
  {
    id: 'ecommerce-python',
    category: 'web-mobile',
    title: 'Plateforme e-commerce Python',
    year: '2022',
    role: { fr: 'Développeur Backend', en: 'Backend Developer' },
    cover: 'warm',
    icon: '🛍️',
    link: '',
    stack: ['Python', 'Django', 'PostgreSQL'],
    description: {
      fr: 'Boutique en ligne en Python avec panier, catalogue, gestion de stock et paiement.',
      en: 'Online store in Python with cart, catalog, inventory management and payment.',
    },
    longDescription: {
      fr: "Plateforme e-commerce développée en Python pour explorer en profondeur la logique backend de bout en bout. Inclut un système de panier, un catalogue avec recherche et filtres, une gestion d'inventaire et l'intégration d'un système de paiement.",
      en: 'E-commerce platform built in Python to deeply explore end-to-end backend logic. Includes cart system, catalog with search and filters, inventory management and payment system integration.',
    },
    highlights: {
      fr: ['Panier persistant', 'Catalogue avec filtres', 'Gestion de stock', 'Intégration paiement'],
      en: ['Persistent cart', 'Filterable catalog', 'Inventory management', 'Payment integration'],
    },
  },
  {
    id: 'android-shop',
    category: 'web-mobile',
    title: "App mobile d'achat Android",
    year: '2020',
    role: { fr: 'Développeur Mobile', en: 'Mobile Developer' },
    cover: 'warm',
    icon: '📱',
    link: '',
    stack: ['Android', 'Java', 'MySQL'],
    description: {
      fr: 'Application Android native avec MySQL intégré, panier et gestion des comptes utilisateurs.',
      en: 'Native Android application with embedded MySQL, cart and user account management.',
    },
    longDescription: {
      fr: "Application Android native développée en Java avec une base de données MySQL. Premier vrai projet mobile, qui m'a permis d'approfondir la conception d'interfaces tactiles et la persistance locale.",
      en: 'Native Android app built in Java with a MySQL database. My first real mobile project, which helped me dive deep into touch interface design and local persistence.',
    },
    highlights: {
      fr: ['UI native Android', 'BD MySQL intégrée', 'Gestion des comptes', 'Panier'],
      en: ['Native Android UI', 'Embedded MySQL DB', 'Account management', 'Shopping cart'],
    },
  },

  // ----- DevOps & Cloud -----
  {
    id: 'aws-terraform',
    category: 'devops-cloud',
    title: 'Infrastructure AWS — Terraform',
    year: '2023',
    role: { fr: 'DevOps Engineer', en: 'DevOps Engineer' },
    cover: 'fire',
    icon: '☁️',
    featured: true,
    link: '',
    stack: ['AWS', 'Terraform', 'PostgreSQL', 'Prometheus', 'Grafana'],
    description: {
      fr: 'Infrastructure AWS complète provisionnée en Terraform : VPC, ALB, Auto Scaling, RDS PostgreSQL.',
      en: 'Complete AWS infrastructure provisioned via Terraform: VPC, ALB, Auto Scaling, RDS PostgreSQL.',
    },
    longDescription: {
      fr: "Infrastructure AWS complète montée intégralement en Terraform, suivant les principes d'Infrastructure-as-Code. Le tout est versionné, reproductible et déployable en quelques minutes.\n\nL'environnement comprend un VPC sécurisé avec sous-réseaux publics et privés, un Application Load Balancer, des Auto Scaling Groups pour gérer la charge, et une base de données RDS PostgreSQL en haute disponibilité. Le monitoring est assuré par une stack Prometheus + Grafana déployée en parallèle.",
      en: 'Complete AWS infrastructure built entirely in Terraform, following Infrastructure-as-Code principles. Everything is versioned, reproducible and deployable in minutes.\n\nThe environment includes a secured VPC with public and private subnets, an Application Load Balancer, Auto Scaling Groups to handle load, and a highly available RDS PostgreSQL database. Monitoring is provided by a Prometheus + Grafana stack deployed in parallel.',
    },
    highlights: {
      fr: [
        'Infrastructure entièrement versionnée en code',
        'VPC sécurisé avec segmentation publique/privée',
        'Auto Scaling pour gestion automatique de la charge',
        'RDS PostgreSQL en haute disponibilité',
        'Monitoring Prometheus + Grafana intégré',
      ],
      en: [
        'Infrastructure fully versioned as code',
        'Secured VPC with public/private segmentation',
        'Auto Scaling for automatic load handling',
        'High-availability RDS PostgreSQL',
        'Integrated Prometheus + Grafana monitoring',
      ],
    },
  },
  {
    id: 'microservices-api',
    category: 'devops-cloud',
    title: 'API Microservices',
    year: '2023',
    role: { fr: 'Architecte & Développeur', en: 'Architect & Developer' },
    cover: 'fire',
    icon: '🔌',
    featured: true,
    link: '',
    stack: ['Node.js', 'MongoDB', 'RabbitMQ', 'Docker', 'Jest', 'Swagger'],
    description: {
      fr: 'Architecture microservices avec Node.js, MongoDB et RabbitMQ. Auth JWT, doc Swagger, tests Jest.',
      en: 'Microservices architecture with Node.js, MongoDB and RabbitMQ. JWT auth, Swagger docs, Jest tests.',
    },
    longDescription: {
      fr: "Architecture microservices construite autour de Node.js et MongoDB, avec RabbitMQ comme bus de messages pour la communication asynchrone entre services. Chaque service est conteneurisé avec Docker, documenté via Swagger et testé avec Jest.\n\nL'authentification est centralisée via JSON Web Tokens, et chaque microservice gère ses propres données dans une instance MongoDB dédiée.",
      en: 'Microservices architecture built around Node.js and MongoDB, with RabbitMQ as the message bus for async communication between services. Each service is containerized with Docker, documented via Swagger and tested with Jest.\n\nAuthentication is centralized via JSON Web Tokens, and each microservice manages its own data in a dedicated MongoDB instance.',
    },
    highlights: {
      fr: [
        'Architecture découplée avec RabbitMQ',
        'Authentification JWT centralisée',
        'Documentation interactive Swagger',
        'Tests unitaires Jest sur chaque service',
        'Déploiement Docker reproductible',
      ],
      en: [
        'Decoupled architecture with RabbitMQ',
        'Centralized JWT authentication',
        'Interactive Swagger documentation',
        'Jest unit tests on every service',
        'Reproducible Docker deployment',
      ],
    },
  },
  {
    id: 'monitoring-stack',
    category: 'devops-cloud',
    title: 'Stack de monitoring complète',
    year: '2023',
    role: { fr: 'DevOps Engineer', en: 'DevOps Engineer' },
    cover: 'fire',
    icon: '📊',
    link: '',
    stack: ['ELK', 'Prometheus', 'Grafana', 'Docker', 'Alertmanager'],
    description: {
      fr: 'Stack complète pour surveiller applications conteneurisées : ELK pour les logs, Prometheus + Grafana pour les métriques.',
      en: 'Complete stack for monitoring containerized apps: ELK for logs, Prometheus + Grafana for metrics.',
    },
    longDescription: {
      fr: "Plateforme d'observabilité complète comprenant la centralisation des logs (ELK : Elasticsearch + Logstash + Kibana), la collecte de métriques (Prometheus) et la visualisation (Grafana). Des alertes Alertmanager sont configurées pour notifier l'équipe dès qu'un service dégrade ses performances.\n\nLa partie la plus délicate n'est pas la collecte mais le réglage des alertes : une alerte qui se déclenche trop souvent finit ignorée, donc les seuils et les fenêtres sont calibrés pour ne signaler que les dégradations réelles.",
      en: 'Complete observability platform with centralized logging (ELK: Elasticsearch + Logstash + Kibana), metrics collection (Prometheus) and visualization (Grafana). Alertmanager rules notify the team as soon as a service degrades.\n\nThe trickiest part is not collection but alert tuning: an alert that fires too often ends up ignored, so thresholds and windows are calibrated to flag only genuine degradation.',
    },
    highlights: {
      fr: ['Logs centralisés ELK', 'Métriques Prometheus', 'Dashboards Grafana custom', 'Alertes calibrées sans bruit'],
      en: ['Centralized ELK logs', 'Prometheus metrics', 'Custom Grafana dashboards', 'Noise-free tuned alerts'],
    },
  },
  {
    id: 'gitops-pipeline',
    category: 'devops-cloud',
    title: 'Pipeline CI/CD GitOps',
    year: '2024',
    role: { fr: 'DevOps Engineer', en: 'DevOps Engineer' },
    cover: 'fire',
    icon: '🔄',
    link: '',
    stack: ['GitOps', 'ArgoCD', 'Kubernetes', 'GitHub Actions'],
    description: {
      fr: 'Pipeline de livraison continue selon les principes GitOps : déclaratif, versionné, automatisé.',
      en: 'Continuous delivery pipeline following GitOps principles: declarative, versioned, automated.',
    },
    longDescription: {
      fr: "Mise en place d'un pipeline GitOps complet où Git est la source unique de vérité. Les changements de configuration sont validés via Pull Request, et ArgoCD synchronise automatiquement le cluster Kubernetes avec l'état désiré décrit dans le repo.\n\nLa conséquence pratique est importante : plus personne ne déploie à la main. Chaque déploiement est revu, tracé et réversible par un simple revert.",
      en: 'Complete GitOps pipeline where Git is the single source of truth. Config changes are validated via Pull Request, and ArgoCD automatically syncs the Kubernetes cluster with the desired state described in the repo.\n\nThe practical consequence matters: nobody deploys by hand anymore. Every deployment is reviewed, traced and reversible with a simple revert.',
    },
    highlights: {
      fr: ['Git comme source de vérité', 'Synchronisation ArgoCD', 'Rollback simple via revert', 'Audit complet'],
      en: ['Git as source of truth', 'ArgoCD sync', 'Simple rollback via revert', 'Full audit trail'],
    },
  },
  {
    id: 'k8s-nginx',
    category: 'devops-cloud',
    title: 'Cluster Kubernetes — Nginx',
    year: '2023',
    role: { fr: 'DevOps', en: 'DevOps' },
    cover: 'fire',
    icon: '🐳',
    link: '',
    stack: ['Kubernetes', 'Minikube', 'Nginx', 'HPA'],
    description: {
      fr: "Déploiement Nginx sur Kubernetes/Minikube avec Deployments, Services, Ingress et HPA pour l'auto-scaling.",
      en: 'Nginx deployment on Kubernetes/Minikube with Deployments, Services, Ingress and HPA for auto-scaling.',
    },
    longDescription: {
      fr: "Cluster Kubernetes local (Minikube) hébergeant un serveur Nginx avec configuration production-grade. Deployments avec health checks, Services pour l'exposition, Ingress pour le routage et Horizontal Pod Autoscaler pour adapter automatiquement les ressources à la charge.",
      en: 'Local Kubernetes cluster (Minikube) hosting an Nginx server with production-grade config. Deployments with health checks, Services for exposure, Ingress for routing and Horizontal Pod Autoscaler for automatic load adaptation.',
    },
    highlights: {
      fr: ['Deployments avec health checks', 'Ingress configuré', 'Auto-scaling HPA', 'Configuration prod-grade'],
      en: ['Deployments with health checks', 'Configured Ingress', 'HPA auto-scaling', 'Production-grade config'],
    },
  },

  // ----- Self-hosted & Infra -----
  {
    id: 'llama-local',
    category: 'self-hosted',
    title: 'IA générative locale — LLaMA',
    year: '2024',
    role: { fr: 'ML Engineer', en: 'ML Engineer' },
    cover: 'forest',
    icon: '🤖',
    featured: true,
    link: '',
    stack: ['LLaMA', 'Python', 'GPU', 'Web UI', 'PyTorch'],
    description: {
      fr: "Déploiement d'une IA générative en local : gestion GPU, modèles open source LLaMA et interface web maison.",
      en: 'Local deployment of a generative AI: GPU management, open source LLaMA models and custom web UI.',
    },
    longDescription: {
      fr: "Installation et déploiement d'une IA générative complète en local, sans dépendance cloud. Le projet inclut la configuration du GPU pour l'inférence, l'utilisation des modèles open source LLaMA, et une interface web maison pour interagir avec le modèle. Une exploration approfondie qui m'a permis de comprendre concrètement comment fonctionnent les LLMs en production.",
      en: 'Installation and deployment of a complete generative AI locally, with no cloud dependency. The project includes GPU configuration for inference, use of open source LLaMA models, and a custom web UI to interact with the model. A deep dive that gave me a concrete understanding of how LLMs work in production.',
    },
    highlights: {
      fr: [
        '100 % local, zéro dépendance cloud',
        "Configuration GPU optimisée pour l'inférence",
        'Modèles open source LLaMA',
        'Interface web maison',
      ],
      en: [
        '100% local, zero cloud dependency',
        'GPU configuration optimized for inference',
        'Open source LLaMA models',
        'Custom web UI',
      ],
    },
  },
  {
    id: 'nextcloud-proxmox',
    category: 'self-hosted',
    title: 'Cloud privé Nextcloud',
    year: '2023',
    role: { fr: 'Sysadmin', en: 'Sysadmin' },
    cover: 'forest',
    icon: '☁️',
    link: '',
    stack: ['Nextcloud', 'Proxmox', 'Linux', 'Docker'],
    description: {
      fr: 'Cloud personnel monté avec Nextcloud sur Proxmox VE. Plusieurs VMs accessibles à distance.',
      en: 'Personal cloud built with Nextcloud on Proxmox VE. Multiple VMs accessible remotely.',
    },
    longDescription: {
      fr: 'Infrastructure cloud personnelle complète hébergée à la maison. Proxmox VE comme hyperviseur, Nextcloud comme alternative auto-hébergée à Dropbox/Google Drive, et plusieurs VMs Linux pour mes labs et expérimentations. Le tout accessible à distance de manière sécurisée.',
      en: 'Complete personal cloud infrastructure hosted at home. Proxmox VE as hypervisor, Nextcloud as a self-hosted alternative to Dropbox/Google Drive, and several Linux VMs for my labs and experiments. All accessible remotely in a secure way.',
    },
    highlights: {
      fr: ['Hyperviseur Proxmox VE', 'Nextcloud auto-hébergé', 'Plusieurs VMs Linux', 'Accès distant sécurisé'],
      en: ['Proxmox VE hypervisor', 'Self-hosted Nextcloud', 'Multiple Linux VMs', 'Secured remote access'],
    },
  },
  {
    id: 'adguard-dns',
    category: 'self-hosted',
    title: 'Filtrage DNS — AdGuard',
    year: '2023',
    role: { fr: 'Sysadmin', en: 'Sysadmin' },
    cover: 'forest',
    icon: '🛡️',
    link: '',
    stack: ['AdGuard', 'DNS', 'Linux', 'Network'],
    description: {
      fr: 'Serveur de filtrage DNS pour bloquer publicités et trackers sur tout le réseau local.',
      en: 'DNS filtering server to block ads and trackers across the entire local network.',
    },
    longDescription: {
      fr: 'Serveur AdGuard Home déployé sur le réseau local pour filtrer publicités et trackers au niveau DNS. Bénéfice direct : chaque appareil connecté au réseau (téléphone, ordinateur, TV) profite automatiquement de la protection, sans configuration individuelle.',
      en: 'AdGuard Home server deployed on the local network to filter ads and trackers at the DNS level. Direct benefit: every device on the network (phone, computer, TV) automatically gets protection, without per-device config.',
    },
    highlights: {
      fr: ['Filtrage au niveau DNS', 'Protection automatique tous appareils', 'Statistiques détaillées', 'Personnalisable'],
      en: ['DNS-level filtering', 'Automatic protection for all devices', 'Detailed statistics', 'Customizable'],
    },
  },

  // ← NOUVEAU : le seul projet de votre liste de 18 qui manquait dans data.js
  {
    id: 'domaine-ssl',
    category: 'self-hosted',
    title: 'Déploiement domaine, DNS & SSL',
    year: '2024',
    role: { fr: 'Sysadmin & Déploiement', en: 'Sysadmin & Deployment' },
    cover: 'forest',
    icon: '🔒',
    link: '',
    stack: ['DNS', 'SSL/TLS', 'Nginx', 'GoDaddy', 'Hébergement'],
    description: {
      fr: "Mise en ligne d'un site de bout en bout : achat du domaine, configuration DNS, certificat SSL et hébergement.",
      en: 'End-to-end site deployment: domain purchase, DNS configuration, SSL certificate and hosting.',
    },
    longDescription: {
      fr: "Déploiement complet d'un site web, de l'achat du nom de domaine sur GoDaddy jusqu'à la bascule en production : configuration des enregistrements DNS (A, CNAME, MX), émission et installation du certificat SSL/TLS, configuration du serveur web et vérification de la propagation.\n\nProjet volontairement simple, mais c'est exactement le geste que beaucoup de développeurs ne savent pas poser seuls. Comprendre pourquoi un certificat refuse de s'installer ou pourquoi un enregistrement DNS ne propage pas évite des heures de blocage — et c'est ce qui fait la différence quand un site tombe un vendredi soir.",
      en: "Complete deployment of a website, from buying the domain name on GoDaddy to the production cutover: DNS record configuration (A, CNAME, MX), SSL/TLS certificate issuance and installation, web server configuration and propagation checks.\n\nA deliberately simple project, but it's exactly the step many developers can't take on their own. Understanding why a certificate refuses to install, or why a DNS record isn't propagating, saves hours of being stuck — and it's what makes the difference when a site goes down on a Friday night.",
    },
    highlights: {
      fr: [
        'Achat du domaine et configuration DNS complète',
        'Émission, installation et renouvellement du certificat SSL/TLS',
        'Configuration Nginx et redirections HTTP → HTTPS',
        'Vérification de la propagation DNS',
      ],
      en: [
        'Domain purchase and complete DNS configuration',
        'SSL/TLS certificate issuance, installation and renewal',
        'Nginx configuration and HTTP → HTTPS redirects',
        'DNS propagation verification',
      ],
    },
  },

  // ----- Desktop & Jeux -----
  {
    id: 'dotnet-clients',
    category: 'desktop-games',
    title: 'Gestion clients .NET',
    year: '2020',
    role: { fr: 'Développeur Desktop', en: 'Desktop Developer' },
    cover: 'plum',
    icon: '👥',
    link: '',
    stack: ['C#', '.NET', 'SQL', 'WinForms'],
    description: {
      fr: 'Système de gestion en C#/.NET avec tableau de bord, filtres de recherche et export CSV/PDF.',
      en: 'Management system in C#/.NET with dashboard, search filters and CSV/PDF export.',
    },
    longDescription: {
      fr: "Application desktop de gestion de clients développée en C# / .NET. Tableau de bord avec indicateurs clés, recherche avancée multi-critères, et export des données en CSV et PDF pour rapports.",
      en: 'Desktop client management application built in C# / .NET. Dashboard with key indicators, advanced multi-criteria search, and CSV/PDF data export for reports.',
    },
    highlights: {
      fr: ['Tableau de bord avec KPIs', 'Recherche multi-critères', 'Export CSV et PDF', 'Interface WinForms'],
      en: ['Dashboard with KPIs', 'Multi-criteria search', 'CSV and PDF export', 'WinForms interface'],
    },
  },
  {
    id: 'java-employees',
    category: 'desktop-games',
    title: 'Gestion des employés Java',
    year: '2019',
    role: { fr: 'Développeur', en: 'Developer' },
    cover: 'plum',
    icon: '👨‍💼',
    link: '',
    stack: ['Java', 'Swing', 'OOP', 'JDBC'],
    description: {
      fr: 'Application CRUD en Java avec interface Swing, gestion des rôles et BD relationnelle.',
      en: 'Java CRUD application with Swing interface, role management and relational DB.',
    },
    longDescription: {
      fr: "Application CRUD complète de gestion des employés en Java avec interface graphique Swing, gestion fine des rôles utilisateurs (admin, RH, employé) et connexion à une base de données relationnelle.\n\nArchitecture en couches suivant le patron MVC, avec séparation stricte entre la logique métier et la présentation.",
      en: 'Complete CRUD employee management application in Java with Swing GUI, fine-grained user role management (admin, HR, employee) and connection to a relational database.\n\nLayered architecture following the MVC pattern, with strict separation between business logic and presentation.',
    },
    highlights: {
      fr: ['CRUD complet', 'Interface graphique Swing', 'Gestion des rôles', 'Architecture MVC en couches'],
      en: ['Complete CRUD', 'Swing GUI', 'Role management', 'Layered MVC architecture'],
    },
  },
  {
    // ← RENOMMÉ (id : diablo-rpg → rpg-tour-par-tour)
    // « Diablo » est une marque déposée. Le nouveau titre décrit le même
    // travail mais met l'ingénierie en avant plutôt que la licence copiée.
    id: 'rpg-tour-par-tour',
    category: 'desktop-games',
    title: 'RPG au tour par tour',
    year: '2020',
    role: { fr: 'Game Developer', en: 'Game Developer' },
    cover: 'plum',
    icon: '⚔️',
    link: '',
    stack: ['C#', '.NET', 'Game Dev', 'AI'],
    description: {
      fr: 'Jeu de rôle en C# : combats au tour par tour, inventaire, IA ennemie et plusieurs niveaux.',
      en: 'Role-playing game in C#: turn-based combat, inventory, enemy AI and multiple levels.',
    },
    longDescription: {
      fr: "Jeu de rôle développé en C#. Système de combat au tour par tour, inventaire avec équipement, intelligence artificielle ennemie variant selon le type de monstre, et progression à travers plusieurs niveaux avec difficulté croissante.\n\nLe cœur du projet est une machine à états : chaque combat enchaîne des phases précises, et chaque action doit pouvoir être interrompue, annulée ou modifiée par un effet en cours. C'est le projet qui m'a le plus appris sur la conception orientée objet.",
      en: "Role-playing game built in C#. Turn-based combat system, inventory with equipment, enemy AI varying by monster type, and progression through multiple levels with increasing difficulty.\n\nAt its core is a state machine: every fight moves through precise phases, and every action must be interruptible, cancellable or modifiable by an active effect. This is the project that taught me the most about object-oriented design.",
    },
    highlights: {
      fr: ['Combats au tour par tour', "Système d'inventaire et d'équipement", 'IA ennemie variée', 'Machine à états de combat'],
      en: ['Turn-based combat', 'Inventory and equipment system', 'Varied enemy AI', 'Combat state machine'],
    },
  },
  {
    // ← RENOMMÉ (id : icy-tower → jeu-plateforme) — même raison.
    id: 'jeu-plateforme',
    category: 'desktop-games',
    title: 'Jeu de plateforme 2D',
    year: '2019',
    role: { fr: 'Game Developer', en: 'Game Developer' },
    cover: 'plum',
    icon: '🎮',
    link: '',
    stack: ['C#', '.NET', 'Game Dev', 'Physics'],
    description: {
      fr: 'Jeu de plateforme à défilement vertical : physique de saut, génération aléatoire, système de score.',
      en: 'Vertical-scrolling platformer: jump physics, random generation, score system.',
    },
    longDescription: {
      fr: "Jeu de plateforme à défilement vertical développé en C#. Physique de saut avec calcul de vélocité et gravité écrite à la main, génération procédurale des plateformes, système de score avec multiplicateurs sur les sauts enchaînés.\n\nÉcrire soi-même la détection de collisions apprend beaucoup : il faut gérer les cas limites où le joueur traverse une plateforme parce qu'il va trop vite entre deux frames.",
      en: "Vertical-scrolling platformer built in C#. Hand-written jump physics with velocity and gravity calculations, procedural platform generation, score system with multipliers for chained jumps.\n\nWriting collision detection yourself teaches a lot: you have to handle the edge cases where the player passes straight through a platform because they moved too fast between two frames.",
    },
    highlights: {
      fr: ['Moteur physique écrit à la main', 'Génération procédurale', 'Multiplicateurs de score', 'Collisions à haute vitesse gérées'],
      en: ['Hand-written physics engine', 'Procedural generation', 'Score multipliers', 'High-speed collisions handled'],
    },
  },
  {
    id: 'casino-roulette',
    category: 'desktop-games',
    title: 'Roulette de casino',
    year: '2021',
    role: { fr: 'Développeur', en: 'Developer' },
    cover: 'plum',
    icon: '🎰',
    link: '',
    stack: ['JavaScript', 'HTML5 Canvas', 'CSS'],
    description: {
      fr: 'Roulette de casino en JavaScript et HTML5 Canvas : animation, logique de paris, bankroll.',
      en: 'Casino roulette in JavaScript and HTML5 Canvas: animation, betting logic, bankroll.',
    },
    longDescription: {
      fr: "Roulette de casino fonctionnelle en JavaScript pur avec HTML5 Canvas. Animation fluide de la roue (vitesse décroissante, easing), gestion complète des types de paris (numéros, couleurs, pairs/impairs, douzaines), et gestion de la bankroll avec historique.\n\nL'animation est la partie délicate : la roue doit s'arrêter exactement sur la case tirée, ce qui suppose de calculer la trajectoire à rebours à partir du résultat.",
      en: 'Functional casino roulette in pure JavaScript with HTML5 Canvas. Smooth wheel animation (decreasing speed, easing), complete bet type management (numbers, colors, odd/even, dozens), and bankroll management with history.\n\nThe animation is the tricky part: the wheel has to stop exactly on the drawn number, which means computing the trajectory backwards from the result.',
    },
    highlights: {
      fr: ['Animation fluide Canvas', 'Tous types de paris', 'Gestion bankroll', 'Trajectoire calculée à rebours'],
      en: ['Smooth Canvas animation', 'All bet types', 'Bankroll management', 'Trajectory computed backwards'],
    },
  },
]

// ============================================================
// COMPÉTENCES — inchangées
// ============================================================

export const SKILL_GROUPS = [
  { key: 'languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP', 'SQL', 'Bash'] },
  { key: 'frontend', items: ['React', 'Next.js', 'Vue.js', 'Angular', 'React Native', 'Tailwind', 'Redux', 'Figma'] },
  { key: 'backend', items: ['Node.js', 'Express', 'NestJS', 'Django', 'Flask', 'Spring Boot', 'REST', 'GraphQL'] },
  { key: 'databases', items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'Firebase'] },
  { key: 'devops', items: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Terraform', 'Ansible', 'ArgoCD'] },
  { key: 'cloud', items: ['AWS (EC2, S3, Lambda, RDS)', 'Azure', 'CloudFormation'] },
  { key: 'monitoring', items: ['ELK Stack', 'Prometheus', 'Grafana', 'Datadog', 'Fluentd'] },
  { key: 'network', items: ['TCP/IP', 'DNS', 'VPN', 'VLAN', 'pfSense', 'Mikrotik', 'Fibre optique', 'WiMax'] },
]

// ============================================================
// CERTIFICATIONS
//
// ← CHANGEMENT DE FORME : { name, issuer, code?, status? }
//   Vos 12 certifications sont toutes là, aucune retirée ni ajoutée.
//   Elles sont maintenant regroupées par organisme émetteur à l'affichage,
//   ce qui met en valeur le bloc Linux Foundation (7 sur 12).
//   status : 'done' | 'inProgress'   (omettre = pas d'étiquette)
// ============================================================

export const CERTIFICATIONS = [
  { name: 'Introduction to Kubernetes',          issuer: 'The Linux Foundation', code: 'LFS158',    status: 'done' },
  { name: 'Introduction to DevOps and SRE',      issuer: 'The Linux Foundation', code: 'LFS162',    status: 'done' },
  { name: 'Introduction to GitOps',              issuer: 'The Linux Foundation', code: 'LFS169',    status: 'done' },
  { name: 'Introduction to Jenkins',             issuer: 'The Linux Foundation', code: 'LFS167',    status: 'done' },
  { name: 'Introduction to Zero Trust',          issuer: 'The Linux Foundation', code: 'LFS183',    status: 'done' },
  { name: 'PyTorch and Deep Learning',           issuer: 'The Linux Foundation', code: 'LFS116',    status: 'done' },
  { name: 'Scaling Cloud Native Apps with KEDA', issuer: 'The Linux Foundation', code: 'LFELS1014', status: 'done' },

  { name: 'Scrum Fundamentals Certified',        issuer: 'SCRUMstudy',                              status: 'done' },

  { name: 'PowerApps & Power Platform',          issuer: 'Udemy',                                   status: 'done' },
  { name: 'Docker',                              issuer: 'Code with Mosh',                          status: 'done' },

  { name: 'React Native',                        issuer: 'Formations spécialisées',                 status: 'done' },
  { name: 'Next.js',                             issuer: 'Formations spécialisées',                 status: 'done' },
]

// ============================================================
// FORMATION — inchangée
// ============================================================

export const EDUCATION = [
  {
    period: '2023 — 2026',
    degree: {
      fr: "DEC en Techniques de l'informatique",
      en: 'DEC in Computer Science Techniques',
    },
    school: "Collège O'Sullivan de Québec",
  },
  {
    period: '2017-2020',
    degree: {
      fr: "Baccalauréat en Technologie de l'information",
      en: "Bachelor's in Information Technology",
    },
    school: 'Equivalence diplome MIFI',
  },
  {
    period: '2017-2019',
    degree: {
      fr: 'DEC en Télécommunications',
      en: 'DEC in Telecommunications',
    },
    school: 'Equivalence diplome MIFI',
  },
]

// ============================================================
// COVERS DE PROJET — inchangés
// ============================================================

export const COVERS = {
  warm: {
    gradient: 'linear-gradient(135deg, #f4a261 0%, #d96b3c 50%, #9d3414 100%)',
    bg: '#d96b3c',
  },
  fire: {
    gradient: 'linear-gradient(135deg, #ef476f 0%, #a8331e 50%, #481a14 100%)',
    bg: '#a8331e',
  },
  forest: {
    gradient: 'linear-gradient(135deg, #52b788 0%, #2d6a4f 50%, #1b3a2e 100%)',
    bg: '#2d6a4f',
  },
  plum: {
    gradient: 'linear-gradient(135deg, #b388eb 0%, #5e2e6e 50%, #2d1238 100%)',
    bg: '#5e2e6e',
  },
}