import { useScrollReveal } from '../hooks/useScrollReveal';
import { BookOpen, Smile, Apple, Heart, ArrowRight } from 'lucide-react';
import type { ServiceType } from './WhatWeDoDetail';

const offerings: { key: ServiceType; icon: typeof BookOpen; title: string; desc: string; color: string; iconColor: string; iconBg: string }[] = [
  {
    key: 'education',
    icon: BookOpen,
    title: 'Education',
    desc: 'We provide basic education for children aged 4-9 years, especially those unable to access mainstream schooling. Every child learns at their own pace with customized teaching, building confidence, discipline, and curiosity.',
    color: 'bg-sky-50',
    iconColor: 'text-sky-600',
    iconBg: 'bg-sky-100',
  },
  {
    key: 'daycare',
    icon: Smile,
    title: 'Day Care',
    desc: 'We support younger siblings aged 1.5-3.5 years with a safe, nurturing environment. Children receive care, attention, play-based learning, and early childhood development support while parents work.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
  },
  {
    key: 'nutrition',
    icon: Apple,
    title: 'Nutrition',
    desc: 'Good nutrition is essential for learning and growth. We provide freshly prepared lunch and daily snacks to ensure children receive healthy, nourishing meals in a consistent and caring environment.',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
  },
  {
    key: 'wellbeing',
    icon: Heart,
    title: 'Mental & Physical Well-being',
    desc: 'A child learns better when they feel safe, healthy, and emotionally supported. We have in-house counselors and doctors who regularly support emotional well-being, health, hygiene, and overall development.',
    color: 'bg-rose-50',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-100',
  },
];

export default function WhatWeDo({ onServiceClick }: { onServiceClick?: (service: ServiceType) => void }) {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="whatwedo" className="py-24 px-5 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-emerald-50 text-emerald-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Our Approach
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            What We Do
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            A complete support system designed for the whole child — mind, body, and spirit.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {offerings.map((o, i) => {
            const Icon = o.icon;
            const { ref: cardRef, visible: cardVisible } = useScrollReveal(0.1);
            return (
              <div
                key={o.title}
                ref={cardRef}
              >
                <button
                  onClick={() => onServiceClick?.(o.key)}
                  style={{ transitionDelay: `${i * 100}ms` }}
                  className={`w-full group ${o.color} rounded-3xl p-8 transition-all duration-700 hover:shadow-lg hover:-translate-y-1 cursor-pointer text-left ${
                    cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                <div className={`${o.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className={o.iconColor} />
                </div>
                <h3 className="text-slate-800 font-bold text-xl mb-3 group-hover:text-slate-900 transition-colors">{o.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-4">{o.desc}</p>
                <span className="inline-flex items-center gap-2 text-sky-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={16} />
                </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
