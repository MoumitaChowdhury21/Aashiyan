import { BookOpen, Utensils, Home, Heart, Palette, Users } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Joyful, play-based learning for early childhood and primary grades with caring teachers.',
    color: 'bg-sky-50',
    iconColor: 'text-sky-500',
    iconBg: 'bg-sky-100',
  },
  {
    icon: Utensils,
    title: 'Nutritious Meals',
    description: 'A warm breakfast and hearty lunch every day — because a fed child is a learning child.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-100',
  },
  {
    icon: Home,
    title: 'Safe Daycare',
    description: 'A secure, supervised space while parents work — giving families peace of mind every day.',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
  },
  {
    icon: Heart,
    title: 'Emotional Support',
    description: 'Trained counselors and caring staff who listen, comfort, and build each child\'s confidence.',
    color: 'bg-rose-50',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-100',
  },
  {
    icon: Palette,
    title: 'Creative Learning',
    description: 'Art, music, storytelling, and play that nurture imagination and self-expression.',
    color: 'bg-teal-50',
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-100',
  },
  {
    icon: Users,
    title: 'Community Care',
    description: 'A network of volunteers, donors, and neighbors who rally around every child we serve.',
    color: 'bg-orange-50',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-100',
  },
];

export default function Services() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="services" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-sky-50 text-sky-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            What We Provide
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Everything a child needs to flourish
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            From morning meals to bedtime stories, we wrap every child in the care they deserve.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  delay,
}: {
  service: (typeof services)[0];
  delay: number;
}) {
  const { ref, visible } = useScrollReveal(0.1);
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${service.color} rounded-3xl p-7 group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`${service.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
        <Icon size={22} className={service.iconColor} />
      </div>
      <h3 className="text-slate-800 font-bold text-lg mb-2">{service.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
    </div>
  );
}
