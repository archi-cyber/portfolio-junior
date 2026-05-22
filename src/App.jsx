import { useEffect, useRef, useState } from 'react'

/* ============================================================
   DATA
   ============================================================ */

const PROFILE = {
  name: 'Junior Dokmegho Tefo',
  role: 'Développeur Full-Stack & DevOps',
  tagline:
    "Quatre ans à construire des applications web et mobiles de bout en bout, du React au déploiement Kubernetes. Une passion pour le DevOps, l'automatisation et l'infrastructure cloud.",
  location: 'Québec, Canada',
  email: 'junior.tefo01@gmail.com',
  phone: '418-561-9642',
  github: 'https://github.com/archi-cyber',
  linkedin: 'https://linkedin.com/in/junior-tefo9',
  languages: 'Français (langue maternelle) · Anglais (bilingue professionnel)',
}

const STATS = [
  { value: '4+', label: 'Années d\'expérience' },
  { value: '18+', label: 'Projets livrés' },
  { value: '12+', label: 'Certifications' },
  { value: '2', label: 'Langues' },
]

const EXPERIENCES = [
  {
    role: 'DevOps Technical Lead',
    company: 'Spe.store SARL',
    location: 'Freelance — à distance',
    period: '2023 — Présent',
    points: [
      "Chaîne DevOps complète : de l'intégration continue jusqu'au déploiement en production.",
      "Stack d'observabilité avec ELK (Elasticsearch, Logstash, Kibana), Prometheus et Grafana.",
      "Tableaux de bord Grafana personnalisés pour latence API, taux d'erreur et utilisation CPU/mémoire.",
      "Conteneurisation des microservices avec Docker et orchestration sur Kubernetes.",
      "Provisionnement d'infrastructure avec Terraform, configuration avec Ansible.",
      "Pipelines GitHub Actions : build, tests, analyse statique, déploiement blue-green.",
    ],
  },
  {
    role: 'Développeur Full-Stack / DevOps',
    company: 'Rampex Gardex',
    location: 'Québec, QC',
    period: '2025 — 2026',
    points: [
      'Conception et développement de A à Z d\'une application de gestion métier (React/Next.js + Node.js/Express + SQL Server).',
      "Optimisation des requêtes SQL : certaines sont passées de 8 s à moins d'une seconde.",
      'Pipeline CI/CD complet sur GitLab CI : tests, lint ESLint et déploiement automatique sur staging.',
      'Conteneurisation Docker, reverse proxy Nginx avec HTTPS, authentification JWT et gestion des rôles.',
      'Sécurisation : CORS, validation des entrées, prévention SQL injection et XSS.',
      'Méthode Scrum : sprints, daily standups, revues de code, rétros.',
    ],
  },
  {
    role: 'Ingénieur Télécoms & Développeur',
    company: 'Lucioles',
    location: 'Yaoundé, Cameroun',
    period: '2021 — 2022',
    points: [
      'Développement complet de l\'app mobile Spe.store en Flutter (disponible sur App Store et Play Store).',
      'Pipelines de build et déploiement avec Jenkins et GitLab CI : commit → prod réduit de 45 min à 12 min.',
      'API REST : authentification, catalogue produits, gestion des commandes et notifications push.',
      'Sites web responsifs avec back-end Node.js et MySQL.',
      'Administration réseau radio (WiMax, WiFi, Nanostations), planification couverture avec Atoll.',
      'Maintenance parc informatique (~30 postes), formation des utilisateurs.',
    ],
  },
  {
    role: 'Développeur & Administrateur Réseau',
    company: 'Matrix Télécoms',
    location: 'Yaoundé, Cameroun',
    period: '2018 — 2021',
    points: [
      'Outil interne de planification et d\'optimisation réseau utilisé par les techniciens terrain.',
      'Application de suivi des interventions avec Microsoft Power Apps.',
      'Déploiement d\'infrastructures réseau : pfSense, fibre optique, Mikrotik, VLANs, switches managés.',
      'Installation et configuration des Nanostations M2/M3/M5.',
      'Réseau local et téléphonique complet pour deux sites (câblage structuré, PABX).',
      'Scripts Shell/Bash pour automatiser sauvegardes, monitoring de bande passante, redémarrages.',
    ],
  },
]

