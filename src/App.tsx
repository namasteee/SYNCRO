import React, { useEffect, useMemo, useState } from "react";

type Page = "Home" | "Servizi" | "Metodo" | "Plugins" | "Work" | "Team" | "Contatti";
type Theme = "dark" | "light";

type Service = {
  id: string;
  title: string;
  line: string;
  problem: string;
  output: string;
  points: string[];
  image: string;
};

type PluginItem = {
  id: string;
  name: string;
  label: string;
  color: string;
  line: string;
  forWho: string;
  does: string;
  features: string[];
  status: "LIVE" | "BETA" | "INTERNAL";
};

type ProjectItem = {
  id: string;
  title: string;
  tag: string;
  image: string;
  text: string;
  bullets: string[];
};

type RoleItem = {
  id: string;
  number: string;
  title: string;
  short: string;
  human: string;
  project: string;
  badge: string;
  color: string;
  image: string;
};

const pages: Page[] = ["Home", "Servizi", "Metodo", "Plugins", "Work", "Team", "Contatti"];

const services: Service[] = [
  {
    id: "branding",
    title: "Branding",
    line: "Il logo non ti salva se nessuno capisce chi sei.",
    problem: "Hai una faccia visiva, ma nessuna personalità riconoscibile.",
    output: "Identità, tono, posizionamento, linee guida e visual system.",
    points: ["Naming", "Identity", "Tone", "Guidelines"],
    image: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "web",
    title: "Web",
    line: "Un sito bello che non converte è arredamento.",
    problem: "Il tuo sito esiste, ma non guida, non spiega, non convince.",
    output: "UI, UX, landing, siti corporate, performance e sviluppo.",
    points: ["UI/UX", "Landing", "Frontend", "Performance"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ecommerce",
    title: "Ecommerce",
    line: "Caricare prodotti e pregare non è una strategia.",
    problem: "Il percorso d’acquisto è pieno di attriti che ormai non vedi più.",
    output: "Store, funnel, schede prodotto, checkout e conversion design.",
    points: ["Store", "CRO", "Funnel", "Checkout"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "marketing",
    title: "Marketing",
    line: "Postare ogni giorno non è una strategia. È panico organizzato.",
    problem: "Stai pubblicando roba, ma non stai costruendo attenzione.",
    output: "Strategia, ADV, contenuti, lanci e campagne che fermano il pollice.",
    points: ["ADV", "Content", "Launch", "Growth"],
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "plugins",
    title: "Plugins",
    line: "Automatizzare non è lusso. È smettere di perdere tempo da scemi.",
    problem: "Fai troppe cose a mano, troppo spesso, con troppi passaggi inutili.",
    output: "Tool proprietari, plugin verticali, automazioni e flussi interni.",
    points: ["Tools", "Automation", "Workflow", "Product"],
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "optimization",
    title: "Optimization",
    line: "Se non misuri, stai solo sperando con più budget.",
    problem: "Hai messo online la roba, ma non sai davvero cosa succede.",
    output: "SEO, analytics, tracking, performance e ottimizzazione continua.",
    points: ["SEO", "Tracking", "Analytics", "Speed"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
];

const roles: RoleItem[] = [
  {
    id: "strategy",
    number: "01",
    title: "Strategy",
    short: "Smonta il problema.",
    human: "Da solo rompe tutto.",
    project: "Sul progetto trova la direzione.",
    badge: "rompicoglioni utile",
    color: "#DFFF00",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "branding",
    number: "02",
    title: "Brand",
    short: "Dà una faccia al mostro.",
    human: "Da solo odia palette educate.",
    project: "Sul progetto crea riconoscibilità.",
    badge: "faccia al mostro",
    color: "#FF2DA0",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ux",
    number: "03",
    title: "UI/UX",
    short: "Fa trovare la strada.",
    human: "Da solo litiga coi bottoni messi a caso.",
    project: "Sul progetto rende tutto più usabile.",
    badge: "ordine mascherato",
    color: "#7A2CFF",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "dev",
    number: "04",
    title: "Dev",
    short: "Fa funzionare davvero.",
    human: "Da solo dice sempre: dipende.",
    project: "Sul progetto trasforma idee in roba online.",
    badge: "se non deploya non esiste",
    color: "#0F6BFF",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "commerce",
    number: "05",
    title: "Commerce",
    short: "Fa comprare meglio.",
    human: "Da solo vede attriti ovunque.",
    project: "Sul progetto pulisce funnel e checkout.",
    badge: "vendere senza pregare",
    color: "#FF8A00",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "content",
    number: "06",
    title: "Content",
    short: "Ferma il pollice.",
    human: "Da solo odia i comunicati stampa.",
    project: "Sul progetto crea hook, ADV e messaggi.",
    badge: "fastidio utile",
    color: "#FF2DA0",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "automation",
    number: "07",
    title: "Automation",
    short: "Elimina lavori stupidi.",
    human: "Da solo ha allergia ai task ripetuti.",
    project: "Sul progetto costruisce tool e flussi.",
    badge: "anti-lavori scemi",
    color: "#DFFF00",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
];

const plugins: PluginItem[] = [
  {
    id: "syncro",
    name: "syncro",
    label: "plugins",
    color: "#0F6BFF",
    line: "La suite madre. L’arsenale.",
    forWho: "Per aziende che vogliono ordine operativo, non file sparsi ovunque.",
    does: "Raccoglie tool, automazioni e prodotti verticali sotto un ecosistema unico.",
    features: ["Product suite", "Tool proprietari", "Flussi scalabili", "Automazioni"],
    status: "LIVE",
  },
  {
    id: "blogger",
    name: "blogger",
    label: "PRO",
    color: "#7B2DFF",
    line: "Il blog non è morto. È solo scritto male.",
    forWho: "Per brand, magazine e aziende che vogliono contenuti con metodo.",
    does: "Organizza piani editoriali, articoli, template e struttura SEO.",
    features: ["Editorial plan", "SEO structure", "Template articoli", "Workflow"],
    status: "BETA",
  },
  {
    id: "quoter",
    name: "quoter",
    label: "PRO",
    color: "#DFFF00",
    line: "Preventivi belli. Proposal forti. Meno PDF tristi.",
    forWho: "Per chi manda offerte, preventivi e proposte commerciali ogni settimana.",
    does: "Crea proposal più chiare, veloci, leggibili e brandizzate.",
    features: ["Proposal", "Preventivi", "Moduli offerta", "Versioning"],
    status: "LIVE",
  },
  {
    id: "golder",
    name: "golder",
    label: "PRO",
    color: "#FF2D86",
    line: "Per chi compra oro, vende fiducia e odia perdere lead.",
    forWho: "Per compro oro e business verticali con richieste da gestire bene.",
    does: "Gestisce lead, form, funnel, pagine verticali e richieste commerciali.",
    features: ["Lead flow", "Smart form", "Landing verticali", "Gestione richieste"],
    status: "INTERNAL",
  },
];

const projects: ProjectItem[] = [
  {
    id: "identity",
    title: "Brand Identity",
    tag: "Identity",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80",
    text: "Da brand educato a presenza che si nota.",
    bullets: ["Più carattere", "Sistema chiaro", "Voce netta"],
  },
  {
    id: "web",
    title: "Website Restyle",
    tag: "Web",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
    text: "Un sito che prima chiedeva scusa. Ora entra senza bussare.",
    bullets: ["UX pulita", "Gerarchia forte", "Più fiducia"],
  },
  {
    id: "commerce",
    title: "Ecommerce Launch",
    tag: "Commerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
    text: "Meno vetrina. Più percorso d’acquisto.",
    bullets: ["Checkout chiaro", "Funnel serio", "Più conversione"],
  },
  {
    id: "product",
    title: "Plugin Ecosystem",
    tag: "Product",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
    text: "Da agenzia a prodotti interni. Perché vendere solo ore è triste.",
    bullets: ["Prodotti chiari", "Più scala", "Meno caos"],
  },
  {
    id: "adv",
    title: "ADV Campaign",
    tag: "ADV",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1400&q=80",
    text: "Campagne pensate per bloccare il pollice.",
    bullets: ["Hook forte", "Messaggio secco", "Più attenzione"],
  },
  {
    id: "content",
    title: "Content System",
    tag: "Content",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
    text: "Un modo per non pubblicare roba a caso.",
    bullets: ["Format", "Coerenza", "Riconoscibilità"],
  },
];

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@500;600;700;800;900&display=swap');

      html { scroll-behavior: smooth; }

      body {
        font-family: 'IBM Plex Mono', monospace;
        background: #F3F0E9;
        color: #0A0A0A;
      }

      .display {
        font-family: 'Anton', Impact, sans-serif;
        font-weight: 400;
        letter-spacing: 0.018em;
        text-transform: uppercase;
        line-height: 0.96;
      }

      .display-tight {
        font-family: 'Anton', Impact, sans-serif;
        font-weight: 400;
        letter-spacing: 0.012em;
        text-transform: uppercase;
        line-height: 0.92;
      }

      .display-wide {
        font-family: 'Anton', Impact, sans-serif;
        font-weight: 400;
        letter-spacing: 0.032em;
        text-transform: uppercase;
        line-height: 0.98;
      }

      .soft {
        font-family: 'Inter', system-ui, sans-serif;
      }

      .noise {
        background-image: radial-gradient(rgba(0,0,0,.07) 1px, transparent 1px);
        background-size: 4px 4px;
      }

      .marquee { animation: marquee 24s linear infinite; }

      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      .slidein { animation: slidein .45s ease both; }

      @keyframes slidein {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .paper-card {
        clip-path: polygon(0 0, 100% 0, 100% 96%, 95% 98%, 89% 96%, 82% 99%, 74% 96%, 66% 98%, 57% 96%, 49% 99%, 40% 96%, 31% 98%, 22% 96%, 14% 99%, 6% 96%, 0 98%);
      }

      .hero-mask {
        background:
          linear-gradient(90deg, rgba(0,0,0,.88) 0%, rgba(0,0,0,.62) 44%, rgba(0,0,0,.16) 100%),
          linear-gradient(0deg, rgba(0,0,0,.68) 0%, transparent 45%);
      }

      .two-grid {
        display: grid;
        grid-template-columns: .85fr 1.15fr;
        gap: 2.2rem;
      }

      .team-grid {
        display: grid;
        grid-template-columns: .76fr 1.24fr;
        gap: 2rem;
      }

      @media (max-width: 1100px) {
        .two-grid,
        .team-grid {
          grid-template-columns: 1fr;
        }
      }

      /* THEME TOGGLE */
      [data-theme="dark"] {
        --page-bg: #F3F0E9;
        --hero-filter: grayscale(1) contrast(1.08) brightness(.82);
        --photo-filter: grayscale(1) contrast(1.08) brightness(.9);
      }

      [data-theme="light"] {
        --page-bg: #FAF7EF;
        --hero-filter: grayscale(.18) contrast(.96) brightness(1.12);
        --photo-filter: grayscale(.12) contrast(.98) brightness(1.06);
      }

      [data-theme="light"] {
        background: var(--page-bg);
        color: #0A0A0A;
      }

      [data-theme="light"] .theme-adapt-bg {
        background: #FAF7EF !important;
      }

      [data-theme="light"] .theme-adapt-dark {
        background: #FAF7EF !important;
        color: #0A0A0A !important;
      }

      [data-theme="light"] .theme-adapt-panel {
        background: rgba(250,247,239,.78) !important;
        color: #0A0A0A !important;
        backdrop-filter: blur(10px);
      }

      [data-theme="light"] .theme-adapt-hero-mask {
        background:
          linear-gradient(90deg, rgba(250,247,239,.94) 0%, rgba(250,247,239,.76) 46%, rgba(250,247,239,.20) 100%),
          linear-gradient(0deg, rgba(250,247,239,.82) 0%, transparent 42%) !important;
      }

      [data-theme="dark"] .hero-photo,
      [data-theme="light"] .hero-photo {
        filter: var(--hero-filter);
      }

      [data-theme="dark"] .theme-photo,
      [data-theme="light"] .theme-photo {
        filter: var(--photo-filter);
      }

      [data-theme="light"] .theme-invert-text,
      [data-theme="light"] .theme-invert-text * {
        color: #0A0A0A !important;
      }

      [data-theme="light"] .theme-muted {
        color: rgba(10,10,10,.72) !important;
      }

      [data-theme="light"] .theme-soft-line {
        border-color: rgba(10,10,10,.28) !important;
      }

      [data-theme="light"] .theme-dark-footer {
        background: #FAF7EF !important;
        color: #0A0A0A !important;
      }

      [data-theme="light"] .theme-dark-footer .text-white,
      [data-theme="light"] .theme-dark-footer .text-white\/75 {
        color: #0A0A0A !important;
      }

      [data-theme="light"] .theme-dark-footer .border-white,
      [data-theme="light"] .theme-dark-footer .border-white\/30 {
        border-color: rgba(10,10,10,.35) !important;
      }

      [data-theme="light"] .theme-dark-footer .bg-white {
        background: #0A0A0A !important;
        color: #fff !important;
      }

      [data-theme="light"] .theme-dark-footer .text-\[\#DFFF00\] {
        color: #FF2DA0 !important;
      }

      [data-theme="light"] .theme-toggle-dot {
        transform: translateX(1.35rem);
      }

      [data-theme="dark"] .theme-toggle-dot {
        transform: translateX(0);
      }

    `}</style>
  );
}

function SyncroMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="204 0 159 184" fill="currentColor" aria-hidden="true">
      <path d="M362.39,0c-.1,17.43-3.49,32.38-9.78,44.69-6.59,12.72-16.57,23.11-29.9,31.62-13.33,8.36-29.85,14.34-49.46,18.29-19.66,3.8-42.47,5.73-68.72,5.73V34.56s13.48,0,13.48,0c16.27,0,29.44-1.01,39.27-3.04,9.93-2.08,17.83-4.71,23.41-8.06,5.73-3.4,9.53-7.2,11.55-11.3,2.08-3.95,3.09-8.06,3.09-12.16h67.04Z" />
      <path d="M204.54,183.28c.1-17.43,3.49-32.38,9.78-44.69,6.59-12.72,16.57-23.11,29.9-31.62,13.33-8.36,29.85-14.34,49.46-18.29,19.66-3.8,42.47-5.73,68.71-5.73v65.78s-13.48,0-13.48,0c-16.27,0-29.44,1.01-39.27,3.04-9.93,2.08-17.83,4.71-23.41,8.06-5.73,3.4-9.53,7.2-11.55,11.3-2.08,3.95-3.09,8.06-3.09,12.16h-67.04Z" />
    </svg>
  );
}

function SyncroWordmark({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${light ? "text-white" : "text-black"}`}>
      <SyncroMark className="h-10 w-10 md:h-12 md:w-12" />
      <div className="soft text-4xl font-black tracking-[-0.06em] md:text-5xl">syncro</div>
      <div className="hidden text-[10px] font-black uppercase leading-[0.9] md:block">
        another
        <br />
        digital
        <br />
        agency
      </div>
    </div>
  );
}

function Tag({
  children,
  variant = "yellow",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "yellow" | "pink" | "black" | "white" | "blue";
  className?: string;
}) {
  const classes = {
    yellow: "bg-[#DFFF00] text-black",
    pink: "bg-[#FF2DA0] text-black",
    black: "bg-black text-white",
    white: "bg-white text-black",
    blue: "bg-[#0F6BFF] text-white",
  }[variant];

  return (
    <div className={`inline-flex px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] ${classes} ${className}`}>
      {children}
    </div>
  );
}

function BigTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={`display-tight text-[68px] sm:text-[98px] md:text-[126px] xl:text-[156px] ${className}`}>
      {children}
    </h1>
  );
}

function MidTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`display text-[48px] sm:text-[68px] md:text-[86px] ${className}`}>{children}</h2>;
}

