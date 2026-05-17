import { Brush, BookOpen, Package, Coffee } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ways = [
  {
    icon: BookOpen,
    title: 'Teach & Tutor',
    desc: 'Spend a few hours a week sharing knowledge with the children.',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    icon: Brush,
    title: 'Run Activities',
    desc: 'Lead art, music, yoga, storytelling, or craft sessions.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Package,
    title: 'Donate Supplies',
    desc: 'Books, stationery, clothes, or food — every bit helps.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Coffee,
    title: 'Simply Show Up',
    desc: 'Sometimes a warm smile and a listening ear is the greatest gift.',
    color: 'bg-rose-100 text-rose-600',
  },
];

export default function Volunteer() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="volunteer" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: image */}
          <div
            ref={ref}
            className={`relative transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/8535230/pexels-photo-8535230.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Volunteer teaching children"
                className="w-full h-80 md:h-[460px] object-cover"
              />
            </div>
            <div className="absolute -top-5 -right-5 w-28 h-28 rounded-full bg-amber-100/70 -z-10" />
            <div className="absolute -bottom-4 -left-4 bg-white shadow-lg rounded-2xl px-5 py-4">
              <div className="text-slate-600 text-sm font-semibold">Volunteers this year</div>
              <div className="font-display text-3xl font-bold text-amber-500 mt-0.5">120+</div>
            </div>
          </div>

          {/* Right: content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="inline-block bg-amber-50 text-amber-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
              Be Part of the Village
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
              It takes a community<br />
              <span className="text-amber-500">to raise a child.</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed mb-8">
              You don't have to be a teacher or a donor to make a difference at Aashiyan. We welcome anyone willing to give their time, skills, materials, or simply their presence. Even one hour a week can change a child's week entirely.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {ways.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="flex gap-3 items-start">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${w.color}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{w.title}</div>
                      <div className="text-slate-500 text-xs mt-0.5 leading-snug">{w.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="mailto:volunteer@aashiyan.org"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Join as Volunteer
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
