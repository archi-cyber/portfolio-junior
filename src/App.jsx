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
} from './data.js'

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
   ROUTAGE — hash-based, parfait pour GitHub Pages
   ============================================================ */

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash || '#/')
  useEffect(() => {
    const onChange = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  useEffect(() => { window.scrollTo(0, 0) }, [route])
  return route
}

const goTo = (path) => { window.location.hash = path }

/* ============================================================
   HOOKS UTILITAIRES
   ============================================================ */

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
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

function Nav({ onHome }) {
  const { t } = useApp()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#/#about', label: t.nav.about },
    { href: '#/#experience', label: t.nav.experience },
    { href: '#/#projects', label: t.nav.projects },
    { href: '#/#skills', label: t.nav.skills },
    { href: '#/#contact', label: t.nav.contact },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/85 backdrop-blur-md border-b border-ink/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">
        <a
          href="#/"
          onClick={(e) => { e.preventDefault(); goTo('/'); onHome?.() }}
          className="font-display text-2xl font-bold tracking-tightest text-ink shrink-0"
        >
          J<span className="text-accent">.</span>T
        </a>

        <ul className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-mono text-xs uppercase tracking-widest link-underline text-ink">
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
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-ink text-cream font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors"
          >
            {t.nav.cta} →
          </a>
        </div>
      </div>
    </nav>
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
   COMPOSANT — Cover de projet (visuel à la place d'image)
   ============================================================ */

function ProjectCover({ project, large = false }) {
  const cover = COVERS[project.cover] || COVERS.warm
  return (
    <div
      className={`project-cover ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'} w-full flex items-end p-6 md:p-10`}
      style={{ background: cover.gradient }}
    >
      <div className="w-full">
        <div
          aria-hidden
          className="absolute top-6 right-6 md:top-10 md:right-10 text-7xl md:text-9xl opacity-90 select-none"
        >
          {project.icon}
        </div>
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/80 mb-2">
          {project.year} · {project.id}
        </div>
        <div className="font-display text-3xl md:text-5xl font-medium text-white leading-tight">
          {project.title}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   PAGE HOME — toutes les sections
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
    <section id="about" ref={ref} className="reveal py-32 px-6 md:px-12 relative">
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
    <section id="experience" ref={ref} className="reveal py-32 px-6 md:px-12 bg-cream-2/40 relative">
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
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(PROJECTS.map((p) => p.category)))],
    []
  )
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  return (
    <section id="projects" ref={ref} className="reveal py-32 px-6 md:px-12 relative">
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
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {String(idx + 1).padStart(2, '0')} / {t.categories[p.category]}
                  </div>
                  {p.featured && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
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
    <section id="skills" ref={ref} className="reveal py-32 px-6 md:px-12 bg-ink text-cream relative overflow-hidden">
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

function Certifications() {
  const { t, lang } = useApp()
  const ref = useReveal()
  return (
    <section ref={ref} className="reveal py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="section-label mb-6">{t.certifications.number}</div>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-none tracking-tightest text-ink">
              {t.certifications.titleA}<br />
              <span className="italic">{t.certifications.titleB}</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="mb-12">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6">
                {t.certifications.education}
              </h3>
              <div className="space-y-6">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="flex justify-between gap-6 pb-4 border-b border-ink/10">
                    <div>
                      <div className="font-display text-xl text-ink leading-tight">{edu.degree[lang]}</div>
                      <div className="font-mono text-sm text-muted mt-1">{edu.school}</div>
                    </div>
                    <div className="font-mono text-xs text-accent uppercase whitespace-nowrap mt-1">
                      {edu.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6">
                {t.certifications.certs}
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
  const { t } = useApp()
  const ref = useReveal()
  return (
    <section id="contact" ref={ref} className="reveal py-32 px-6 md:px-12 bg-accent text-on-accent relative overflow-hidden">
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
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <Nav />
        <h1 className="font-display text-4xl text-ink mb-4">404</h1>
        <a href="#/" onClick={(e) => { e.preventDefault(); goTo('/') }} className="font-mono text-sm uppercase link-underline">
          {t.projectDetail.back}
        </a>
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
          </div>
        </div>
      </section>

      {/* LONG DESCRIPTION */}
      <section className="px-6 md:px-12 py-16 bg-cream-2/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="section-label">{t.projectDetail.highlights}</div>
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
              <span className="italic">{project.stack.length}</span> techno{project.stack.length > 1 ? 's' : ''}.
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
   PAGE — Accueil complète
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
  // Match #/project/:id
  const projectMatch = route.match(/^#\/project\/(.+?)(?:#|$)/)
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
