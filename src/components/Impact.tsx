import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Users, UtensilsCrossed, Shield, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 340,
    suffix: '+',
    label: 'Children Supported',
    description: 'Across 3 locations in the city',
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    iconBg: 'bg-sky-100',
  },
  {
    icon: UtensilsCrossed,
    value: 85000,
    suffix: '+',
    label: 'Meals Served',
    description: 'Hot, nutritious meals every day',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
  },
  {
    icon: Shield,
    value: 1,
    suffix: ' Safe Space',
    label: 'Safe Learning Space',
    description: 'A warm nest for every child',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
  },
  {
    icon: Globe,
    value: 120,
    suffix: '+',
    label: 'Community Volunteers',
    description: 'Neighbours who show up with love',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    iconBg: 'bg-rose-100',
  },
];

function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const { ref, visible } = useScrollReveal(0.2);
  const count = useCounter(stat.value, visible);
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      className={`${stat.bg} rounded-3xl p-7 text-center transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`${stat.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5`}>
        <Icon size={24} className={stat.color} />
      </div>
      <div className={`font-display text-4xl font-bold ${stat.color} mb-1`}>
        {stat.value >= 1000
          ? `${(count / 1000).toFixed(count >= stat.value ? 0 : 1)}k`
          : stat.value === 1
          ? count
          : count}
        <span className="text-2xl">{stat.suffix}</span>
      </div>
      <div className="text-slate-800 font-bold text-base mb-1">{stat.label}</div>
      <div className="text-slate-500 text-sm">{stat.description}</div>
    </div>
  );
}

export default function Impact() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="impact" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-emerald-50 text-emerald-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Our Impact
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Small numbers. Enormous lives.
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Each number below is a child who ate, learned, laughed, and felt safe — because of you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-14 rounded-3xl overflow-hidden relative">
          <img
            src="https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Children at Aashiyan"
            className="w-full h-52 sm:h-64 object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-sky-900/50 to-transparent flex items-center">
            <div className="px-10 max-w-sm">
              <p className="font-display text-xl text-white italic leading-relaxed mb-3">
                "Every child at Aashiyan is proof that kindness changes everything."
              </p>
              <span className="text-sky-200 text-sm font-semibold">— Our community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
