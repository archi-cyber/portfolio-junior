import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  PROFILE,
  UI,
  EXPERIENCES,
  PROJECTS,
  SKILL_GROUPS,
  CERTIFICATIONS,
  EDUCATION,
  COVERS,
  CATEGORY_ORDER,
} from './data.js'

/* ============================================================
   CONSTANTES
   ============================================================ */

// Hauteur de la barre de navigation fixe. Sert de décalage au défilement
// pour que le titre de section ne se retrouve pas caché dessous.
const NAV_OFFSET = 84

/* ============================================================
   CONTEXTES — Thème & Langue
   ============================================================ */

const AppContext = createContext(null)
const useApp = () => useContext(AppContext)

function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
      return 'dark'
    }
    try {
      return localStorage.getItem('theme') || 'light'
    } catch {
      return 'light'
    }
  })

  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') || 'fr'
    } catch {
      return 'fr'
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang])

  const t = UI[lang]
  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'))

  return (
    <AppContext.Provider value={{ theme, setTheme, toggleTheme, lang, setLang, t }}>
      {children}
    </AppContext.Provider>
  )
}

/* ============================================================
   ROUTAGE — hash-based, compatible GitHub Pages

   Format des routes :
     #/                 → accueil
     #/#about           → accueil, ancré sur la section "about"
     #/project/spe-store → page de détail d'un projet

   ⚠️ CORRECTIF PRINCIPAL
   Le navigateur ne sait pas résoudre "#/#about" comme une ancre : il cherche
   un élément dont l'id vaut littéralement "/#about", qui n'existe pas. Il faut
   donc extraire nous-mêmes le nom de la section et faire défiler à la main.
   ============================================================ */

// Sépare la route en chemin + section : '#/#about' → { path: '/', section: 'about' }
function parseRoute(hash) {
  const raw = (hash || '#/').replace(/^#/, '')      // '/' | '/#about' | '/project/xyz'
  const hashIndex = raw.indexOf('#')
  if (hashIndex === -1) return { path: raw || '/', section: null }
  return {
    path: raw.slice(0, hashIndex) || '/',
    section: raw.slice(hashIndex + 1) || null,
  }
}

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const onChange = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

// Fait défiler jusqu'à une section, avec le décalage de la barre de navigation.
// Renvoie false si l'élément n'est pas encore dans le DOM.
function scrollToSection(id, smooth = true) {
  const el = document.getElementById(id)
  if (!el) return false
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({
    top: Math.max(0, top),
    behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto',
  })
  return true
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/* ⚠️ CORRECTIF n°2
   L'ancien code appelait window.scrollTo(0, 0) à CHAQUE changement de route.
   Même si l'ancre avait fonctionné, ce défilement l'aurait immédiatement annulée.
   On ne remonte donc en haut que lorsqu'il n'y a pas de section ciblée. */
function useScrollBehavior(route) {
  useEffect(() => {
    const { section } = parseRoute(route)

    if (!section) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    // Si l'on arrive depuis une page de détail, la page d'accueil doit d'abord
    // être montée. On réessaie sur quelques trames avant d'abandonner.
    let cancelled = false
    let attempts = 0
    const tryScroll = () => {
      if (cancelled) return
      if (scrollToSection(section)) return
      if (++attempts < 30) requestAnimationFrame(tryScroll)
    }
    requestAnimationFrame(tryScroll)

    return () => { cancelled = true }
  }, [route])
}

const goTo = (path) => { window.location.hash = path }

// Navigation vers une section. Gère le cas où l'on clique sur le lien de la
// section déjà active : le hash ne change pas, donc « hashchange » ne se
// déclenche jamais et rien ne bougerait sans ce traitement manuel.
function goToSection(section) {
  const target = `#/#${section}`
  if (window.location.hash === target) {
    scrollToSection(section)
  } else {
    window.location.hash = target
  }
}

/* ============================================================
   HOOKS UTILITAIRES
   ============================================================ */

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Si l'élément est déjà visible au montage, révéler immédiatement.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-visible')
      return
    }

    // Filet de sécurité si l'observer est bloqué.
    const fallback = setTimeout(() => {
      el.classList.add('is-visible')
    }, 1200)

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            clearTimeout(fallback)
            obs.unobserve(e.target)
          }
        }),
      { threshold: 0, rootMargin: '0px 0px -50px 0px' },
    )
    obs.observe(el)

    return () => {
      clearTimeout(fallback)
      obs.disconnect()
    }
  }, [])
  return ref
}

