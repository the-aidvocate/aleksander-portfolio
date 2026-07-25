import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Search,
  Zap,
  Globe,
  CheckCircle2,
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
  MonitorSmartphone,
  Check,
  ChevronRight
} from 'lucide-react'
import FloatingLines from './components/FloatingLines'
import LineSidebar from './components/LineSidebar'
import GradientText from './components/GradientText'
import Chatbot from './components/Chatbot'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'The 48H Process', href: '#process' },
  { label: 'My Services', href: '#services' },
  { label: 'Get Free Preview', href: '#contact' },
]

const SERVICES = [
  {
    icon: MonitorSmartphone,
    title: 'Custom Web Design',
    text: 'Modern, fully responsive websites that look perfect on mobile devices, tablets, and massive desktop screens.',
  },
  {
    icon: CheckCircle2,
    title: 'Restaurant Integrations',
    text: 'Direct ordering buttons for Wolt, Foody, and Bolt Food. Embedded Google Maps so diners find your location instantly.',
  },
  {
    icon: Phone,
    title: 'Service Businesses',
    text: '1-click WhatsApp buttons connecting directly to your number. Beautiful custom photo galleries showcasing your real work.',
  },
  {
    icon: Zap,
    title: 'AI Chatbot Setup',
    text: 'A smart 24/7 chatbot on your site to answer customer FAQs instantly and capture new client leads while you sleep.',
  },
  {
    icon: Search,
    title: 'Local SEO Optimization',
    text: 'I configure your site structure so Google actually finds you. Outrank your local competitors and capture search traffic.',
  },
  {
    icon: Globe,
    title: 'Google Business Setup',
    text: 'I can integrate your new website directly with a Google Business Profile to dominate your local map search results.',
  },
]

// Animated Counter
function CountUp({ target, duration = 1800, suffix = "" }) {
  const [count, setCount] = useState(0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(target)
              }
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elemRef}>{count}{suffix}</span>
}

