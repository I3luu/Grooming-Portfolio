import { useEffect, useState } from 'react';
import { ShapePhysics } from './components/drops/shape-physics';
import { RefractedText } from './components/drops/refracted-text';
import { ChromaticButton } from './components/drops/chromatic-button';
import { FanGallery } from './components/drops/fan-gallery';
import { SoapBubbleButton, SoapBubbleMenu, SoapBubbleSurface } from './components/drops/soap-bubble';
import { about, beforeAfter, gallery, profile, specialties, testimonials, type Photo } from './content';

const nav = [
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#before-after', label: 'Before & After' },
  { href: '#specialties', label: 'Specialties' },
  { href: '#contact', label: 'Contact' },
];

// Pastel 3D shapes that tumble in, pile up and follow the cursor.
const shapeColors = ['#ff5fa8', '#ff8cc6', '#b69cff', '#ffb38a', '#7fe3c4', '#ffe27a'];
const pinkButton = { colorMode: 'gradient-3', color: '#ff3d9a', color2: '#b69cff', color3: '#ffb38a' } as const;

const chipColors = ['bg-bubblegum/30', 'bg-lavender/30', 'bg-peach/35', 'bg-mint/35', 'bg-butter/45'];
const cardShadow = 'shadow-[0_14px_40px_-22px_rgba(138,61,120,0.5)]';

function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 0c.6 5.8 2.2 8.8 5 10.4 1.6.9 3.9 1.4 7 1.6-5.8.6-8.8 2.2-10.4 5-.9 1.6-1.4 3.9-1.6 7-.6-5.8-2.2-8.8-5-10.4C5.4 12.7 3.1 12.2 0 12c5.8-.6 8.8-2.2 10.4-5 .9-1.6 1.4-3.9 1.6-7z" />
    </svg>
  );
}

function Paw({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <ellipse cx="6" cy="9" rx="2.2" ry="2.8" />
      <ellipse cx="10" cy="5.5" rx="2.2" ry="2.8" />
      <ellipse cx="14.5" cy="5.5" rx="2.2" ry="2.8" />
      <ellipse cx="18.5" cy="9" rx="2.2" ry="2.8" />
      <path d="M12.2 11c-3 0-6.2 4.4-6.2 7 0 1.9 1.6 2.6 3 2.2 1.2-.3 2-.9 3.2-.9s2 .6 3.2.9c1.4.4 3-.3 3-2.2 0-2.6-3.2-7-6.2-7z" />
    </svg>
  );
}

function SectionLabel({ children, title, sub }: { children: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 sm:mb-12">
      <p className="mb-3 flex items-center gap-2 text-sm font-bold tracking-widest text-hotpink uppercase">
        <Sparkle className="h-4 w-4" />
        {children}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-base text-berry/85 sm:text-lg">{sub}</p>}
    </div>
  );
}

// Pink-tinted soap film for the nav bubbles.
// Frosted liquid glass: light blur, a faint white tint, and a refracting rim.
// For a milkier bar raise liquidDensity/liquidBlur; for a clearer one lower them.
const navGlass = { surface: 'liquid-glass', liquidDensity: 0.04, liquidTint: 0.35, liquidBlur: 8, liquidSaturation: 1.8, liquidBrightness: 1.08, liquidBend: 2, liquidRimWidth: 30, liquidSplit: 0.2 } as const;
const bubbleMaterial = {
  environment: 'soft',
  iridescence: 0.6,
  soapPalette: 'custom',
  soapPaletteRed: '#ff6fb5',
  soapPaletteGold: '#ffe27a',
  soapPaletteGreen: '#7fe3c4',
  soapPaletteCyan: '#c9a8ff',
  soapPaletteBlue: '#b69cff',
  soapPaletteViolet: '#ff8cc6',
  ...navGlass,
} as const;

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const seen = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let best = '';
        let ratio = 0;
        seen.forEach((r, id) => {
          if (r > ratio) [best, ratio] = [id, r];
        });
        setActive(best);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const navIds = nav.map((n) => n.href.slice(1));
const goTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