const PROJECTS = [
  // Web & Mobile Apps
  {
    category: 'Apps Web & Mobile',
    title: 'Spe.store',
    description:
      "Application e-commerce mobile complète en Flutter, disponible sur App Store et Play Store avec des centaines de téléchargements. API REST, notifications push, gestion des commandes.",
    stack: ['Flutter', 'Node.js', 'MySQL', 'REST API'],
    featured: true,
  },
  {
    category: 'Apps Web & Mobile',
    title: 'Rampex — Gestion métier',
    description:
      "Application de gestion métier livrée en production : React/Next.js en front, Node.js/Express en back, SQL Server en BD. Pipeline CI/CD GitLab et conteneurisation Docker.",
    stack: ['React', 'Next.js', 'Node.js', 'SQL Server', 'Docker'],
    featured: true,
  },
  {
    category: 'Apps Web & Mobile',
    title: 'Plateforme e-commerce Python',
    description:
      "Boutique en ligne en Python avec panier, catalogue, gestion de stock et paiement. Travail approfondi sur la logique backend de bout en bout.",
    stack: ['Python', 'SQL', 'Backend'],
  },
  {
    category: 'Apps Web & Mobile',
    title: 'App mobile d\'achat Android',
    description:
      'Application Android native avec MySQL intégré, panier et gestion des comptes utilisateurs.',
    stack: ['Android', 'Java', 'MySQL'],
  },
  {
    category: 'Apps Web & Mobile',
    title: 'Site web personnalisé',
    description:
      "Déploiement complet : achat domaine GoDaddy, configuration DNS, certificat SSL et hébergement.",
    stack: ['HTML', 'CSS', 'DNS', 'SSL'],
  },

  // DevOps & Cloud
  {
    category: 'DevOps & Cloud',
    title: 'Infrastructure AWS avec Terraform',
    description:
      "Infrastructure AWS complète provisionnée en Terraform : VPC, ALB, Auto Scaling Groups, RDS PostgreSQL. Monitoring intégré Prometheus + Grafana.",
    stack: ['AWS', 'Terraform', 'PostgreSQL', 'Prometheus'],
    featured: true,
  },
  {
    category: 'DevOps & Cloud',
    title: 'API Microservices',
    description:
      "Architecture microservices avec Node.js, MongoDB et RabbitMQ pour la communication inter-services. Auth JWT, documentation Swagger, tests Jest et déploiement Docker.",
    stack: ['Node.js', 'MongoDB', 'RabbitMQ', 'Docker', 'Jest'],
    featured: true,
  },
  {
    category: 'DevOps & Cloud',
    title: 'Stack de monitoring complète',
    description:
      "Surveillance des applications conteneurisées : ELK pour les logs centralisés, Prometheus + Grafana pour les métriques et les alertes en temps réel.",
    stack: ['ELK', 'Prometheus', 'Grafana', 'Docker'],
  },
  {
    category: 'DevOps & Cloud',
    title: 'Pipeline CI/CD GitOps',
    description:
      "Pipeline de livraison continue selon les principes GitOps : déclaratif, versionné, automatisé.",
    stack: ['GitOps', 'ArgoCD', 'Kubernetes'],
  },
  {
    category: 'DevOps & Cloud',
    title: 'Cluster Kubernetes — Nginx',
    description:
      "Déploiement Nginx sur Kubernetes/Minikube avec Deployments, Services, Ingress et HPA pour l'auto-scaling.",
    stack: ['Kubernetes', 'Minikube', 'Nginx'],
  },

  // Self-hosted & Infrastructure
  {
    category: 'Self-hosted & Infra',
    title: 'IA générative locale (LLaMA)',
    description:
      "Déploiement d'une IA générative en local : gestion du GPU, modèles open source LLaMA et interface web maison pour interagir avec le modèle.",
    stack: ['LLaMA', 'Python', 'GPU', 'Web UI'],
    featured: true,
  },
  {
    category: 'Self-hosted & Infra',
    title: 'Cloud privé Nextcloud',
    description:
      "Cloud personnel monté avec Nextcloud hébergé sur Proxmox VE. Plusieurs VMs accessibles à distance pour mes labs et fichiers personnels.",
    stack: ['Nextcloud', 'Proxmox', 'Linux'],
  },
  {
    category: 'Self-hosted & Infra',
    title: 'Filtrage DNS AdGuard',
    description:
      "Serveur de filtrage DNS avec AdGuard pour bloquer publicités et trackers sur l'ensemble du réseau local.",
    stack: ['AdGuard', 'DNS', 'Network'],
  },

  // Desktop & Games
  {
    category: 'Desktop & Jeux',
    title: 'Gestion clients .NET',
    description:
      "Système de gestion en C#/.NET avec tableau de bord, filtres de recherche avancés et export CSV/PDF.",
    stack: ['C#', '.NET', 'SQL'],
  },
  {
    category: 'Desktop & Jeux',
    title: 'Gestion des employés Java',
    description:
      "Application CRUD en Java : interface graphique Swing, gestion des rôles, connexion à une BD relationnelle. Premier vrai projet orienté objet.",
    stack: ['Java', 'Swing', 'OOP'],
  },
  {
    category: 'Desktop & Jeux',
    title: 'Diablo — RPG en C#',
    description:
      "RPG inspiré de Diablo : combats au tour par tour, inventaire, IA ennemie et plusieurs niveaux.",
    stack: ['C#', 'Game Dev', 'AI'],
  },
  {
    category: 'Desktop & Jeux',
    title: 'Icy Tower en C#',
    description:
      "Recréation du jeu de plateforme : physique de saut, génération de plateformes aléatoires, système de score.",
    stack: ['C#', 'Game Dev', 'Physics'],
  },
  {
    category: 'Desktop & Jeux',
    title: 'Roulette de casino',
    description:
      "Roulette de casino en JavaScript et HTML5 Canvas : animation de la roue, logique de paris, gestion de la bankroll.",
    stack: ['JavaScript', 'HTML5 Canvas'],
  },
]