// Verrouille le défilement de la page quand le menu mobile est ouvert.
function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [locked])
}

/* ============================================================
   ICÔNES (SVG inline)
   ============================================================ */

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)
const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 6h18M3 12h18M3 18h18"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
)

/* ============================================================
   COMPOSANTS PARTAGÉS
   ============================================================ */

function ThemeToggle() {
  const { theme, toggleTheme } = useApp()
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full border border-ink/20 text-ink hover:bg-ink hover:text-cream transition-all"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function LangToggle() {
  const { lang, setLang } = useApp()
  return (
    <div className="toggle-pill">
      <button onClick={() => setLang('fr')} className={lang === 'fr' ? 'active' : ''}>FR</button>
      <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
    </div>
  )
}

function Nav() {
  const { t } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useBodyScrollLock(menuOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermer le menu avec la touche Échap.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const links = [
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'certifications', label: t.nav.certifications },
    { id: 'contact', label: t.nav.contact },
  ]

  const handleLink = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    goToSection(id)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen ? 'bg-cream/85 backdrop-blur-md border-b border-ink/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); setMenuOpen(false); goTo('/') }}
            className="font-display text-2xl font-bold tracking-tightest text-ink shrink-0"
          >
            J<span className="text-accent">.</span>T
          </a>

          <ul className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#/#${l.id}`}
                  onClick={(e) => handleLink(e, l.id)}
                  className="font-mono text-xs uppercase tracking-widest link-underline text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LangToggle />
            <ThemeToggle />
            <a
              href="#/#contact"
              onClick={(e) => handleLink(e, 'contact')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-ink text-cream font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors"
            >
              {t.nav.cta} →
            </a>

            {/* Bouton menu — visible seulement sous le point de rupture lg */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              className="lg:hidden p-2 rounded-full border border-ink/20 text-ink hover:bg-ink hover:text-cream transition-all"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Panneau de navigation mobile */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-cream transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col justify-center px-8 pt-20 pb-12">
          <ul className="space-y-2">
            {links.map((l, i) => (
              <li key={l.id}>
                <a
                  href={`#/#${l.id}`}
                  onClick={(e) => handleLink(e, l.id)}
                  className="flex items-baseline gap-4 py-3 border-b border-ink/10 group"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-4xl font-light text-ink group-hover:text-accent transition-colors">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-10 font-mono text-xs uppercase tracking-widest text-muted break-all"
          >
            {PROFILE.email}
          </a>
        </div>
      </div>
    </>
  )
}

function Footer() {
  const { t } = useApp()
  return (
    <footer className="py-8 px-6 md:px-12 bg-ink text-cream/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
        <div>© {new Date().getFullYear()} {PROFILE.name}</div>
        <div>{t.footer.built}</div>
      </div>
    </footer>
  )
}

/* ============================================================
   COMPOSANT — Cover de projet
   ============================================================ */

function ProjectCover({ project, large = false }) {
  const cover = COVERS[project.cover] || COVERS.warm
  return (
    <div
      className={`project-cover relative ${large ? 'aspect-[3/2] md:aspect-[16/6]' : 'aspect-[16/9]'} w-full flex items-end p-6 md:p-8`}
      style={{ background: cover.gradient }}
    >
      <div className="w-full">
        {project.icon && (
          <div
            aria-hidden
            className={`absolute top-5 right-6 select-none pointer-events-none opacity-90 ${
              large ? 'text-4xl md:text-6xl' : 'text-3xl'
            }`}
          >
            {project.icon}
          </div>
        )}
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/80 mb-2">
          {project.year} · {project.id}
        </div>
        <div className="font-display text-2xl md:text-4xl font-medium text-white leading-tight">
          {project.title}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   PAGE HOME — sections
   ============================================================ */

function Hero() {
  const { t } = useApp()
  return (
    <section id="top" className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-40 right-0 w-1/3 h-px bg-accent hidden md:block" />
      <div className="max-w-7xl mx-auto w-full">
        <div className="font-mono text-xs uppercase tracking-widest text-muted mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-accent" />
          <span>{t.hero.portfolio}</span>
        </div>

        <h1 className="font-display font-light text-[clamp(3rem,11vw,11rem)] leading-[0.88] tracking-tightest text-ink mb-8">
          Junior<br />
          <span className="italic font-normal">Dokmegho</span><br />
          <span className="text-accent">Tefo.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
          <div className="md:col-span-7">
            <p className="text-lg md:text-xl text-ink-2 leading-relaxed max-w-2xl">
              {t.hero.tagline}
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <dl className="space-y-3 font-mono text-sm">
              <div>
                <dt className="text-muted uppercase text-[10px] tracking-widest mb-1">{t.hero.labelRole}</dt>
                <dd className="text-ink">{t.hero.role}</dd>
              </div>
              <div>
                <dt className="text-muted uppercase text-[10px] tracking-widest mb-1">{t.hero.labelLocation}</dt>
                <dd className="text-ink">{t.hero.location}</dd>
              </div>
              <div>
                <dt className="text-muted uppercase text-[10px] tracking-widest mb-1">{t.hero.labelAvailability}</dt>
                <dd className="text-ink flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  {t.hero.availability}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-ink/15">
          {t.hero.stats.map((s, i) => (
            <div key={i}>
              <div className="font-display text-5xl md:text-6xl font-light text-ink mb-1">{s.value}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted flex flex-col items-center gap-2">
        <span>{t.hero.scroll}</span>
        <span className="w-px h-12 bg-ink/30" />
      </div>
    </section>
  )
}

function About() {
  const { t } = useApp()
  const ref = useReveal()
  return (
    <section id="about" ref={ref} className="reveal py-32 px-6 md:px-12 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="section-label mb-6">{t.about.number}</div>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-none tracking-tightest text-ink">
              {t.about.titleA}<br />
              <span className="italic">{t.about.titleB}</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-ink-2 text-lg leading-relaxed">
            <p>
              {t.about.p1}<strong className="text-ink">{t.about.p1bold}</strong>{t.about.p1end}<strong className="text-ink">{t.about.p1end2}</strong>{t.about.p1period}
            </p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
            <p className="font-mono text-sm text-muted pt-4 border-t border-ink/10">
              {t.about.languages}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const { t, lang } = useApp()
  const ref = useReveal()
  return (
    <section id="experience" ref={ref} className="reveal py-32 px-6 md:px-12 bg-cream-2/40 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="section-label mb-6">{t.experience.number}</div>
          <h2 className="font-display text-5xl md:text-7xl font-light leading-none tracking-tightest text-ink">
            {t.experience.titleA}<br />
            <span className="italic">{t.experience.titleB}</span>
          </h2>
        </div>

        <div className="space-y-16">
          {EXPERIENCES.map((exp, idx) => (
            <article key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-16 border-b border-ink/10 last:border-0">
              <div className="md:col-span-3">
                <div className="font-mono text-xs text-accent uppercase tracking-widest">
                  {lang === 'fr' ? exp.period : exp.periodEn}
                </div>
                <div className="font-mono text-xs text-muted mt-2">{exp.location[lang]}</div>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-3xl md:text-4xl font-normal leading-tight mb-1 text-ink">{exp.role[lang]}</h3>
                <div className="font-mono text-sm text-ink-2 mb-6">@ {exp.company}</div>
                <ul className="space-y-3 text-ink-2 leading-relaxed">
                  {exp.points[lang].map((p, i) => (
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
  const { t, lang } = useApp()
  const ref = useReveal()
  const [filter, setFilter] = useState('all')

  // Ordre de filtres stable, défini dans data.js (CATEGORY_ORDER) plutôt que
  // dicté par l'ordre d'apparition des projets dans le tableau.
  const categories = useMemo(() => {
    const present = new Set(PROJECTS.map((p) => p.category))
    const ordered = CATEGORY_ORDER.filter((c) => present.has(c))
    // Filet de sécurité : une catégorie présente mais absente de CATEGORY_ORDER
    // reste affichée, à la fin, plutôt que de disparaître silencieusement.
    const extras = [...present].filter((c) => !CATEGORY_ORDER.includes(c))
    return ['all', ...ordered, ...extras]
  }, [])

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  return (
    <section id="projects" ref={ref} className="reveal py-32 px-6 md:px-12 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="section-label mb-6">{t.projects.number}</div>
            <h2 className="font-display text-5xl md:text-7xl font-light leading-none tracking-tightest text-ink">
              {t.projects.titleA}<br />
              <span className="italic">{t.projects.titleB}</span>
            </h2>
          </div>
          <div className="font-mono text-sm text-muted">{t.projects.shown(filtered.length)}</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${
                filter === cat
                  ? 'bg-ink text-cream border-ink'
                  : 'border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cream'
              }`}
            >
              {cat === 'all' ? t.projects.all : t.categories[cat]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, idx) => (
            <a
              key={p.id}
              href={`#/project/${p.id}`}
              onClick={(e) => { e.preventDefault(); goTo(`/project/${p.id}`) }}
              className="group block bg-cream-2/30 hover:bg-cream-2/60 transition-all duration-500 border border-ink/10 hover:border-accent overflow-hidden"
            >
              <ProjectCover project={p} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {String(idx + 1).padStart(2, '0')} / {t.categories[p.category]}
                  </div>
                  {p.featured && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent shrink-0">
                      {t.projects.featured}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl font-medium mb-3 leading-tight text-ink group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="text-ink-2 leading-relaxed text-sm mb-4">{p.description[lang]}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-ink/5 text-ink-2">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2">
                  {t.projects.viewDetails} <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest link-underline text-ink"
          >
            {t.projects.viewAll}
          </a>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const { t } = useApp()
  const ref = useReveal()
  return (
    <section id="skills" ref={ref} className="reveal py-32 px-6 md:px-12 bg-ink text-cream relative overflow-hidden scroll-mt-24">
      <div
        aria-hidden
        className="absolute top-0 -right-20 font-display text-[20rem] font-light leading-none text-cream/[0.03] pointer-events-none select-none"
      >
        Stack
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-20">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">{t.skills.number}</div>
          <h2 className="font-display text-5xl md:text-7xl font-light leading-none tracking-tightest">
            {t.skills.titleA}<br />
            <span className="italic">{t.skills.titleB}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.key} className="bg-ink p-8 hover:bg-ink-2 transition-colors">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6">
                {t.skillGroups[group.key]}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-cream/90 text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SECTION — Formation & certifications

   ⚠️ CORRECTIF n°3 : cette section n'avait aucun id, elle était donc
   impossible à cibler depuis la navigation. Elle a désormais id="certifications"
   et les certifications sont regroupées par organisme émetteur.
   ============================================================ */

function Certifications() {
  const { t, lang } = useApp()
  const ref = useReveal()

  // Regroupe les certifications par émetteur, dans l'ordre d'apparition.
  const grouped = useMemo(() => {
    const map = new Map()
    CERTIFICATIONS.forEach((cert) => {
      if (!map.has(cert.issuer)) map.set(cert.issuer, [])
      map.get(cert.issuer).push(cert)
    })
    return Array.from(map, ([issuer, items]) => ({ issuer, items }))
  }, [])

  const total = CERTIFICATIONS.length

  return (
    <section
      id="certifications"
      ref={ref}
      className="reveal py-32 px-6 md:px-12 relative bg-cream-2/40 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-4">
            <div className="section-label mb-6">{t.certifications.number}</div>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-none tracking-tightest text-ink">
              {t.certifications.titleA}<br />
              <span className="italic">{t.certifications.titleB}</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 self-end">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-7xl md:text-8xl font-light text-accent leading-none">
                {total}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted max-w-[16rem] leading-relaxed">
                {t.certifications.countLabel}
              </span>
            </div>
          </div>
        </div>

        {/* FORMATION */}
        <div className="mb-20">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-8">
            {t.certifications.education}
          </h3>
          <div className="space-y-6">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-6 pb-5 border-b border-ink/10"
              >
                <div>
                  <div className="font-display text-xl md:text-2xl text-ink leading-tight">{edu.degree[lang]}</div>
                  <div className="font-mono text-sm text-muted mt-1">{edu.school}</div>
                </div>
                <div className="font-mono text-xs text-accent uppercase whitespace-nowrap sm:mt-2">
                  {edu.period}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS, GROUPÉES PAR ÉMETTEUR */}
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-8">
            {t.certifications.certs}
          </h3>

          <div className="space-y-12">
            {grouped.map((group) => (
              <div key={group.issuer} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <div className="font-display text-xl text-ink leading-tight">{group.issuer}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-1">
                    {group.items.length} {group.items.length > 1 ? t.certifications.plural : t.certifications.singular}
                  </div>
                </div>
                <ul className="md:col-span-8 space-y-3">
                  {group.items.map((cert, i) => (
                    <li
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-3 border-b border-ink/10 last:border-0"
                    >
                      <span className="flex-1 text-ink-2 text-sm leading-relaxed">
                        {cert.name}
                        {cert.code && (
                          <span className="font-mono text-xs text-muted ml-2">{cert.code}</span>
                        )}
                      </span>
                      {cert.status && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-accent whitespace-nowrap">
                          {t.certifications.status[cert.status]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useApp()
  const ref = useReveal()
  return (
    <section id="contact" ref={ref} className="reveal py-32 px-6 md:px-12 bg-accent text-on-accent relative overflow-hidden scroll-mt-24">
      <div
        aria-hidden
        className="absolute -bottom-20 -left-10 font-display italic text-[18rem] font-light leading-none text-on-accent/10 pointer-events-none select-none"
      >
        hello
      </div>
      <div className="max-w-7xl mx-auto relative">
        <div className="font-mono text-xs uppercase tracking-widest mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-on-accent" />
          <span>{t.contact.number}</span>
        </div>
        <h2 className="font-display text-6xl md:text-9xl font-light leading-[0.9] tracking-tightest mb-12 max-w-5xl">
          {t.contact.titleA}<br />
          {t.contact.titleB}<br />
          <span className="italic">{t.contact.titleC}</span>
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mb-16 text-on-accent/95">
          {t.contact.body}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group block p-8 border border-on-accent/40 hover:bg-on-accent hover:text-ink transition-all duration-500"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest mb-3 opacity-70">
              {t.contact.emailLabel}
            </div>
            <div className="font-display text-2xl md:text-3xl break-all">{PROFILE.email}</div>
          </a>
          <a
            href={`tel:${PROFILE.phone}`}
            className="group block p-8 border border-on-accent/40 hover:bg-on-accent hover:text-ink transition-all duration-500"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest mb-3 opacity-70">
              {t.contact.phoneLabel}
            </div>
            <div className="font-display text-2xl md:text-3xl">{PROFILE.phone}</div>
          </a>
        </div>
        <div className="mt-12 flex flex-wrap gap-6 font-mono text-sm uppercase tracking-widest">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="link-underline">GitHub ↗</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline">LinkedIn ↗</a>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   PAGE — Détail d'un projet
   ============================================================ */

function ProjectDetail({ projectId }) {
  const { t, lang } = useApp()
  const project = PROJECTS.find((p) => p.id === projectId)

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <h1 className="font-display text-6xl text-ink mb-4">404</h1>
          <p className="text-ink-2 mb-8">{t.projectDetail.notFound}</p>
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); goTo('/') }}
            className="font-mono text-sm uppercase tracking-widest link-underline text-ink"
          >
            {t.projectDetail.back}
          </a>
        </div>
        <Footer />
      </div>
    )
  }

  const others = PROJECTS.filter((p) => p.id !== project.id).slice(0, 3)

  return (
    <div className="min-h-screen">
      <Nav />

      {/* HERO COVER */}
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); goTo('/') }}
            className="inline-flex items-center font-mono text-xs uppercase tracking-widest text-ink link-underline mb-8"
          >
            {t.projectDetail.back}
          </a>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ProjectCover project={project} large />
        </div>
      </div>

      {/* HEADER */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <div className="section-label mb-4">{t.categories[project.category]}</div>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-none tracking-tightest text-ink mb-8">
              {project.title}
            </h1>
            <p className="text-xl text-ink-2 leading-relaxed max-w-2xl">
              {project.description[lang]}
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <dl className="space-y-4 font-mono text-sm border-l-2 border-accent pl-6">
              <div>
                <dt className="text-muted uppercase text-[10px] tracking-widest mb-1">{t.projectDetail.year}</dt>
                <dd className="text-ink">{project.year}</dd>
              </div>
              <div>
                <dt className="text-muted uppercase text-[10px] tracking-widest mb-1">{t.projectDetail.role}</dt>
                <dd className="text-ink">{project.role[lang]}</dd>
              </div>
              <div>
                <dt className="text-muted uppercase text-[10px] tracking-widest mb-1">{t.projectDetail.category}</dt>
                <dd className="text-ink">{t.categories[project.category]}</dd>
              </div>
            </dl>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-ink text-cream font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors"
              >
                {t.projectDetail.viewLive} ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* LONG DESCRIPTION */}
      <section className="px-6 md:px-12 py-16 bg-cream-2/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="section-label">{t.projectDetail.overview}</div>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-ink-2 text-lg leading-relaxed">
            {project.longDescription[lang].split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-4xl md:text-5xl font-light leading-none tracking-tightest text-ink">
              <span className="italic">{t.projectDetail.highlights}.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ul className="space-y-4">
              {project.highlights[lang].map((h, i) => (
                <li key={i} className="flex gap-4 text-ink-2 text-lg leading-relaxed">
                  <span className="font-mono text-sm text-accent flex-shrink-0 mt-1.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="px-6 md:px-12 py-16 bg-ink text-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
              {t.projectDetail.stack}
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-none tracking-tightest">
              <span className="italic">{project.stack.length}</span> {t.projectDetail.techWord(project.stack.length)}.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 flex flex-wrap gap-3 self-center">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-sm px-4 py-2 border border-cream/30 hover:border-accent hover:text-accent transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER PROJECTS */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-light leading-none tracking-tightest text-ink mb-12">
            <span className="italic">{t.projectDetail.otherProjects}.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((p) => (
              <a
                key={p.id}
                href={`#/project/${p.id}`}
                onClick={(e) => { e.preventDefault(); goTo(`/project/${p.id}`) }}
                className="group block bg-cream-2/30 hover:bg-cream-2/60 border border-ink/10 hover:border-accent transition-all overflow-hidden"
              >
                <ProjectCover project={p} />
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium text-ink group-hover:text-accent transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="text-ink-2 text-sm leading-relaxed line-clamp-2">{p.description[lang]}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ============================================================
   PAGE — Accueil
   ============================================================ */

function HomePage() {
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

/* ============================================================
   ROOT — Routage
   ============================================================ */

function Router() {
  const route = useHashRoute()
  useScrollBehavior(route)

  const { path } = parseRoute(route)
  const projectMatch = path.match(/^\/project\/(.+)$/)

  if (projectMatch) {
    return <ProjectDetail projectId={projectMatch[1]} />
  }
  return <HomePage />
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}