// Interactive Feature 1 — Code Brackets Animation
function CodeBracketsAnim() {
  const [statusIdx, setStatusIdx] = useState(0)
  const statuses = [
    { text: 'Compiling DOM structure...', label: 'INIT', tone: 'primary' },
    { text: 'Applying responsive Tailwind CSS classes', label: 'STYLING', tone: 'accent' },
    { text: 'Optimizing local SEO metadata headers', label: 'SEO', tone: 'primary' },
    { text: 'Website build complete. 100/100 Lighthouse', label: 'DEPLOYED', tone: 'emerald' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => (idx + 1) % statuses.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const status = statuses[statusIdx]
  const toneText = status.tone === 'emerald' ? 'text-emerald-500' : status.tone === 'accent' ? 'text-accent' : 'text-primary'

  return (
    <div className="relative h-44 w-full rounded-3xl overflow-hidden border border-divider p-5 flex flex-col justify-between bg-white shadow-sm">
      <div className="flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-primary" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary font-bold">Live Editor</span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center font-mono text-5xl font-black opacity-10 text-primary pointer-events-none">
        &lt; / &gt;
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center gap-2 px-2">
        <div className="h-2.5 w-3/4 rounded-full bg-divider overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-primary/40 w-full animate-[pulse_2s_ease-in-out_infinite]" />
        </div>
        <div className="h-2.5 w-1/2 rounded-full bg-divider overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-accent/40 w-full animate-[pulse_2.5s_ease-in-out_infinite]" />
        </div>
        <div className="h-2.5 w-5/6 rounded-full bg-divider overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-primary/20 w-full animate-[pulse_3s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="flex items-center justify-between z-20 pt-2 border-t border-divider">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`font-mono text-[9px] truncate tracking-tight font-medium ${toneText}`}>
            {status.text}
          </span>
        </div>
        <span className={`font-mono text-[9px] uppercase tracking-[0.15em] whitespace-nowrap pl-2 font-bold ${toneText}`}>
          {status.label}
        </span>
      </div>
    </div>
  )
}

// Custom Cyprus Logo (New PNG Image)
function CyprusLogo({ className = "h-14 sm:h-16 w-auto" }) {
  return (
    <div className={`${className} flex-shrink-0 flex items-center`}>
      <img src="/logo aleksander.png" alt="Aleksander in Cyprus Logo" className="max-w-full max-h-full object-contain drop-shadow-md" />
    </div>
  )
}

// 1. Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300 ${scrolled ? 'glass shadow-lg border-primary/10' : 'bg-white/50 backdrop-blur-sm border border-transparent'}`}>
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <CyprusLogo />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
              <span className="font-display font-black text-lg tracking-tight text-ink">Aleksander</span>
              <span className="font-handwritten text-xl text-primary -mt-1 sm:mt-0">in Cyprus</span>
            </div>
          </a>
          
          <div className="flex items-center gap-3">
            <a href="#contact" className="magnetic-btn hidden sm:inline-flex items-center gap-1 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all">
              Claim Free Preview <ArrowUpRight className="h-3 w-3" />
            </a>
            {/* The primary Menu button that triggers the LineSidebar overlay */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)} 
              className="flex items-center gap-2 bg-surface border border-divider hover:border-primary/50 text-ink px-4 py-2 rounded-full font-bold text-xs transition-all shadow-sm"
            >
              {mobileOpen ? (
                <><X className="h-4 w-4" /> Close</>
              ) : (
                <><Menu className="h-4 w-4" /> Menu</>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* The LineSidebar Full-Screen Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center pl-8 sm:pl-24 lg:pl-48 ${mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="max-w-2xl w-full">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold mb-8 block ml-[60px]">Navigation</span>
          <LineSidebar 
            items={NAV_LINKS.map(l => l.label)} 
            onItemClick={(idx) => {
              window.location.hash = NAV_LINKS[idx].href;
              setMobileOpen(false);
            }} 
            accentColor="#148DDC" 
            textColor="#0F172A" 
            markerColor="#94A3B8" 
            fontSize={2.5}
            itemGap={32}
            markerLength={40}
          />
        </div>
      </div>
    </>
  )
}

// 2. Hero
function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-meta, .hero-cta', { y: 24, opacity: 0, duration: 0.8, delay: 0.8, stagger: 0.12 })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden flex flex-col justify-center bg-white pt-20 pb-16 lg:pb-0">
      
      {/* FloatingLines on Bright Background */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-multiply">
        <FloatingLines 
          linesGradient={['#148DDC', '#37B5F5', '#08D8A2', '#0E6BA8']}
          bendRadius={5.0}
          lineCount={[10, 8, 12]}
          interactive={false}
          parallax={true}
          mixBlendMode="multiply"
        />
      </div>

      <div className="absolute top-1/4 right-0 w-[40%] h-[40%] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 mt-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-surface border border-divider px-3 py-1.5 rounded-full mb-6 mx-auto lg:mx-0 shadow-sm">
             <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="font-mono text-[9px] uppercase tracking-widest text-ink font-bold">Accepting Local Clients</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black text-ink tracking-tighter leading-[0.95] max-w-2xl mx-auto lg:mx-0">
            <span className="hero-line-1 block mb-2">Stop Losing To</span>
            <GradientText 
              colors={["#148DDC", "#08D8A2", "#37B5F5"]} 
              animationSpeed={4} 
              className="hero-line-2 font-serif italic pb-2 text-5xl sm:text-7xl mx-auto lg:mx-0"
            >
              Your Competitors.
            </GradientText>
          </h1>
          <p className="hero-meta mt-6 text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            I'm Aleksander. I build clean, modern, SEO-optimized websites that actually bring customers to your local business. Full preview delivered in exactly 48 hours.
          </p>
          <div className="hero-cta mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="#contact" className="magnetic-btn bg-primary text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/20 text-sm">
              Get Your Free Preview <ArrowRight className="inline h-4 w-4 ml-1" />
            </a>
          </div>
        </div>

        {/* Photography / Profile Image Area */}
        <div className="hero-cta flex-1 relative max-w-xl w-full mx-auto lg:mx-0 mb-10 lg:mb-0">
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-4xl blur-2xl opacity-70" />
           <img 
             src="/487338549_2350466445322777_2085066943873777275_n.jpg" 
             alt="Aleksander in Ayia Napa" 
             className="relative z-10 w-full aspect-square sm:aspect-video object-cover object-center sm:object-right rounded-4xl border-4 border-white shadow-2xl"
           />
           {/* Floating trust badge */}
           <div className="absolute -bottom-6 lg:bottom-4 left-4 lg:-left-8 z-20 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-divider">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                 <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted">From Berlin</p>
                <p className="font-bold text-ink text-xs">Based in Ayia Napa</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}

// 3. Pillars
function Pillars() {
  return (
    <section className="relative py-16 border-y border-divider bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-divider gap-8 md:gap-0 text-center md:text-left">
        <div className="md:px-8 py-4">
          <div className="font-display font-black text-4xl text-ink mb-1 flex justify-center md:justify-start items-baseline">
            <CountUp target={48} /> <span className="text-primary ml-1">Hours</span>
          </div>
          <p className="text-xs text-muted font-mono uppercase tracking-widest font-bold">To First Preview</p>
        </div>
        <div className="md:px-8 py-4">
          <div className="font-display font-black text-4xl text-ink mb-1 flex justify-center md:justify-start items-baseline">
            <CountUp target={100} /> <span className="text-primary ml-1">%</span>
          </div>
          <p className="text-xs text-muted font-mono uppercase tracking-widest font-bold">Risk-Free Guarantee</p>
        </div>
        <div className="md:px-8 py-4">
          <div className="font-display font-black text-4xl text-ink mb-1 flex justify-center md:justify-start items-baseline">
            <CountUp target={1} /> <span className="text-primary ml-1">Focus</span>
          </div>
          <p className="text-xs text-muted font-mono uppercase tracking-widest font-bold">Getting You Customers</p>
        </div>
      </div>
    </section>
  )
}

// 4. Process (Sticky Stack)
function Process() {
  const containerRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.process-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: 'top top+=100', endTrigger: cards[cards.length - 1], end: 'top top+=120', scrub: 1 },
          scale: 0.95, opacity: 0.5, ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    { num: '01', title: 'We Talk Vision', text: 'You tell me about your local business, your ideal customers, and what makes you unique. I gather the context needed to build a site that actually converts.' },
    { num: '02', title: 'I Build (48 Hours)', text: 'I go into deep work. Within exactly 48 hours, I will send you a fully functioning, beautiful preview link of your new website. No upfront deposits needed.' },
    { num: '03', title: 'Launch & Grow', text: 'If you love the preview, we finalize it. I connect your domain, configure your Local SEO, and push it live so you start capturing Google search traffic immediately.' }
  ]

  return (
    <section id="process" ref={containerRef} className="py-24 px-6 sm:px-10 bg-white border-b border-divider">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">The 48H Process</span>
        <h2 className="font-display font-black text-4xl sm:text-5xl mt-3 mb-10 text-ink">Simple. Fast. Risk-Free.</h2>
        
        {/* Designer Vibe Hero Image */}
        <div className="relative rounded-4xl overflow-hidden shadow-xl mb-16 h-64 sm:h-96 w-full max-w-3xl mx-auto border-4 border-white">
            <img 
              src="/56158201_802646646771439_3733814644658143232_n (1).jpg" 
              alt="Aleksander Designer Space" 
              className="absolute inset-0 w-full h-full object-cover object-center" 
            />
        </div>
      </div>
      <div className="space-y-12 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <article key={i} className="process-card sticky top-24 bg-surface border border-divider rounded-4xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-8 items-center">
            <div className="font-display font-black text-[6rem] text-primary/10 leading-none">{step.num}</div>
            <div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">{step.title}</h3>
              <p className="text-muted leading-relaxed">{step.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// 5. Services Grid (Bright Theme)
function ServicesGrid() {
  return (
    <section id="services" className="bg-surface py-24 px-6 sm:px-10 border-b border-divider">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">What I Do</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-ink mt-3">Everything you need to dominate locally.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div key={i} className="bg-white p-8 rounded-3xl border border-divider shadow-sm hover:shadow-md hover:border-primary/20 transition-all group min-h-[260px] flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-ink mb-3">{svc.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{svc.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// 6. Contact / CTA
function Contact() {
  const [status, setStatus] = useState('idle')

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section id="contact" className="py-24 px-6 sm:px-10 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-ink leading-tight mb-4">
            Let's build your <br/><span className="font-serif italic text-primary">digital storefront.</span>
          </h2>
          <p className="text-muted mb-8 leading-relaxed max-w-md">
            Local businesses lose money every day because their website is outdated or invisible. Send me your details, and I will build you a free custom preview in 48 hours. You only pay if you decide to go live.
          </p>
          <CodeBracketsAnim />
        </div>
        
        <div className="bg-surface border border-divider rounded-4xl p-8 sm:p-10 shadow-lg shadow-slate-200/50">
          {status === 'sent' ? (
             <div className="text-center py-12">
               <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
               <h3 className="font-display font-bold text-2xl mb-2 text-ink">Request Received!</h3>
               <p className="text-muted">I'll review your details and reach out shortly to begin your 48-hour build.</p>
             </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <h3 className="font-display font-bold text-xl mb-4 text-ink">Request Free Preview</h3>
              <input required type="text" placeholder="Your Name" className="w-full bg-white border border-divider rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary text-ink" />
              <input required type="email" placeholder="Email Address" className="w-full bg-white border border-divider rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary text-ink" />
              <input required type="tel" placeholder="Phone Number" className="w-full bg-white border border-divider rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary text-ink" />
              <input required type="text" placeholder="Business Name / Industry" className="w-full bg-white border border-divider rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary text-ink" />
              <button type="submit" disabled={status==='sending'} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-md hover:bg-primary-dark transition-colors">
                {status === 'sending' ? 'Sending...' : 'Start My 48H Build'}
              </button>
              <p className="text-[10px] text-muted text-center mt-2 uppercase tracking-widest font-bold">100% Risk Free • No Credit Card Required</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// 7. Footer
function Footer() {
  return (
    <footer className="bg-deep text-white py-16 px-6 sm:px-10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
        <CyprusLogo className="h-12 w-12" />
        <p className="text-white/50 text-xs mt-2">
          Built with precision by Aleksander. Serving local businesses from Berlin to Ayia Napa.
        </p>
        <p className="text-white/30 text-[10px]">© {new Date().getFullYear()} Aleksander Web Design. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])
  
  return (
    <div className="relative selection:bg-primary selection:text-white bg-white">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <Process />
        <ServicesGrid />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
