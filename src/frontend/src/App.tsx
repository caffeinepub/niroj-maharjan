import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpRight,
  ExternalLink,
  Instagram,
  Linkedin,
  Loader2,
  Monitor,
  Package,
  Palette,
  Twitter,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiBehance } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitContact } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    id: 1,
    title: "Zenith Brand Identity",
    tags: ["Branding", "Logo"],
    image: "/assets/generated/project-zenith.dim_600x400.jpg",
    year: "2025",
  },
  {
    id: 2,
    title: "Kawa Coffee Packaging",
    tags: ["Packaging", "Print"],
    image: "/assets/generated/project-kawa.dim_600x400.jpg",
    year: "2025",
  },
  {
    id: 3,
    title: "Nova UI Kit",
    tags: ["Digital", "UI/UX"],
    image: "/assets/generated/project-nova.dim_600x400.jpg",
    year: "2024",
  },
  {
    id: 4,
    title: "Forma Print Campaign",
    tags: ["Print", "Editorial"],
    image: "/assets/generated/project-forma.dim_600x400.jpg",
    year: "2024",
  },
  {
    id: 5,
    title: "Pulse App Branding",
    tags: ["Branding", "Digital"],
    image: "/assets/generated/project-pulse.dim_600x400.jpg",
    year: "2024",
  },
  {
    id: 6,
    title: "Terra Visual Identity",
    tags: ["Branding", "Packaging"],
    image: "/assets/generated/project-terra.dim_600x400.jpg",
    year: "2023",
  },
];