function Header({ page, onNavigate, theme, onToggleTheme }: { page: Page; onNavigate: (page: Page) => void; theme: Theme; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [egg, setEgg] = useState(false);

  function go(next: Page) {
    onNavigate(next);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b-2 border-black bg-[#F3F0E9]/95 backdrop-blur-xl">
        <div className="flex items-center justify-between px-5 py-4 md:px-8 xl:px-10">
          <button onClick={() => go("Home")} className="text-left">
            <SyncroWordmark />
          </button>

          <nav className="hidden items-center gap-5 lg:flex">
            {pages.map((item) => (
              <button
                key={item}
                onClick={() => go(item)}
                className={`px-2 py-1 text-sm font-black uppercase transition ${
                  page === item ? "bg-[#DFFF00]" : "hover:bg-[#FF2DA0]"
                }`}
              >
                {item === "Home" ? "Manifesto" : item === "Work" ? "Portfolio" : item}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-3 border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-[#DFFF00]"
              aria-label="Toggle dark and light mode"
            >
              <span>{theme === "dark" ? "Dark" : "Light"}</span>
              <span className="relative inline-flex h-5 w-11 items-center border-2 border-black bg-black">
                <span className="theme-toggle-dot absolute left-1 h-3 w-3 bg-[#DFFF00] transition-transform" />
              </span>
            </button>
            <button
              onClick={() => setEgg(true)}
              className="text-xs font-black uppercase tracking-[0.18em] hover:bg-[#FF2DA0]"
            >
              non cliccare
            </button>
            <button
              onClick={() => go("Contatti")}
              className="border-2 border-black bg-black px-5 py-3 text-sm font-black uppercase text-white transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[8px_8px_0_#FF2DA0]"
            >
              Make some noise →
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleTheme}
              className="border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase text-black"
              aria-label="Toggle dark and light mode"
            >
              {theme === "dark" ? "Dark" : "Light"}
            </button>
            <button
              onClick={() => setOpen((value) => !value)}
              className="border-2 border-black bg-black px-4 py-2 text-sm font-black uppercase text-white"
            >
              Menu
            </button>
          </div>
        </div>

        {open ? (
          <div className="grid gap-2 border-t-2 border-black bg-[#F3F0E9] p-5 lg:hidden">
            {pages.map((item) => (
              <button key={item} onClick={() => go(item)} className="display text-left text-4xl uppercase">
                {item === "Work" ? "Portfolio" : item}
              </button>
            ))}
          </div>
        ) : null}
      </header>

      {egg ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5">
          <div className="max-w-xl border-2 border-black bg-[#DFFF00] p-8 shadow-[10px_10px_0_#FF2DA0]">
            <Tag variant="black">easter egg inutile</Tag>
            <h2 className="display mt-6 text-6xl">Te l’avevamo detto.</h2>
            <p className="mt-5 text-sm font-black uppercase leading-7">
              Hai cliccato lo stesso. Questo dice molto sulla tua strategia digitale.
            </p>
            <button
              onClick={() => setEgg(false)}
              className="mt-6 border-2 border-black bg-black px-5 py-3 text-sm font-black uppercase text-white"
            >
              ok, umiliato abbastanza
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <footer className="border-t-2 border-black bg-black px-5 py-14 text-white theme-dark-footer md:px-8 xl:px-10">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <SyncroWordmark light />

          <h2 className="display mt-10 max-w-4xl text-[58px] leading-[0.95] text-white md:text-[88px]">
            Ti fa cagare
            <br />
            come ti
            <br />
            presenti?
          </h2>

          <p className="mt-6 max-w-xl text-xl font-black uppercase leading-8 text-[#DFFF00]">
            Bene. Allora hai ancora gusto.
          </p>

          <button
            onClick={() => onNavigate("Contatti")}
            className="mt-8 border-2 border-white bg-white px-7 py-4 text-sm font-black uppercase text-black transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[8px_8px_0_#FF2DA0]"
          >
            Sistemiamola →
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-2 border-white/30 p-5">
            <Tag variant="white">Facciamo</Tag>
            <div className="mt-5 grid gap-3 text-sm font-black uppercase text-white/75">
              <button onClick={() => onNavigate("Servizi")} className="text-left hover:text-[#DFFF00]">Branding</button>
              <button onClick={() => onNavigate("Servizi")} className="text-left hover:text-[#DFFF00]">Web</button>
              <button onClick={() => onNavigate("Servizi")} className="text-left hover:text-[#DFFF00]">Ecommerce</button>
              <button onClick={() => onNavigate("Servizi")} className="text-left hover:text-[#DFFF00]">ADV</button>
              <button onClick={() => onNavigate("Plugins")} className="text-left hover:text-[#DFFF00]">Plugins</button>
            </div>
          </div>

          <div className="border-2 border-white/30 p-5">
            <Tag variant="pink">Vai</Tag>
            <div className="mt-5 grid gap-3 text-sm font-black uppercase text-white/75">
              {pages.map((item) => (
                <button key={item} onClick={() => onNavigate(item)} className="text-left hover:text-[#DFFF00]">
                  {item === "Home" ? "Manifesto" : item === "Work" ? "Portfolio" : item}
                </button>
              ))}
            </div>
          </div>

          <div className="border-2 border-white/30 p-5 md:col-span-2">
            <p className="text-sm font-black uppercase leading-7 tracking-[0.08em] text-white/75 theme-muted">
              Another digital agency. Sì, ma almeno questa prova a non sembrare morta dentro.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("Home");
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("syncro-theme") as Theme) || "dark";
  });
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedPlugin, setSelectedPlugin] = useState<PluginItem | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);

  useEffect(() => {
    document.title = `Syncro — ${page}`;
  }, [page]);

  useEffect(() => {
    localStorage.setItem("syncro-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  const content = useMemo(() => {
    switch (page) {
      case "Servizi":
        return <ServicesPage onNavigate={setPage} onOpenService={setSelectedService} />;
      case "Metodo":
        return <MethodPage onNavigate={setPage} />;
      case "Plugins":
        return <PluginsPage onOpen={setSelectedPlugin} onNavigate={setPage} />;
      case "Work":
        return <WorkPage onOpen={setSelectedProject} onNavigate={setPage} />;
      case "Team":
        return <TeamPage onNavigate={setPage} onOpenRole={setSelectedRole} />;
      case "Contatti":
        return <ContactPage />;
      default:
        return (
          <HomePage
            onNavigate={setPage}
            onOpenProject={setSelectedProject}
            onOpenPlugin={setSelectedPlugin}
            onOpenService={setSelectedService}
            onOpenRole={setSelectedRole}
          />
        );
    }
  }, [page]);

  return (
    <div data-theme={theme} className="min-h-screen bg-[#F3F0E9] text-black selection:bg-[#DFFF00] selection:text-black theme-adapt-bg">
      <GlobalStyles />
      <div className="noise pointer-events-none fixed inset-0 z-[1] opacity-[0.07]" />
      <div className="relative z-[2]">
        <Header page={page} onNavigate={setPage} theme={theme} onToggleTheme={toggleTheme} />
        <main className="slidein">{content}</main>
        <Footer onNavigate={setPage} />
      </div>

      <ProjectModal item={selectedProject} onClose={() => setSelectedProject(null)} />
      <PluginModal item={selectedPlugin} onClose={() => setSelectedPlugin(null)} />
      <ServiceModal item={selectedService} onClose={() => setSelectedService(null)} />
      <RoleModal item={selectedRole} onClose={() => setSelectedRole(null)} />
    </div>
  );
}

function HomePage({
  onNavigate,
  onOpenProject,
  onOpenPlugin,
  onOpenService,
  onOpenRole,
}: {
  onNavigate: (page: Page) => void;
  onOpenProject: (item: ProjectItem) => void;
  onOpenPlugin: (item: PluginItem) => void;
  onOpenService: (item: Service) => void;
  onOpenRole: (item: RoleItem) => void;
}) {
  return (
    <>
      <section className="relative min-h-[calc(100vh-82px)] overflow-hidden border-b-2 border-black bg-black">
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=80"
          alt="Syncro manifesto background"
          className="hero-photo absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="hero-mask theme-adapt-hero-mask absolute inset-0" />

        <div className="relative z-10 flex min-h-[calc(100vh-82px)] flex-col justify-between px-5 py-8 text-white theme-invert-text md:px-8 xl:px-10">
          <div className="flex items-center justify-between border-b-2 border-white/40 pb-5 theme-soft-line">
            <Tag variant="white">another digital agency</Tag>
            <div className="hidden text-xs font-black uppercase tracking-[0.18em] text-white/80 theme-muted md:block">
              Make some noise. Make it useful.
            </div>
          </div>

          <div className="max-w-6xl py-12">
            <h1 className="display-tight text-[80px] leading-[0.88] sm:text-[116px] md:text-[156px] xl:text-[190px]">
              Non fare
              <br />
              presenza.
              <br />
              Fai rumore.
            </h1>

            <p className="mt-8 max-w-4xl text-[18px] font-black uppercase leading-[1.35] tracking-[0.04em] text-[#DFFF00] md:text-[26px]">
              Branding, web, ecommerce, contenuti, ADV e tool proprietari. Non per sembrare più belli. Per smettere di essere ignorati.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate("Contatti")}
                className="border-2 border-white bg-white px-7 py-4 text-sm font-black uppercase text-black transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[8px_8px_0_#FF2DA0]"
              >
                Ho un progetto serio
              </button>

              <button
                onClick={() => onNavigate("Servizi")}
                className="border-2 border-white bg-transparent px-7 py-4 text-sm font-black uppercase text-white transition hover:bg-[#DFFF00] hover:text-black"
              >
                Cosa fate davvero?
              </button>
            </div>
          </div>

          <div className="grid border-2 border-white/50 bg-black/40 backdrop-blur-sm theme-adapt-panel theme-soft-line md:grid-cols-6">
            {[
              "Brand che non parla",
              "Siti che dormono",
              "Shop che perde clienti",
              "Post che non morde",
              "ADV che brucia soldi",
              "Processi da Medioevo",
            ].map((item) => (
              <div key={item} className="border-b border-white/30 p-4 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <p className="text-[11px] font-black uppercase leading-5 tracking-[0.12em] text-white theme-invert-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b-2 border-black bg-[#DFFF00] py-4">
        <div className="marquee flex w-[200%] gap-10 whitespace-nowrap text-[34px] uppercase sm:text-[50px]">
          <span className="display">
            Make some noise · no template damage · stop looking random · brand + web + growth · less pretty, more bite ·
          </span>
          <span className="display">
            Make some noise · no template damage · stop looking random · brand + web + growth · less pretty, more bite ·
          </span>
        </div>
      </section>

      <HomeAbout />
      <HomeMixedTeam onOpenRole={onOpenRole} onNavigate={onNavigate} />
      <HomeMethod onNavigate={onNavigate} />
      <HomeServices onNavigate={onNavigate} onOpenService={onOpenService} />
      <HomePhotoBreak />
      <HomePlugins onOpenPlugin={onOpenPlugin} onNavigate={onNavigate} />
      <HomeWork onOpenProject={onOpenProject} onNavigate={onNavigate} />
      <HomeCTA onNavigate={onNavigate} />
    </>
  );
}

function HomeAbout() {
  return (
    <section className="border-b-2 border-black bg-white px-5 py-20 md:px-8 xl:px-10">
      <div className="grid gap-12 xl:grid-cols-[.9fr_1.1fr]">
        <div>
          <div className="mb-6 flex items-center justify-between gap-4 border-b-2 border-black pb-5">
            <Tag variant="yellow">chi siamo</Tag>
            <span className="hidden text-xs font-black uppercase tracking-[0.18em] md:block">Not a brochure agency</span>
          </div>

          <MidTitle>
            Non siamo
            <br />
            un’agenzia
            <br />
            da brochure.
          </MidTitle>

          <p className="mt-6 max-w-3xl text-[23px] font-black uppercase leading-[1.14] text-[#FF2DA0] sm:text-[34px]">
            Siamo un team misto che mette insieme brand, web, contenuti, campagne e roba che deve funzionare davvero.
          </p>
        </div>

        <div className="grid content-between gap-8">
          <div className="max-w-3xl text-lg leading-9 text-black/75">
            <p>
              Non facciamo loghi buttati lì, siti vetrina addormentati, post per riempire il mese o campagne lanciate “per provare”.
            </p>
            <p className="mt-5">
              Facciamo direzione, identità, interfacce, contenuti, ecommerce, ADV e automazioni che si parlano senza fare sceneggiate.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Brand", "Riconoscibile, non solo carino."],
              ["Web + Commerce", "Chiaro, usabile, vendibile."],
              ["Marketing + Tools", "Presente, misurabile, meno improvvisato."],
            ].map(([title, text], index) => (
              <div key={title} className={`border-2 border-black p-5 ${index === 1 ? "bg-[#DFFF00]" : "bg-[#F3F0E9]"}`}>
                <h3 className="display-wide text-4xl">{title}</h3>
                <p className="mt-4 text-sm font-black uppercase leading-6 text-black/75">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeMemberCard({ role, onClick }: { role: RoleItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="paper-card group w-[300px] shrink-0 snap-start overflow-hidden border-2 border-black bg-[#F3F0E9] text-left text-black transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#DFFF00] md:w-[360px]"
    >
      <div className="relative h-[290px] overflow-hidden bg-black">
        <img
          src={role.image}
          alt={role.title}
          className="theme-photo h-full w-full object-cover grayscale transition duration-700 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4 display text-5xl leading-none" style={{ color: role.color }}>
          {role.number}
        </div>
      </div>

      <div className="min-h-[210px] p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display-wide text-5xl">{role.title}</h3>
          <span className="mt-2 h-4 w-4 shrink-0 border-2 border-black" style={{ background: role.color }} />
        </div>

        <p className="mt-4 text-sm font-black uppercase leading-6 tracking-[0.1em] text-black/70">
          {role.short}
        </p>

        <div className="mt-6 border-t border-black pt-4">
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/45">sul progetto</div>
          <p className="mt-2 text-xs font-black uppercase leading-5">{role.project}</p>
        </div>
      </div>
    </button>
  );
}

function HomeMixedTeam({
  onOpenRole,
  onNavigate,
}: {
  onOpenRole: (role: RoleItem) => void;
  onNavigate: (page: Page) => void;
}) {
  return (
    <section className="border-b-2 border-black bg-black px-5 py-20 text-white theme-adapt-dark md:px-8 xl:px-10">
      <div className="mb-10 flex items-center justify-between border-b border-white/25 pb-5">
        <Tag variant="white">mixed team</Tag>
        <span className="hidden text-xs font-black uppercase tracking-[0.18em] text-white/70 theme-muted md:block">
          7 membri / 7 verticali / stesso progetto
        </span>
      </div>

      <div className="grid gap-10 xl:grid-cols-[.7fr_1.3fr]">
        <div>
          <h2 className="display text-[58px] leading-[0.95] text-white theme-invert-text md:text-[92px]">
            Nessuno
            <br />
            normale.
            <br />
            Tutti utili.
          </h2>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/75 theme-muted">
            Sette teste diverse, ognuna verticale sul suo pezzo. Non perfetti singolarmente. Utili quando il progetto chiede più di una grafica carina.
          </p>

          <button
            onClick={() => onNavigate("Team")}
            className="mt-8 border-2 border-white bg-white px-6 py-4 text-sm font-black uppercase text-black transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[8px_8px_0_#FF2DA0]"
          >
            Apri il team
          </button>
        </div>

        <div className="overflow-hidden">
          <div className="flex snap-x gap-5 overflow-x-auto pb-6">
            {roles.map((role) => (
              <HomeMemberCard key={role.id} role={role} onClick={() => onOpenRole(role)} />
            ))}
          </div>

          <div className="border-2 border-white/25 p-5 theme-soft-line">
            <p className="text-sm font-black uppercase leading-7 tracking-[0.08em] text-white/75 theme-muted">
              Strategy, brand, UX, dev, commerce, content e automation. Il rumore è umano. La direzione no.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeMethod({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const steps = [
    ["01", "Audit", "Guardiamo brand, sito, offerta, funnel e contenuti.", "Problemi veri, non sensazioni."],
    ["02", "Direction", "Mettiamo in fila priorità, tono, target e messaggio.", "Una direzione sola, finalmente."],
    ["03", "Build", "Costruiamo identity, sito, contenuti, campagne o tool.", "Roba viva, non PDF morti."],
    ["04", "Launch", "Mandiamo online roba usabile, leggibile, cliccabile.", "Fuori dal Figma. Nel mondo."],
    ["05", "Push", "Misuriamo, correggiamo, ottimizziamo e spingiamo.", "Meno speranza. Più dati."],
  ];

  return (
    <section className="relative overflow-hidden border-b-2 border-black bg-[#DFFF00] px-5 py-20 md:px-8 xl:px-10">
      <div className="mb-10 flex items-center justify-between border-b-2 border-black pb-5">
        <Tag variant="black">metodo</Tag>
        <span className="hidden text-xs font-black uppercase tracking-[0.18em] md:block">from mess to traction</span>
      </div>

      <div className="grid gap-10 xl:grid-cols-[.82fr_1.18fr]">
        <div>
          <h2 className="display-tight text-[68px] leading-[0.92] md:text-[112px]">
            Prima
            <br />
            pensiamo.
            <br />
            Poi facciamo
            <br />
            casino.
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-black/80">
            Il caos creativo arriva dopo. Prima serve capire dove mettere le mani, cosa tagliare e cosa spingere.
          </p>

          <button
            onClick={() => onNavigate("Metodo")}
            className="mt-8 border-2 border-black bg-black px-6 py-4 text-sm font-black uppercase text-white transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[8px_8px_0_#FF2DA0]"
          >
            Vedi il metodo
          </button>
        </div>

        <div className="grid gap-3">
          {steps.map(([number, title, action, output]) => (
            <div key={number} className="grid border-2 border-black bg-[#F3F0E9] md:grid-cols-[92px_1fr_220px]">
              <div className="flex items-center justify-center border-b-2 border-black bg-black p-4 text-[#DFFF00] md:border-b-0 md:border-r-2">
                <div className="display text-5xl">{number}</div>
              </div>

              <div className="border-b-2 border-black p-4 md:border-b-0 md:border-r-2">
                <h3 className="display-wide text-4xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/80">{action}</p>
              </div>

              <div className="p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-black/45">output</div>
                <p className="mt-2 text-xs font-black uppercase leading-5">{output}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeServices({
  onNavigate,
  onOpenService,
}: {
  onNavigate: (page: Page) => void;
  onOpenService: (service: Service) => void;
}) {
  return (
    <section className="relative overflow-hidden border-b-2 border-black bg-[#F3F0E9] px-5 py-20 md:px-8 xl:px-10">
      <div className="mb-10 flex items-center justify-between border-b-2 border-black pb-5">
        <Tag variant="pink">servizi</Tag>
        <span className="hidden text-xs font-black uppercase tracking-[0.18em] md:block">
          brand / web / commerce / content / adv / plugins / growth
        </span>
      </div>

      <div className="grid gap-10 xl:grid-cols-[.82fr_1.18fr]">
        <div>
          <MidTitle>
            Tutto ciò
            <br />
            che serve
            <br />
            per non
            <br />
            sparire.
          </MidTitle>

          <p className="mt-8 max-w-md text-base leading-8 text-black/80">
            Non vendiamo pezzi scollegati. Mettiamo in fila le cose che ti fanno sembrare vivo, chiaro e difficile da ignorare.
          </p>

          <button
            onClick={() => onNavigate("Servizi")}
            className="mt-8 border-2 border-black bg-white px-6 py-4 text-sm font-black uppercase transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[8px_8px_0_#000]"
          >
            Apri tutti i servizi
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => onOpenService(service)}
              className="group relative min-h-[250px] overflow-hidden border-2 border-black bg-white p-6 text-left transition hover:-translate-y-1 hover:bg-[#DFFF00] hover:shadow-[8px_8px_0_#000]"
            >
              <div className="display text-5xl leading-none text-[#FF2DA0]">0{index + 1}</div>
              <h3 className="display-wide mt-6 text-5xl">{service.title}</h3>
              <p className="mt-4 text-xs font-black uppercase leading-5 tracking-[0.12em] text-black/70">
                {service.line}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePhotoBreak() {
  return (
    <section className="relative min-h-[76vh] overflow-hidden border-b-2 border-black bg-black theme-adapt-dark">
      <img
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=80"
        alt="Visual break"
        className="theme-photo absolute inset-0 h-full w-full object-cover opacity-75 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent" />

      <div className="relative z-10 flex min-h-[76vh] items-end px-5 py-14 text-white theme-invert-text md:px-8 xl:px-10">
        <div>
          <Tag variant="yellow">visual break / non dormire</Tag>
          <h2 className="display-tight mt-8 max-w-5xl text-[70px] leading-[0.9] md:text-[128px]">
            Meno
            <br />
            carino.
            <br />
            Più morso.
          </h2>
          <p className="mt-6 max-w-xl text-lg font-black uppercase leading-8 tracking-[0.04em] text-white/85 theme-muted">
            Se il tuo brand non dà fastidio a nessuno, forse non lo sta guardando nessuno.
          </p>
        </div>
      </div>
    </section>
  );
}

function PluginMockup({ plugin }: { plugin: PluginItem }) {
  return (
    <div className="border-2 border-black bg-[#F3F0E9] p-4">
      <div className="flex items-center justify-between border-b-2 border-black pb-3">
        <div className="soft text-3xl font-black tracking-[-0.06em]">{plugin.name}</div>
        <div
          className="px-3 py-1 text-xs font-black uppercase"
          style={{ background: plugin.color, color: plugin.color === "#DFFF00" ? "#000" : "#fff" }}
        >
          {plugin.status}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <div className="h-3 w-4/5 bg-black" />
        <div className="h-3 w-3/5 bg-black/40" />
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="h-16 border-2 border-black bg-white" />
          <div className="h-16 border-2 border-black bg-white" />
          <div className="h-16 border-2 border-black bg-white" />
        </div>
        <div className="mt-2 border-2 border-black bg-white p-3">
          <p className="text-[10px] font-black uppercase leading-4 tracking-[0.12em]">{plugin.line}</p>
        </div>
      </div>
    </div>
  );
}

function HomePlugins({
  onOpenPlugin,
  onNavigate,
}: {
  onOpenPlugin: (plugin: PluginItem) => void;
  onNavigate: (page: Page) => void;
}) {
  return (
    <section className="relative overflow-hidden border-b-2 border-black bg-white px-5 py-20 md:px-8 xl:px-10">
      <div className="mb-10 flex items-center justify-between border-b-2 border-black pb-5">
        <Tag variant="blue">syncro plugins</Tag>
        <span className="hidden text-xs font-black uppercase tracking-[0.18em] md:block">
          product shelf / internal tools
        </span>
      </div>

      <div className="grid gap-10 xl:grid-cols-[.72fr_1.28fr]">
        <div>
          <MidTitle>
            Non solo
            <br />
            agenzia.
            <br />
            Prodotti.
          </MidTitle>

          <p className="mt-8 max-w-xl text-base leading-8 text-black/80">
            Tool interni per contenuti, preventivi, lead e automazioni. Quando un problema torna troppe volte, lo trasformiamo in prodotto.
          </p>

          <button
            onClick={() => onNavigate("Plugins")}
            className="mt-8 border-2 border-black bg-black px-6 py-4 text-sm font-black uppercase text-white transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[8px_8px_0_#0F6BFF]"
          >
            Apri la suite
          </button>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            {plugins.slice(1).map((plugin) => (
              <button key={plugin.id} onClick={() => onOpenPlugin(plugin)} className="text-left">
                <PluginMockup plugin={plugin} />
              </button>
            ))}
          </div>

          <div className="border-2 border-black bg-black p-5 text-white">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="soft text-5xl font-black tracking-[-0.07em]">syncro plugins</div>
                <p className="mt-3 max-w-2xl text-sm font-black uppercase leading-6 tracking-[0.08em] text-white/75">
                  Una famiglia di tool pensati per togliere lavori stupidi, accelerare flussi e dare meno spazio al caos inutile.
                </p>
              </div>
              <button
                onClick={() => onOpenPlugin(plugins[0])}
                className="border-2 border-white bg-white px-5 py-4 text-sm font-black uppercase text-black transition hover:bg-[#DFFF00]"
              >
                Vedi suite
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeWork({
  onOpenProject,
  onNavigate,
}: {
  onOpenProject: (project: ProjectItem) => void;
  onNavigate: (page: Page) => void;
}) {
  return (
    <section className="border-b-2 border-black px-5 py-20 md:px-8 xl:px-10">
      <div className="mb-8 flex items-center justify-between border-b-2 border-black pb-5">
        <Tag variant="pink">portfolio clienti</Tag>
        <span className="hidden text-xs font-black uppercase tracking-[0.18em] md:block">prove, non parole</span>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {projects.slice(0, 2).map((project, index) => (
          <button
            key={project.id}
            onClick={() => (index === 0 ? onOpenProject(project) : onNavigate("Work"))}
            className="group relative overflow-hidden border-2 border-black bg-black text-left text-white"
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-[520px] w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute left-6 top-6">
              <Tag>{project.tag}</Tag>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="display-tight max-w-[520px] text-[64px] text-white md:text-[84px]">
                {index === 0 ? "Roba che lascia il segno." : "Guarda prima di parlare."}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function HomeCTA({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="bg-[#F3F0E9] px-5 py-20 md:px-8 xl:px-10">
      <div className="grid gap-10 xl:grid-cols-[1fr_.9fr] xl:items-center">
        <div>
          <Tag>contatti</Tag>

          <h2 className="display mt-6 text-[58px] leading-[0.95] md:text-[92px]">
            Hai qualcosa
            <br />
            che merita
            <br />
            di fare rumore?
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/80">
            Brand spento, sito confuso, marketing random, ecommerce lento, processi inutili. Portaci tutto. Poi capiamo cosa salvare.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate("Contatti")}
              className="border-2 border-black bg-black px-7 py-4 text-sm font-black uppercase text-white transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[8px_8px_0_#FF2DA0]"
            >
              Scrivici prima che peggiori
            </button>

            <button
              onClick={() => onNavigate("Team")}
              className="border-2 border-black bg-white px-7 py-4 text-sm font-black uppercase transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[8px_8px_0_#000]"
            >
              Vedi chi ci mette le mani
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="border-2 border-black bg-black">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
              alt="Team"
              className="h-[420px] w-full object-cover opacity-90 grayscale"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border-2 border-black bg-[#DFFF00] p-5">
              <div className="display text-5xl leading-none">01</div>
              <p className="mt-3 text-xs font-black uppercase leading-5 tracking-[0.12em]">
                Mandaci il problema.
              </p>
            </div>

            <div className="border-2 border-black bg-white p-5">
              <div className="display text-5xl leading-none">02</div>
              <p className="mt-3 text-xs font-black uppercase leading-5 tracking-[0.12em]">
                Ti diciamo cosa fare prima.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPage({
  onNavigate,
  onOpenService,
}: {
  onNavigate: (page: Page) => void;
  onOpenService: (item: Service) => void;
}) {
  return (
    <section className="px-5 py-16 md:px-8 xl:px-10">
      <div className="mb-8 flex items-center justify-between border-b-2 border-black pb-5">
        <Tag>servizi</Tag>
        <span className="hidden text-xs font-black uppercase tracking-[0.18em] md:block">meno testo, più esempi</span>
      </div>

      <BigTitle className="max-w-6xl">
        Costruiamo
        <br />
        direzioni.
        <br />
        Non pezzi
        <br />
        sparsi.
      </BigTitle>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {services.map((service, index) => (
          <button
            key={service.id}
            onClick={() => onOpenService(service)}
            className="group grid min-h-[360px] overflow-hidden border-2 border-black bg-white text-left transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#000] md:grid-cols-[.48fr_.52fr]"
          >
            <div className="relative bg-black">
              <img
                src={service.image}
                alt={service.title}
                className="theme-photo h-full min-h-[260px] w-full object-cover grayscale transition duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 display text-6xl leading-none text-[#DFFF00]">0{index + 1}</div>
            </div>

            <div className="p-6">
              <h2 className="display-wide text-5xl">{service.title}</h2>
              <p className="mt-5 text-sm font-black uppercase leading-6 tracking-[0.08em] text-[#FF2DA0]">{service.line}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.points.map((point) => (
                  <span key={point} className="border border-black px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em]">
                    {point}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-black/70">{service.output}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-4">
        <button
          onClick={() => onNavigate("Contatti")}
          className="border-2 border-black bg-black px-6 py-4 text-sm font-black uppercase text-white transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0_#FF2DA0]"
        >
          Ok, aiutami
        </button>
        <button
          onClick={() => onNavigate("Metodo")}
          className="border-2 border-black bg-white px-6 py-4 text-sm font-black uppercase transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0_#DFFF00]"
        >
          Prima spiegami come
        </button>
      </div>
    </section>
  );
}

function MethodPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const rows = [
    ["01", "Audit", "Brand, sito, offerta, funnel, contenuti.", "Problemi veri."],
    ["02", "Direction", "Priorità, tono, target, messaggio.", "Direzione unica."],
    ["03", "Build", "Identity, sito, contenuti, campagne, tool.", "Roba viva."],
    ["04", "Launch", "Online, leggibile, usabile, misurabile.", "Roba reale."],
    ["05", "Push", "Dati, test, correzioni, ottimizzazione.", "Crescita."],
  ];

  return (
    <section className="min-h-screen bg-[#DFFF00] px-5 py-16 md:px-8 xl:px-10">
      <div className="mb-8 flex items-center justify-between border-b-2 border-black pb-5">
        <Tag variant="black">metodo</Tag>
        <span className="hidden text-xs font-black uppercase tracking-[0.18em] md:block">from mess to traction</span>
      </div>

      <BigTitle>
        Prima
        <br />
        pensiamo.
        <br />
        Poi facciamo
        <br />
        casino.
      </BigTitle>

      <div className="mt-14 grid gap-4">
        {rows.map(([number, title, action, output]) => (
          <div key={number} className="grid border-2 border-black bg-[#F3F0E9] md:grid-cols-[120px_1fr_260px]">
            <div className="flex items-center justify-center border-b-2 border-black bg-black p-5 text-[#DFFF00] md:border-b-0 md:border-r-2">
              <div className="display text-6xl">{number}</div>
            </div>
            <div className="border-b-2 border-black p-6 md:border-b-0 md:border-r-2">
              <h2 className="display-wide text-5xl">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-black/80">{action}</p>
            </div>
            <div className="p-6">
              <div className="text-xs font-black uppercase tracking-[0.14em] text-black/40">output</div>
              <p className="mt-3 text-sm font-black uppercase leading-6">{output}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => onNavigate("Contatti")}
        className="mt-12 border-2 border-black bg-black px-7 py-4 text-sm font-black uppercase text-white"
      >
        Ok, smontami il problema
      </button>
    </section>
  );
}


function PluginsPage({
  onOpen,
  onNavigate,
}: {
  onOpen: (item: PluginItem) => void;
  onNavigate: (page: Page) => void;
}) {
  return (
    <section className="min-h-screen bg-white px-5 py-16 text-black md:px-8 xl:px-10">
      <div className="mb-8 flex items-center justify-between border-b-2 border-black pb-5">
        <Tag variant="blue">syncro plugins</Tag>
        <span className="hidden text-xs font-black uppercase tracking-[0.18em] md:block">product family</span>
      </div>

      <div className="grid gap-12 xl:grid-cols-[.82fr_1.18fr]">
        <div>
          <BigTitle>
            Tool nostri.
            <br />
            Problemi tuoi
            <br />
            risolti.
          </BigTitle>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-black/80">
            Una product family interna per contenuti, preventivi, lead e flussi digitali. Non sostituisce l’agenzia. La potenzia.
          </p>

          <button
            onClick={() => onNavigate("Contatti")}
            className="mt-8 border-2 border-black bg-black px-6 py-4 text-sm font-black uppercase text-white transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0_#0F6BFF]"
          >
            Voglio una soluzione, non un accrocchio
          </button>
        </div>

        <div className="grid gap-5">
          {plugins.map((plugin) => (
            <button key={plugin.id} onClick={() => onOpen(plugin)} className="text-left">
              <div className="grid gap-5 border-2 border-black bg-[#F7F7F5] p-5 transition hover:bg-[#DFFF00] md:grid-cols-[.8fr_1.2fr]">
                <div>
                  <div className="soft text-6xl font-black tracking-[-0.08em]">{plugin.name}</div>
                  <div
                    className="mt-3 inline-flex px-4 py-2 text-lg font-black uppercase"
                    style={{ background: plugin.color, color: plugin.color === "#DFFF00" ? "#000" : "#fff" }}
                  >
                    {plugin.label}
                  </div>
                  <p className="mt-4 text-xs font-black uppercase leading-5 tracking-[0.12em] text-black/70">{plugin.line}</p>
                </div>

                <PluginMockup plugin={plugin} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkPage({
  onOpen,
  onNavigate,
}: {
  onOpen: (item: ProjectItem) => void;
  onNavigate: (page: Page) => void;
}) {
  return (
    <section className="px-5 py-16 md:px-8 xl:px-10">
      <div className="mb-8 flex items-center justify-between border-b-2 border-black pb-5">
        <Tag variant="pink">portfolio clienti</Tag>
        <span className="hidden text-xs font-black uppercase tracking-[0.18em] md:block">prove, non parole</span>
      </div>

      <BigTitle>
        Roba fatta.
        <br />
        Non rendering
        <br />
        motivazionali.
      </BigTitle>

      <p className="mt-8 max-w-3xl text-lg leading-8 text-black/80">
        Alcuni progetti. Alcune botte. Alcune soddisfazioni. Nessun “coming soon” eterno.
      </p>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onOpen(project)}
            className="group relative h-[460px] overflow-hidden border-2 border-black bg-black text-left text-white"
          >
            <img
              src={project.image}
              alt={project.title}
              className="theme-photo absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div>
                <Tag>{project.tag}</Tag>
              </div>
              <div>
                <h2 className="display-wide text-5xl">{project.title}</h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/80">{project.text}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-4">
        <button
          onClick={() => onNavigate("Contatti")}
          className="border-2 border-black bg-black px-6 py-4 text-sm font-black uppercase text-white transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0_#DFFF00]"
        >
          Il mio caso è peggio
        </button>
        <button
          onClick={() => onNavigate("Servizi")}
          className="border-2 border-black bg-white px-6 py-4 text-sm font-black uppercase transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0_#FF2DA0]"
        >
          Torna ai servizi, codardo
        </button>
      </div>
    </section>
  );
}

function TeamPage({
  onNavigate,
  onOpenRole,
}: {
  onNavigate: (page: Page) => void;
  onOpenRole: (item: RoleItem) => void;
}) {
  return (
    <section className="min-h-screen bg-black px-5 py-14 text-white md:px-8 xl:px-10">
      <div className="mb-8 flex items-center justify-between border-b border-white/30 pb-5">
        <div className="flex items-center gap-4">
          <Tag variant="black">team</Tag>
          <Tag>7 verticali</Tag>
        </div>
        <div className="hidden text-xs font-black uppercase tracking-[0.18em] text-white/70 theme-muted md:block">
          not normal / useful
        </div>
      </div>

      <h1 className="display-tight max-w-6xl text-[72px] leading-[0.9] text-white md:text-[132px]">
        Nessuno normale.
        <br />
        Tutti utili.
      </h1>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => (
          <HomeMemberCard key={role.id} role={role} onClick={() => onOpenRole(role)} />
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-4 border-t border-white/30 pt-10">
        <button
          onClick={() => onNavigate("Contatti")}
          className="border-2 border-white bg-white px-6 py-4 text-sm font-black uppercase text-black transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0_#FF2DA0]"
        >
          Parliamone
        </button>
        <button
          onClick={() => onNavigate("Servizi")}
          className="border-2 border-white bg-transparent px-6 py-4 text-sm font-black uppercase text-white transition hover:bg-[#DFFF00] hover:text-black"
        >
          Vedi cosa facciamo
        </button>
      </div>
    </section>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [need, setNeed] = useState("branding");

  return (
    <section className="px-5 py-16 md:px-8 xl:px-10">
      <div className="mb-8 flex items-center justify-between border-b-2 border-black pb-5">
        <Tag>contatti</Tag>
        <span className="hidden text-xs font-black uppercase tracking-[0.18em] md:block">send the mess</span>
      </div>

      <BigTitle>
        Hai qualcosa
        <br />
        da mettere
        <br />
        in Syncro?
      </BigTitle>

      <div className="mt-10 grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
        <div>
          <div className="relative border-2 border-black bg-black p-6 text-white">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
              alt="Creative team working"
              className="theme-photo h-[360px] w-full object-cover grayscale"
            />
            <div className="mt-6">
              <Tag variant="white">brief / project / help</Tag>
            </div>
            <p className="mt-6 text-sm leading-7 text-white/80">
              Scrivici se vuoi branding, sito, ecommerce, campagna, plugin o una doccia fredda creativa.
            </p>
          </div>
        </div>

        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <input className="border-2 border-black bg-transparent p-4 text-sm outline-none transition focus:bg-white" placeholder="Nome / Brand" />
          <input className="border-2 border-black bg-transparent p-4 text-sm outline-none transition focus:bg-white" placeholder="Email" />
          <select
            value={need}
            onChange={(event) => setNeed(event.target.value)}
            className="border-2 border-black bg-transparent p-4 text-sm outline-none transition focus:bg-white"
          >
            <option value="branding">Mi serve branding</option>
            <option value="website">Mi serve un sito</option>
            <option value="ecommerce">Mi serve ecommerce</option>
            <option value="marketing">Mi serve marketing</option>
            <option value="plugin">Mi serve un plugin / tool</option>
            <option value="confused">Non lo so, ma qualcosa fa schifo</option>
          </select>
          <textarea
            className="min-h-[180px] border-2 border-black bg-transparent p-4 text-sm outline-none transition focus:bg-white"
            placeholder="Raccontaci il problema. Senza poesia."
          />
          <button className="border-2 border-black bg-black p-5 text-sm font-black uppercase text-white transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[8px_8px_0_#FF2DA0]">
            Invia e speriamo bene
          </button>

          {submitted ? (
            <div className="border-2 border-black bg-[#DFFF00] p-4 text-sm font-black uppercase">
              Ricevuto. Il form in preview finge, ma almeno finge bene.
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function ProjectModal({ item, onClose }: { item: ProjectItem | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-5">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto border-2 border-black bg-[#F3F0E9] p-6 shadow-[10px_10px_0_#DFFF00] md:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 border-2 border-black bg-black px-4 py-2 text-sm font-black uppercase text-white">
          Chiudi
        </button>

        <div className="mb-5">
          <Tag variant="pink">{item.tag}</Tag>
        </div>

        <h3 className="display-wide max-w-2xl text-5xl md:text-7xl">{item.title}</h3>
        <img src={item.image} alt={item.title} className="mt-8 h-[320px] w-full border-2 border-black object-cover" />
        <p className="mt-8 text-base leading-8 text-black/80">{item.text}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {item.bullets.map((bullet) => (
            <div key={bullet} className="border-2 border-black bg-white p-4">
              <div className="text-xs font-black uppercase tracking-[0.14em]">risultato</div>
              <div className="mt-2 text-sm leading-7">{bullet}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PluginModal({ item, onClose }: { item: PluginItem | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-5">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-auto border-2 border-black bg-white p-6 shadow-[10px_10px_0_#FF2DA0] md:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 border-2 border-black bg-black px-4 py-2 text-sm font-black uppercase text-white">
          Chiudi
        </button>

        <div className="mb-6">
          <Tag variant="blue">syncro plugins</Tag>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <h3 className="soft text-7xl font-black tracking-[-0.08em] md:text-9xl">{item.name}</h3>
          <div
            className="soft px-4 py-2 text-2xl font-black uppercase"
            style={{ background: item.color, color: item.color === "#DFFF00" ? "#000" : "#fff" }}
          >
            {item.label}
          </div>
        </div>

        <p className="mt-4 text-sm font-black uppercase tracking-[0.14em]">{item.line}</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="border-2 border-black bg-[#F3F0E9] p-5">
            <div className="text-xs font-black uppercase tracking-[0.14em]">per chi</div>
            <p className="mt-3 text-sm leading-7">{item.forWho}</p>
          </div>
          <div className="border-2 border-black bg-[#F3F0E9] p-5">
            <div className="text-xs font-black uppercase tracking-[0.14em]">cosa fa</div>
            <p className="mt-3 text-sm leading-7">{item.does}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {item.features.map((feature) => (
            <div key={feature} className="border-2 border-black bg-white p-4">
              <div className="text-xs font-black uppercase tracking-[0.14em]">feature</div>
              <div className="mt-2 text-sm leading-7">{feature}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceModal({ item, onClose }: { item: Service | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-5">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto border-2 border-black bg-[#F3F0E9] p-6 shadow-[10px_10px_0_#DFFF00] md:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 border-2 border-black bg-black px-4 py-2 text-sm font-black uppercase text-white">
          Chiudi
        </button>

        <Tag variant="pink">servizio</Tag>
        <h3 className="display-wide mt-6 text-6xl md:text-8xl">{item.title}</h3>
        <p className="mt-6 max-w-2xl text-lg font-black uppercase leading-8">{item.line}</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="border-2 border-black bg-white p-5">
            <div className="text-xs font-black uppercase tracking-[0.14em] text-black/50">problema</div>
            <p className="mt-3 text-sm leading-7">{item.problem}</p>
          </div>
          <div className="border-2 border-black bg-[#DFFF00] p-5">
            <div className="text-xs font-black uppercase tracking-[0.14em] text-black/50">output</div>
            <p className="mt-3 text-sm leading-7">{item.output}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {item.points.map((point) => (
            <span key={point} className="border-2 border-black bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em]">
              {point}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoleModal({ item, onClose }: { item: RoleItem | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-5">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-auto border-2 border-black bg-[#F3F0E9] p-6 shadow-[10px_10px_0_#FF2DA0] md:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 border-2 border-black bg-black px-4 py-2 text-sm font-black uppercase text-white">
          Chiudi
        </button>

        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="overflow-hidden border-2 border-black bg-black">
            <img src={item.image} alt={item.title} className="theme-photo h-[360px] w-full object-cover grayscale" />
          </div>

          <div>
            <Tag variant="black">team role</Tag>
            <div className="mt-6 flex flex-wrap items-end gap-5">
              <div className="display text-8xl leading-none" style={{ color: item.color }}>
                {item.number}
              </div>
              <div>
                <h3 className="display-wide text-6xl md:text-8xl">{item.title}</h3>
                <p className="mt-3 text-sm font-black uppercase tracking-[0.14em]">{item.short}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="border-2 border-black bg-white p-5">
                <div className="text-xs font-black uppercase tracking-[0.14em] text-black/50">da solo</div>
                <p className="mt-3 text-lg font-black uppercase leading-8">{item.human}</p>
              </div>
              <div className="border-2 border-black p-5" style={{ background: item.color }}>
                <div className="text-xs font-black uppercase tracking-[0.14em] text-black/50">sul progetto</div>
                <p className="mt-3 text-lg font-black uppercase leading-8">{item.project}</p>
              </div>
            </div>

            <div className="mt-8 inline-flex rotate-[-2deg] border-2 border-black bg-black px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-white">
              {item.badge}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