const SKILL_GROUPS = [
  {
    title: 'Langages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP', 'SQL', 'Bash'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Vue.js', 'Angular', 'React Native', 'Tailwind', 'Redux', 'Figma'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'NestJS', 'Django', 'Flask', 'Spring Boot', 'REST', 'GraphQL'],
  },
  {
    title: 'Bases de données',
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'Firebase'],
  },
  {
    title: 'DevOps & CI/CD',
    items: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Terraform', 'Ansible', 'ArgoCD'],
  },
  {
    title: 'Cloud',
    items: ['AWS (EC2, S3, Lambda, RDS)', 'Azure', 'CloudFormation'],
  },
  {
    title: 'Monitoring',
    items: ['ELK Stack', 'Prometheus', 'Grafana', 'Datadog', 'Fluentd'],
  },
  {
    title: 'Réseaux & Télécoms',
    items: ['TCP/IP', 'DNS', 'VPN', 'VLAN', 'pfSense', 'Mikrotik', 'Fibre optique', 'WiMax'],
  },
]

const CERTIFICATIONS = [
  'Introduction to Kubernetes (LFS158) — The Linux Foundation',
  'Introduction to DevOps and SRE (LFS162) — The Linux Foundation',
  'Introduction to GitOps (LFS169) — The Linux Foundation',
  'Introduction to Jenkins (LFS167) — The Linux Foundation',
  'Introduction to Zero Trust (LFS183) — The Linux Foundation',
  'PyTorch and Deep Learning (LFS116) — The Linux Foundation',
  'Scaling Cloud Native Apps with KEDA (LFELS1014) — The Linux Foundation',
  'Scrum Fundamentals Certified — SCRUMstudy',
  'Certification Docker — Mosh',
  'Certification React Native',
  'Certification Next.js',
  'Certification PowerApps & Power Platform — Udemy',
]

const EDUCATION = [
  {
    degree: 'DEC en Techniques de l\'informatique',
    school: 'Collège O\'Sullivan de Québec',
    period: '2023 — 2026',
  },
  {
    degree: 'Baccalauréat en Technologie de l\'information',
    school: 'Institut supérieur Istag, Cameroun',
    period: '2017 — 2020',
  },
  {
    degree: 'DEC en Télécommunications',
    school: 'Institut supérieur Istag, Cameroun',
    period: '2017 — 2019',
  },
]

