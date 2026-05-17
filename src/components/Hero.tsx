export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Children learning at Aashiyan"
          className="w-full h-full object-cover object-center"
        />
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-slate-800/60 to-amber-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-xs font-semibold px-4 py-2 rounded-full mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Community School &amp; Daycare for Migrant Children
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up animate-delay-100">
          A Safe Space to<br />
          <span className="text-amber-300">Learn, Grow</span>
          <br />
          &amp; Dream
        </h1>

        <p className="text-white/85 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200">
          Supporting the children of migrant workers with education, meals,
          care, and community — because every child deserves a warm place to belong.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
          <a
            href="#donate"
            className="bg-amber-400 hover:bg-amber-500 text-white font-bold text-base px-8 py-4 rounded-full transition-all hover:shadow-xl hover:-translate-y-1 shadow-lg"
          >
            Support A Child
          </a>
          <a
            href="#volunteer"
            className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border-2 border-white/40 hover:border-white/60 text-white font-bold text-base px-8 py-4 rounded-full transition-all hover:-translate-y-1"
          >
            Volunteer With Us
          </a>
        </div>

        {/* Scroll nudge */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-fade-in-up animate-delay-500">
          <span className="text-white/50 text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 69.3C120 58.7 240 37.3 360 32C480 26.7 600 37.3 720 42.7C840 48 960 48 1080 42.7C1200 37.3 1320 26.7 1380 21.3L1440 16V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#FAFAF8"/>
        </svg>
      </div>
    </section>
  );
}
