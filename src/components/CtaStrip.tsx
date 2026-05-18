export default function CtaStrip() {
  return (
    <section className="bg-gradient-to-r from-sky-600 to-sky-500 py-12 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug mb-6">
          Every child deserves safety, learning, and hope.<br />
          <span className="text-amber-200">Join us in making a difference.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#donate"
            className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-white font-bold text-base px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Support Aashiyan
          </a>
          <a
            href="mailto:hello@aashiyan.org"
            className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur-sm border-2 border-white/40 text-white font-bold text-base px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