/* ============================================================
   HOOKS
   ============================================================ */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ============================================================
   COMPONENTS
   ============================================================ */

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'À propos' },
    { href: '#experience', label: 'Expérience' },
    { href: '#projects', label: 'Projets' },
    { href: '#skills', label: 'Compétences' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md border-b border-ink/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <a href="#top" className="font-display text-2xl font-bold tracking-tightest text-ink">
          J<span className="text-accent">.</span>T
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-mono text-xs uppercase tracking-widest link-underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="md:inline-flex hidden items-center gap-2 px-4 py-2 bg-ink text-cream font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors"
        >
          Discutons →
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="top" className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative big accent line */}
      <div className="absolute top-40 right-0 w-1/3 h-px bg-accent hidden md:block" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="font-mono text-xs uppercase tracking-widest text-muted mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-accent" />
          <span>Portfolio · 2026</span>
        </div>

        <h1 className="font-display font-light text-[clamp(3rem,11vw,11rem)] leading-[0.88] tracking-tightest text-ink mb-8">
          Junior
          <br />
          <span className="italic font-normal">Dokmegho</span>
          <br />
          <span className="text-accent">Tefo.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
          <div className="md:col-span-7">
            <p className="text-lg md:text-xl text-ink-2 leading-relaxed max-w-2xl">
              {PROFILE.tagline}
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <dl className="space-y-3 font-mono text-sm">
              <div>
                <dt className="text-muted uppercase text-[10px] tracking-widest mb-1">Rôle</dt>
                <dd className="text-ink">{PROFILE.role}</dd>
              </div>
              <div>
                <dt className="text-muted uppercase text-[10px] tracking-widest mb-1">Localisation</dt>
                <dd className="text-ink">{PROFILE.location}</dd>
              </div>
              <div>
                <dt className="text-muted uppercase text-[10px] tracking-widest mb-1">Disponibilité</dt>
                <dd className="text-ink flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  Ouvert aux opportunités
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-ink/15">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl md:text-6xl font-light text-ink mb-1">
                {s.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted flex flex-col items-center gap-2">
        <span>Défiler</span>
        <span className="w-px h-12 bg-ink/30" />
      </div>
    </section>
  )
}

