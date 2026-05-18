import { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'What We Do', href: '#whatwedo' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Impact', href: '#impact' },
  { label: 'Blog', href: '#blog' },
  { label: 'Get Involved', href: '#getinvolved' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Heart size={14} className="text-white fill-white animate-heartbeat" />
          </div>
          <span
            className={`font-display font-bold text-xl tracking-wide transition-colors ${
              scrolled ? 'text-slate-800' : 'text-white'
            }`}
          >
            Aashiyan
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-colors hover:text-amber-500 ${
                scrolled ? 'text-slate-600' : 'text-white/90'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#donate"
            className="bg-amber-400 hover:bg-amber-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            Support Now
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/20'
          }`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t border-slate-100 px-5 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-slate-700 font-semibold py-2 hover:text-amber-500 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#donate"
            onClick={() => setOpen(false)}
            className="block text-center bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 rounded-full mt-2 transition-colors"
          >
            Support Now
          </a>
        </div>
      )}
    </header>
  );
}