const SERVICES = [
  {
    icon: Palette,
    title: "Brand Identity",
    desc: "Crafting cohesive visual systems — logos, color palettes, typography — that define and differentiate your brand in a crowded market.",
  },
  {
    icon: Monitor,
    title: "Digital Design",
    desc: "Designing intuitive UI/UX experiences, web interfaces, and digital assets that engage users and elevate your online presence.",
  },
  {
    icon: Package,
    title: "Print & Packaging",
    desc: "Bringing brands to life in the physical world with thoughtfully designed print collateral, packaging, and environmental graphics.",
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const submitContact = useSubmitContact();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3 },
    );
    const sections = document.querySelectorAll("section[id]");
    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitContact.mutateAsync(formData);
      toast.success("Message sent! I'll get back to you shortly.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans">
      <Toaster position="top-center" />

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-section border-b border-dark-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Brand */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="font-serif text-lg font-semibold text-dark-primary tracking-tight cursor-pointer"
            data-ocid="header.link"
          >
            Niroj Maharjan
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`text-xs uppercase tracking-widest font-medium transition-colors duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-dark-primary"
                    : "text-dark-muted hover:text-dark-primary"
                }`}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex">
            <Button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="rounded-full text-xs uppercase tracking-widest font-medium px-5 h-9 bg-dark-text text-dark-bg hover:bg-dark-text/90 transition-all"
              data-ocid="header.contact.button"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-dark-primary p-2"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="header.mobile_menu.toggle"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-current transition-all ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-dark-section border-t border-dark-card overflow-hidden"
            >
              <nav className="px-6 py-4 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-xs uppercase tracking-widest font-medium text-dark-muted hover:text-dark-primary transition-colors"
                    data-ocid={`mobile.nav.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  type="button"
                  onClick={() => scrollTo("#contact")}
                  className="rounded-full text-xs uppercase tracking-widest w-fit px-5 h-9 bg-dark-text text-dark-bg"
                  data-ocid="mobile.contact.button"
                >
                  Get in Touch
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ── */}
        <section
          id="home"
          className="bg-dark-section pt-16 min-h-screen flex items-center"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:max-w-none shadow-card-dark">
                  <img
                    src="/assets/generated/niroj-portrait.dim_600x800.jpg"
                    alt="Niroj Maharjan — Graphic Designer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium">
                      Graphic Designer · Kathmandu
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 w-16 h-16 border border-white/20 rounded-full" />
                  <div className="absolute top-7 right-7 w-10 h-10 border border-white/10 rounded-full" />
                </div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 lg:right-8 bg-dark-card border border-dark-card rounded-xl p-4 shadow-card-dark"
                >
                  <p className="text-xs uppercase tracking-widest text-dark-muted font-medium">
                    Available for
                  </p>
                  <p className="text-sm font-semibold text-dark-primary mt-0.5">
                    Freelance Work
                  </p>
                </motion.div>
              </motion.div>

              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="order-1 lg:order-2"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-dark-muted font-medium mb-6">
                  Designer & Visual Storyteller
                </p>
                <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-primary leading-[1.05] mb-6">
                  Creative
                  <br />
                  <em className="not-italic">Brands</em> &amp;
                  <br />
                  Visual
                  <br />
                  Worlds
                </h1>
                <p className="text-dark-muted text-base lg:text-lg leading-relaxed mb-10 max-w-md">
                  Crafting brands and experiences that leave a lasting
                  impression. 5+ years turning ideas into compelling visual
                  identities.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    type="button"
                    onClick={() => scrollTo("#work")}
                    className="rounded-full px-7 h-12 bg-[oklch(0.94_0_0)] text-[oklch(0.12_0_0)] hover:bg-white text-sm uppercase tracking-widest font-medium transition-all"
                    data-ocid="hero.explore_work.button"
                  >
                    Explore Work
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => scrollTo("#services")}
                    className="rounded-full px-7 h-12 border-[oklch(0.94_0_0)/30] text-dark-primary bg-transparent hover:bg-white/10 text-sm uppercase tracking-widest font-medium transition-all"
                    data-ocid="hero.view_services.button"
                  >
                    View Services
                  </Button>
                </div>

                {/* Stats */}
                <div className="mt-14 pt-8 border-t border-dark-card flex gap-10">
                  {[
                    { num: "5+", label: "Years Experience" },
                    { num: "80+", label: "Projects Delivered" },
                    { num: "30+", label: "Happy Clients" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-serif text-3xl font-bold text-dark-primary">
                        {stat.num}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-dark-muted mt-1 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SELECTED PROJECTS ── */}
        <section id="work" className="bg-cream-section py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-cream-muted font-medium mb-4">
                Portfolio
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-cream-primary">
                Selected Projects
              </h2>
            </motion.div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              data-ocid="projects.list"
            >
              {PROJECTS.map((project, i) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card-cream hover:shadow-card-cream-lift transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  data-ocid={`projects.item.${i + 1}`}
                >
                  <div className="relative overflow-hidden aspect-[3/2]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 rounded-full p-2">
                        <ArrowUpRight className="w-4 h-4 text-[oklch(0.12_0_0)]" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-cream-primary mb-2 group-hover:text-[oklch(0.2_0.01_165)] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs font-medium tracking-wide rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="bg-dark-section py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-dark-muted font-medium mb-4">
                What I Do
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark-primary">
                My Services
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-dark-card border border-dark-card rounded-2xl p-8 shadow-card-dark hover:border-[oklch(0.45_0.01_165)] transition-all duration-300 group"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.2_0.01_165)] flex items-center justify-center mb-6 group-hover:bg-[oklch(0.25_0.01_165)] transition-colors">
                    <service.icon
                      className="w-6 h-6 text-dark-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-dark-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-dark-muted text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT + CONTACT ── */}
        <section id="about" className="bg-cream-section py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* About card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl p-8 lg:p-10 shadow-card-cream"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-cream-muted font-medium mb-6">
                  About Me
                </p>
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src="/assets/generated/niroj-portrait.dim_600x800.jpg"
                      alt="Niroj Maharjan"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-cream-primary">
                      About Niroj
                    </h2>
                    <p className="text-sm text-cream-muted mt-1">
                      Graphic Designer, Kathmandu
                    </p>
                  </div>
                </div>
                <p className="text-cream-primary text-[15px] leading-relaxed mb-4">
                  I'm a graphic designer with 5+ years of experience creating
                  compelling visual identities for brands across Asia and
                  Europe. My work sits at the intersection of strategy and
                  aesthetics — I believe great design doesn't just look good, it
                  solves real problems.
                </p>
                <p className="text-cream-muted text-[15px] leading-relaxed mb-8">
                  I've worked with startups, established businesses, and
                  cultural institutions, bringing each brand's unique story to
                  life through thoughtful, intentional design. Specialities:
                  brand identity, packaging, editorial, and digital design.
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-[oklch(0.14_0.008_165)] text-[oklch(0.94_0_0)] px-6 py-3 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-[oklch(0.2_0.01_165)] transition-colors cursor-pointer"
                  data-ocid="about.download_cv.button"
                >
                  Download CV
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </motion.div>

              {/* Contact card */}
              <motion.div
                id="contact"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card rounded-2xl p-8 lg:p-10 shadow-card-cream"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-cream-muted font-medium mb-6">
                  Get in Touch
                </p>
                <h2 className="font-serif text-2xl font-bold text-cream-primary mb-2">
                  Let's Work Together
                </h2>
                <p className="text-cream-muted text-sm mb-8 leading-relaxed">
                  Have a project in mind? I'd love to hear about it.
                </p>

                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-4"
                  data-ocid="contact.form"
                >
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-name"
                      className="text-xs uppercase tracking-widest text-cream-muted font-medium"
                    >
                      Name
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      className="bg-background border-border text-cream-primary placeholder:text-cream-muted/60 rounded-xl h-11"
                      data-ocid="contact.name.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-email"
                      className="text-xs uppercase tracking-widest text-cream-muted font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      className="bg-background border-border text-cream-primary placeholder:text-cream-muted/60 rounded-xl h-11"
                      data-ocid="contact.email.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-message"
                      className="text-xs uppercase tracking-widest text-cream-muted font-medium"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      rows={4}
                      className="bg-background border-border text-cream-primary placeholder:text-cream-muted/60 rounded-xl resize-none"
                      data-ocid="contact.message.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitContact.isPending}
                    className="w-full rounded-full h-11 bg-[oklch(0.14_0.008_165)] text-[oklch(0.94_0_0)] hover:bg-[oklch(0.2_0.01_165)] text-sm uppercase tracking-widest font-medium transition-all mt-2"
                    data-ocid="contact.submit.button"
                  >
                    {submitContact.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                  {submitContact.isSuccess && (
                    <p
                      className="text-center text-sm text-green-700 font-medium"
                      data-ocid="contact.success_state"
                    >
                      ✓ Message sent successfully!
                    </p>
                  )}
                  {submitContact.isError && (
                    <p
                      className="text-center text-sm text-red-600 font-medium"
                      data-ocid="contact.error_state"
                    >
                      Failed to send. Please try again.
                    </p>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-dark-section border-t border-dark-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-xl font-bold text-dark-primary mb-3">
                Niroj Maharjan
              </h3>
              <p className="text-dark-muted text-sm leading-relaxed max-w-xs">
                Graphic designer crafting brands and visual experiences that
                resonate.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-16 md:justify-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-dark-muted font-medium mb-4">
                  Navigate
                </p>
                <nav className="flex flex-col gap-2.5">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="text-sm text-dark-muted hover:text-dark-primary transition-colors"
                      data-ocid={`footer.${link.label.toLowerCase()}.link`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Social */}
            <div className="md:text-right">
              <p className="text-xs uppercase tracking-widest text-dark-muted font-medium mb-4">
                Find Me On
              </p>
              <div className="flex gap-3 md:justify-end">
                {[
                  {
                    icon: Instagram,
                    label: "Instagram",
                    href: "https://instagram.com",
                  },
                  {
                    icon: SiBehance,
                    label: "Behance",
                    href: "https://behance.net",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    href: "https://linkedin.com",
                  },
                  {
                    icon: Twitter,
                    label: "Twitter",
                    href: "https://twitter.com",
                  },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-dark-card border border-dark-card flex items-center justify-center text-dark-muted hover:text-dark-primary hover:border-[oklch(0.45_0.01_165)] transition-all"
                    data-ocid={`footer.${label.toLowerCase()}.link`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-dark-card pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dark-muted">
            <p>
              © {new Date().getFullYear()} Niroj Maharjan. All rights reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-dark-primary transition-colors"
            >
              Built with ♥ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