function About() {
  const ref = useReveal()
  return (
    <section id="about" ref={ref} className="reveal py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="section-label mb-6">01 / À propos</div>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-none tracking-tightest">
              Le profil<br />
              <span className="italic">en bref.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-ink-2 text-lg leading-relaxed">
            <p>
              Plus de quatre ans à construire des applications web et mobiles, du frontend au déploiement
              en production. Je travaille principalement avec <strong className="text-ink">React, Next.js,
              React Native, Node.js, C#</strong> et <strong className="text-ink">Python</strong>.
            </p>
            <p>
              J'ai développé une vraie passion pour le DevOps : monter des pipelines CI/CD, conteneuriser
              avec Docker, orchestrer avec Kubernetes, automatiser l'infra avec Terraform.
            </p>
            <p>
              Une base solide en réseaux et télécoms me permet de comprendre les problématiques
              d'infrastructure de bout en bout — du paquet réseau jusqu'à l'utilisateur final.
            </p>
            <p className="font-mono text-sm text-muted pt-4 border-t border-ink/10">
              {PROFILE.languages}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const ref = useReveal()
  return (
    <section id="experience" ref={ref} className="reveal py-32 px-6 md:px-12 bg-cream-2/40 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="section-label mb-6">02 / Expérience</div>
            <h2 className="font-display text-5xl md:text-7xl font-light leading-none tracking-tightest">
              Parcours<br />
              <span className="italic">professionnel.</span>
            </h2>
          </div>
        </div>

        <div className="space-y-16">
          {EXPERIENCES.map((exp, idx) => (
            <article
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-16 border-b border-ink/10 last:border-0"
            >
              <div className="md:col-span-3">
                <div className="font-mono text-xs text-accent uppercase tracking-widest">
                  {exp.period}
                </div>
                <div className="font-mono text-xs text-muted mt-2">{exp.location}</div>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-3xl md:text-4xl font-normal leading-tight mb-1">
                  {exp.role}
                </h3>
                <div className="font-mono text-sm text-ink-2 mb-6">@ {exp.company}</div>
                <ul className="space-y-3 text-ink-2 leading-relaxed">
                  {exp.points.map((p, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-accent font-mono text-sm flex-shrink-0 mt-1.5">→</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const ref = useReveal()
  const [filter, setFilter] = useState('Tous')
  const categories = ['Tous', ...Array.from(new Set(PROJECTS.map((p) => p.category)))]
  const filtered = filter === 'Tous' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  return (
    <section id="projects" ref={ref} className="reveal py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="section-label mb-6">03 / Projets</div>
            <h2 className="font-display text-5xl md:text-7xl font-light leading-none tracking-tightest">
              Travaux<br />
              <span className="italic">sélectionnés.</span>
            </h2>
          </div>
          <div className="font-mono text-sm text-muted">
            {filtered.length} projet{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${
                filter === cat
                  ? 'bg-ink text-cream border-ink'
                  : 'border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15">
          {filtered.map((p, idx) => (
            <article
              key={`${p.title}-${idx}`}
              className={`bg-cream p-8 group hover:bg-cream-2/50 transition-colors duration-500 ${
                p.featured ? 'border-l-2 border-accent' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {String(idx + 1).padStart(2, '0')} / {p.category}
                </div>
                {p.featured && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    ★ Phare
                  </span>
                )}
              </div>
              <h3 className="font-display text-2xl font-medium mb-3 leading-tight group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="text-ink-2 leading-relaxed text-sm mb-6">{p.description}</p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/10">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-ink/5 text-ink-2"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest link-underline text-ink"
          >
            Voir tous les dépôts sur GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const ref = useReveal()
  return (
    <section id="skills" ref={ref} className="reveal py-32 px-6 md:px-12 bg-ink text-cream relative overflow-hidden">
      {/* Decorative giant text */}
      <div
        aria-hidden
        className="absolute top-0 -right-20 font-display text-[20rem] font-light leading-none text-cream/[0.03] pointer-events-none select-none"
      >
        Stack
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-20">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">04 / Compétences</div>
          <h2 className="font-display text-5xl md:text-7xl font-light leading-none tracking-tightest">
            Le<br />
            <span className="italic">toolkit.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="bg-ink p-8 hover:bg-ink-2 transition-colors">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-cream/90 text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Certifications() {
  const ref = useReveal()
  return (
    <section ref={ref} className="reveal py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="section-label mb-6">05 / Certifications & Formation</div>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-none tracking-tightest">
              Apprentissage<br />
              <span className="italic">continu.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {/* Education */}
            <div className="mb-12">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6">
                Formation académique
              </h3>
              <div className="space-y-6">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="flex justify-between gap-6 pb-4 border-b border-ink/10">
                    <div>
                      <div className="font-display text-xl text-ink leading-tight">{edu.degree}</div>
                      <div className="font-mono text-sm text-muted mt-1">{edu.school}</div>
                    </div>
                    <div className="font-mono text-xs text-accent uppercase whitespace-nowrap mt-1">
                      {edu.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6">
                Certifications
              </h3>
              <ul className="space-y-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <li key={idx} className="flex gap-4 text-ink-2 text-sm">
                    <span className="font-mono text-xs text-muted flex-shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const ref = useReveal()
  return (
    <section id="contact" ref={ref} className="reveal py-32 px-6 md:px-12 bg-accent text-cream relative overflow-hidden">
      {/* Decorative giant text */}
      <div
        aria-hidden
        className="absolute -bottom-20 -left-10 font-display italic text-[18rem] font-light leading-none text-cream/10 pointer-events-none select-none"
      >
        hello
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="font-mono text-xs uppercase tracking-widest mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-cream" />
          <span>06 / Contact</span>
        </div>

        <h2 className="font-display text-6xl md:text-9xl font-light leading-[0.9] tracking-tightest mb-12 max-w-5xl">
          Une idée<br />
          un projet<br />
          <span className="italic">une équipe ?</span>
        </h2>

        <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mb-16 text-cream/95">
          Je suis ouvert aux opportunités, freelance comme temps plein. Écrivez-moi directement —
          je réponds toujours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group block p-8 border border-cream/40 hover:bg-cream hover:text-ink transition-all duration-500"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest mb-3 opacity-70">
              Courriel
            </div>
            <div className="font-display text-2xl md:text-3xl break-all">{PROFILE.email}</div>
          </a>
          <a
            href={`tel:${PROFILE.phone}`}
            className="group block p-8 border border-cream/40 hover:bg-cream hover:text-ink transition-all duration-500"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest mb-3 opacity-70">
              Téléphone
            </div>
            <div className="font-display text-2xl md:text-3xl">{PROFILE.phone}</div>
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-6 font-mono text-sm uppercase tracking-widest">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            GitHub ↗
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 bg-ink text-cream/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
        <div>© {new Date().getFullYear()} Junior Dokmegho Tefo</div>
        <div>Conçu &amp; développé à Québec</div>
      </div>
    </footer>
  )
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  )
}