function Header() {
  const active = useActiveSection(navIds);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <SoapBubbleSurface
        as="nav"
        aria-label="Main"
        {...bubbleMaterial}
        radius={9999}
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 pr-2 pl-5"
      >
        <a href="#top" className="flex shrink-0 items-center gap-1.5 font-display text-lg font-bold text-hotpink">
          <Paw className="h-5 w-5 text-lavender" />
          {profile.brand}
        </a>
        <ul className="hidden items-center gap-1 text-sm font-bold text-berry [text-shadow:0_0_10px_rgba(255,255,255,0.9)] md:flex">
          {nav.map((n) => {
            const on = active === n.href.slice(1);
            return (
              <li key={n.href}>
                <a
                  href={n.href}
                  aria-current={on ? 'true' : undefined}
                  className={`block rounded-full px-3.5 py-2 transition-colors ${
                    on ? 'bg-hotpink text-white shadow-[0_6px_16px_-6px_rgba(255,61,154,0.8)]' : 'hover:bg-white/70 hover:text-hotpink'
                  }`}
                >
                  {n.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <SoapBubbleButton
              {...bubbleMaterial}
              tint="#ff3d9a"
              className="px-5 py-2.5 text-sm font-bold !text-white"
              onClick={() => window.open(profile.instagram, '_blank', 'noopener')}
            >
              Book a groom ♡
            </SoapBubbleButton>
          </div>
          <div className="md:hidden">
            <SoapBubbleMenu
              {...bubbleMaterial}
              round
              align="end"
              tint="#ff3d9a"
              panelMaterial={{ tint: '#fff6fa' }}
              label={<span className="text-xl leading-none text-white">☰</span>}
              triggerLabel="Open menu"
              items={[
                ...nav.map((n) => ({ label: n.label, onSelect: () => goTo(n.href) })),
                { label: 'Book a groom ♡', onSelect: () => window.open(profile.instagram, '_blank', 'noopener') },
              ]}
            />
          </div>
        </div>
      </SoapBubbleSurface>
    </header>
  );
}

function useIsSmall() {
  const [small, setSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setSmall(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return small;
}

function useCoarsePointer() {
  const [coarse] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);
  return coarse;
}

function Hero() {
  const small = useIsSmall();
  const touch = useCoarsePointer();
  return (
    <section id="top" className="relative">
      <div className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-[#ffe0ef] via-[#f3e6ff] to-[#ffe9dc]">
        <div aria-hidden className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-bubblegum/35 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute top-1/4 -right-24 h-[26rem] w-[26rem] rounded-full bg-lavender/35 blur-3xl" />
        <ShapePhysics
          className="!absolute inset-0"
          background="transparent"
          colors={shapeColors}
          count={small ? 9 : 20}
          size={small ? 34 : 46}
          sizeVariation={0.3}
          gravity={1100}
          restitution={0.55}
          interactive={!touch}
          aria-label="Playful pastel shapes. Drag one around or click empty space to add more."
        />
        <div className="pointer-events-none relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-5 pt-24 pb-36 sm:pb-40 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <img
              src={profile.heroImage}
              alt="Kacey grooming a fluffy white dog"
              className="mb-5 h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg lg:hidden"
            />
            <p className="pointer-events-auto mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/75 px-4 py-1.5 text-sm font-bold text-berry shadow-sm">
              <Paw className="h-4 w-4 text-hotpink" />
              {profile.role} · {profile.location}
            </p>
            <h1 aria-label={profile.name} className="-ml-1 flex w-full flex-col">
              {profile.name
                .toUpperCase()
                .split(' ')
                .map((word) => (
                  <RefractedText
                    key={word}
                    text={word}
                    theme="light"
                    topColor="#ff3d9a"
                    bottomColor="#a46bff"
                    spectrumWarmColor="#ff8cc6"
                    spectrumMiddleColor="#ffe27a"
                    spectrumCoolColor="#b69cff"
                    stagger={0.4}
                    fontFamily="'Fredoka', 'Arial Rounded MT Bold', 'Arial Black', sans-serif"
                    fontWeight={700}
                    fontSize="clamp(3.2rem, 10vw, 8rem)"
                  />
                ))}
            </h1>
            <p className="pointer-events-auto mt-5 max-w-xl text-base font-semibold text-plum/85 sm:mt-6 sm:text-xl">{profile.tagline}</p>
            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-10">
              <ChromaticButton {...pinkButton} onClick={() => document.getElementById('gallery')?.scrollIntoView()}>
                See the grooms ♡
              </ChromaticButton>
              <a href={profile.instagram} target="_blank" rel="noreferrer" className="font-bold text-berry underline-offset-4 hover:text-hotpink hover:underline">
                Book on Instagram ↗
              </a>
            </div>
          </div>
          <div className="pointer-events-auto relative mx-auto hidden w-full max-w-md lg:block">
            <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-white/45" />
            <img
              src={profile.heroImage}
              alt="Kacey grooming a fluffy white dog"
              className="relative aspect-[4/5] w-full -rotate-2 rounded-[2.5rem] border-[6px] border-white object-cover shadow-[0_30px_60px_-25px_rgba(138,61,120,0.6)]"
            />
            <span className="absolute -bottom-5 -left-6 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display font-semibold text-hotpink shadow-lg">
              <Sparkle className="h-4 w-4 text-butter" /> 7 years of happy pups
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:py-16 sm:py-24">
      <SectionLabel title="Hi, I'm Kacey!">About me</SectionLabel>
      <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-12">
        <div>
          <div className="space-y-5 text-base leading-relaxed sm:space-y-6 sm:text-lg text-plum/90">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
            {about.highlights.map((h, i) => (
              <li key={h.big} className={`rounded-3xl px-2 py-4 text-center sm:p-4 ${chipColors[i]}`}>
                <p className="font-display text-base font-bold text-hotpink sm:text-2xl">{h.big}</p>
                <p className="mt-1 text-[11px] leading-tight font-bold text-berry sm:text-sm">{h.small}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-sm">
          <div className="absolute -inset-3 -rotate-3 rounded-[2.5rem] bg-gradient-to-br from-bubblegum to-lavender opacity-60" />
          <img src={about.image} alt="Kacey with a client dog" className="relative aspect-[4/5] w-full rotate-1 rounded-[2.5rem] border-[6px] border-white object-cover" />
        </div>
      </div>
    </section>
  );
}

function Lightbox({ photo, onClose }: { photo: Photo | null; onClose: () => void }) {
  useEffect(() => {
    if (!photo) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [photo, onClose]);
  if (!photo) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={photo.alt} onClick={onClose} className="fixed inset-0 z-[60] flex items-center justify-center bg-plum/80 p-4 backdrop-blur-sm">
      <button aria-label="Close" onClick={onClose} className="absolute top-4 right-5 text-4xl text-white hover:text-bubblegum">
        ×
      </button>
      <figure onClick={(e) => e.stopPropagation()} className="max-h-full">
        <img src={photo.src} alt={photo.alt} className="max-h-[85vh] max-w-full rounded-3xl border-[6px] border-white object-contain" />
        {photo.caption && <figcaption className="mt-3 text-center font-display text-lg text-white">{photo.caption}</figcaption>}
      </figure>
    </div>
  );
}

function Gallery() {
  const [active, setActive] = useState<Photo | null>(null);
  const small = useIsSmall();
  return (
    <section id="gallery" className="relative scroll-mt-24 overflow-hidden bg-blush/70 py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lavender/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-peach/40 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionLabel title="Fresh cuts & happy pups" sub="A look at some of my favorite grooms. Tap any photo to see it big.">
          Gallery
        </SectionLabel>
        <div className="mb-8 overflow-hidden sm:mb-16">
          <FanGallery
            items={gallery.slice(0, 7).map((p) => ({ src: p.src, alt: p.alt }))}
            entrance="deal"
            cardWidth={small ? 120 : 200}
            aspectRatio={0.75}
            tilt={14}
            ariaLabel="Featured grooms"
          />
        </div>
        <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
          {gallery.map((p) => (
            <li key={p.src} className="mb-3 break-inside-avoid sm:mb-4">
              <button onClick={() => setActive(p)} className={`group block w-full overflow-hidden rounded-2xl border-[3px] border-white bg-white text-left sm:rounded-3xl sm:border-4 ${cardShadow}`}>
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full transition duration-500 group-hover:scale-105" />
                {p.caption && <span className="block px-3 py-2 font-display text-sm font-semibold text-hotpink sm:text-base">{p.caption}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox photo={active} onClose={() => setActive(null)} />
    </section>
  );
}

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [value, setValue] = useState(50);
  return (
    <div className={`relative aspect-[4/5] touch-pan-y overflow-hidden rounded-[2rem] border-[6px] sm:aspect-[3/4] border-white bg-white select-none ${cardShadow}`}>
      <img src={after} alt="After groom" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <img
        src={before}
        alt="Before groom"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        draggable={false}
      />
      <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-berry">Before</span>
      <span className="absolute top-4 right-4 rounded-full bg-hotpink px-3 py-1 text-sm font-bold text-white">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow" style={{ left: `${value}%` }}>
        <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-hotpink shadow-lg">
          <Paw className="h-5 w-5" />
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label="Drag to compare before and after photos"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

function BeforeAfter() {
  return (
    <section id="before-after" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:py-16 sm:py-24">
      <SectionLabel title="Before & after" sub="Drag the slider to see the transformation.">
        Glow ups
      </SectionLabel>
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 sm:gap-8">
        {beforeAfter.map((pair) => (
          <BeforeAfterSlider key={pair.before} {...pair} />
        ))}
      </div>
    </section>
  );
}

function Specialties() {
  return (
    <section id="specialties" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-lavender/25 via-blush/60 to-peach/30 py-16 sm:py-24">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:gap-12">
        <div>
          <SectionLabel title="What I love to groom">My specialties</SectionLabel>
          <div className="space-y-5 text-base leading-relaxed sm:text-lg text-plum/90">
            {specialties.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {specialties.tags.map((t, i) => (
              <li key={t} className={`rounded-full px-4 py-2 text-sm font-bold text-berry ${chipColors[i % chipColors.length]}`}>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {specialties.images.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className={`aspect-[3/4] w-full rounded-[2rem] border-[6px] border-white object-cover ${cardShadow} ${i === 0 ? '-rotate-2' : 'mt-6 rotate-2 sm:mt-10'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const cards = testimonials.length ? testimonials : null;
  return (
    <section id="testimonials" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:py-16 sm:py-24">
      <SectionLabel title="Kind words from pet parents">Testimonials</SectionLabel>
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {cards
          ? cards.map((t) => (
              <figure key={t.name} className={`rounded-[2rem] bg-white p-7 ${cardShadow}`}>
                <p className="font-display text-4xl leading-none text-bubblegum">“</p>
                <blockquote className="mt-2 text-plum/90">{t.quote}</blockquote>
                <figcaption className="mt-4 font-bold text-hotpink">
                  {t.name}
                  {t.pet && <span className="font-semibold text-berry/70"> · {t.pet}</span>}
                </figcaption>
              </figure>
            ))
          : [0, 1, 2].map((i) => (
              <div key={i} className={`flex flex-col items-center justify-center gap-2 rounded-[2rem] border-2 border-dashed border-bubblegum/70 p-6 text-center sm:gap-3 sm:p-10 ${chipColors[i]}`}>
                <Paw className="h-8 w-8 text-hotpink" />
                <p className="font-display text-xl font-semibold">Coming soon</p>
                <p className="text-sm font-semibold text-berry/80">Reviews from happy pups are on the way.</p>
              </div>
            ))}
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    { label: 'Instagram', value: profile.instagramHandle, href: profile.instagram },
    profile.phone && { label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    profile.email && { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  ].filter(Boolean) as { label: string; value: string; href: string }[];
  return (
    <section id="contact" className="relative scroll-mt-20 px-3">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] shadow-[0_30px_80px_-30px_rgba(255,61,154,0.6)]">
        <div className="relative bg-gradient-to-br from-hotpink via-bubblegum to-lavender">
          <div aria-hidden className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-peach/60 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-lavender/70 blur-3xl" />
          <Sparkle className="pointer-events-none absolute top-12 right-[12%] h-10 w-10 text-white/80" />
          <Sparkle className="pointer-events-none absolute right-[22%] bottom-16 h-6 w-6 text-butter" />
          <Sparkle className="pointer-events-none absolute top-1/2 right-[6%] h-5 w-5 text-white/70" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-plum/25 via-plum/5 to-transparent" />
          <div className="relative flex min-h-[26rem] flex-col justify-center px-6 py-12 sm:min-h-[32rem] sm:py-16 text-white sm:px-14">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
              <Sparkle className="h-4 w-4" /> Get in touch
            </p>
            <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(75,24,64,0.35)] sm:text-6xl">
              Ready for a fresh new look? Let's book your pup in.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <ChromaticButton entrance="none" {...pinkButton} onClick={() => window.open(profile.instagram, '_blank', 'noopener')}>
                Message me on Instagram
              </ChromaticButton>
            </div>
            <ul className="mt-10 flex flex-wrap gap-3">
              {items.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target="_blank" rel="noreferrer" className="block rounded-2xl bg-white/90 px-5 py-3 text-berry shadow-md transition hover:-translate-y-0.5 hover:bg-white">
                    <span className="block text-xs font-bold tracking-widest text-hotpink uppercase">{c.label}</span>
                    <span className="font-bold">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm font-semibold text-berry sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.brand} <span className="text-hotpink">♡</span>
        </p>
        <a href={profile.instagram} target="_blank" rel="noreferrer" className="hover:text-hotpink">
          Instagram {profile.instagramHandle}
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <BeforeAfter />
        <Specialties />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
