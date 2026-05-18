import { ArrowLeft, BookOpen, Smile, Apple, Heart, Clock, CheckCircle } from 'lucide-react';

export type ServiceType = 'education' | 'daycare' | 'nutrition' | 'wellbeing';

interface ServiceDetail {
  title: string;
  icon: typeof BookOpen;
  shortDesc: string;
  fullDesc: string;
  ageGroup: string;
  highlights: string[];
  impact: string;
  bgColor: string;
  iconBg: string;
  iconColor: string;
  coverImage: string;
}

const serviceDetails: Record<ServiceType, ServiceDetail> = {
  education: {
    title: 'Education',
    icon: BookOpen,
    shortDesc: 'Basic education for children aged 4-9 years',
    fullDesc: `We provide foundational education specifically for children who are unable to access mainstream schooling due to language barriers, lack of documents, or constant relocation. Our approach is child-centered and flexible.

Every child learns at their own pace. We customize teaching methods based on current level and gradually help them move forward with confidence. We focus not just on academics, but on building discipline, curiosity, and a love for learning.

Our curriculum includes:
- Basic literacy and numeracy
- Language development (local and Hindi)
- Life skills and communication
- Creative thinking and problem-solving
- Social and emotional learning

Teachers are trained to be patient, nurturing, and responsive to each child's unique learning style.`,
    ageGroup: '4-9 years',
    highlights: [
      'Customized pace-based learning',
      'Trained and caring teachers',
      'Focus on confidence and discipline',
      'Curriculum adapted to migrant children\'s needs',
      'Play-based learning for younger kids',
      'Bridging to mainstream schooling',
    ],
    impact: 'Children gain foundational skills, confidence in learning, and are better prepared to transition to regular schools.',
    bgColor: 'bg-sky-50',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    coverImage: 'https://images.pexels.com/photos/8612988/pexels-photo-8612988.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  daycare: {
    title: 'Day Care',
    icon: Smile,
    shortDesc: 'Safe, nurturing care for younger siblings aged 1.5-3.5 years',
    fullDesc: `Many of our students come to Aashiyan with younger siblings. While older kids learn, these little ones need supervision and care. Our daycare is designed to be a safe, loving environment where young children can grow.

We provide:
- Safe, supervised space with trained caregivers
- Play-based learning activities
- Early childhood development support
- Age-appropriate sensory and motor activities
- Healthy snacks and water throughout the day
- Emotional comfort and attachment-building

Our caregivers understand early childhood development and create an environment where children feel secure while exploring, playing, and learning.`,
    ageGroup: '1.5-3.5 years',
    highlights: [
      'Safe, supervised environment',
      'Trained caregivers',
      'Play-based learning',
      'Early development support',
      'Healthy snacks provided',
      'Emotional attachment and comfort',
    ],
    impact: 'Young children develop in a safe space while parents work. Older siblings can focus on education without worry.',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    coverImage: 'https://images.pexels.com/photos/8613014/pexels-photo-8613014.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  nutrition: {
    title: 'Nutrition',
    icon: Apple,
    shortDesc: 'Freshly prepared, healthy meals for every child every day',
    fullDesc: `Good nutrition is essential for learning, growth, and development. Many children at Aashiyan don't have access to regular, healthy meals at home. We believe a well-fed child is a learning child.

Every day we provide:
- Freshly cooked lunch prepared with fresh ingredients
- Nutritious morning and evening snacks
- Meals designed by nutrition experts
- Special attention to dietary needs and preferences
- Clean, hygienic food preparation

Our nutrition program ensures:
- Balanced meals with proteins, vegetables, and grains
- Culturally familiar foods that children enjoy
- Consistent, reliable meals every day
- Growth monitoring for each child
- Education on healthy eating habits`,
    ageGroup: 'All children (1.5 years+)',
    highlights: [
      'Fresh, home-cooked meals daily',
      'Nutritionally balanced',
      'Hygienically prepared',
      'Morning and evening snacks',
      'Growth monitoring',
      'Teaches healthy eating habits',
    ],
    impact: 'Children are better nourished, more energetic, and able to focus on learning. Growth and health improve visibly.',
    bgColor: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    coverImage: 'https://images.pexels.com/photos/8612952/pexels-photo-8612952.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  wellbeing: {
    title: 'Mental & Physical Well-being',
    icon: Heart,
    shortDesc: 'Emotional support, healthcare, and holistic development',
    fullDesc: `A child can only learn well when they feel safe, healthy, and emotionally supported. We recognize that children from migrant families often face trauma, stress, and instability. We have dedicated support.

Our wellness team includes:
- In-house counselor for emotional support and talk therapy
- Visiting doctor for health check-ups and basic medical care
- Health and hygiene education
- Trauma-informed care practices
- Safe, supportive relationships with all staff

We address:
- Emotional well-being and mental health
- Physical health and growth
- Hygiene and self-care habits
- Building resilience and coping skills
- Creating a sense of safety and belonging
- Family counseling when needed

Every child is seen as a whole person, not just a student.`,
    ageGroup: 'All children',
    highlights: [
      'In-house counselor available',
      'Regular health check-ups',
      'Trauma-informed practices',
      'Hygiene and health education',
      'Safe, supportive relationships',
      'Focus on emotional resilience',
    ],
    impact: 'Children feel safe and supported. Emotional barriers to learning are reduced. Health improves and children thrive.',
    bgColor: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    coverImage: 'https://images.pexels.com/photos/8535230/pexels-photo-8535230.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
};

export default function WhatWeDoDetail({
  service,
  onBack,
}: {
  service: ServiceType;
  onBack: () => void;
}) {
  const details = serviceDetails[service];
  const Icon = details.icon;

  return (
    <section className="bg-[#FAFAF8] py-24 px-5 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-sky-600 text-sm font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to What We Do
        </button>

        {/* Cover image */}
        <div className="rounded-3xl overflow-hidden shadow-lg mb-10">
          <img
            src={details.coverImage}
            alt={details.title}
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>

        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          <div className={`${details.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <Icon size={32} className={details.iconColor} />
          </div>
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-2">
              {details.title}
            </h1>
            <p className="text-slate-500 text-lg">{details.shortDesc}</p>
          </div>
        </div>

        {/* Age group */}
        <div className="bg-white rounded-2xl border border-slate-100 px-6 py-4 mb-10 inline-flex items-center gap-3">
          <Clock size={18} className="text-slate-400" />
          <div>
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Age Group</span>
            <div className="text-slate-800 font-bold text-lg">{details.ageGroup}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-10">
          <div className="prose-custom space-y-5">
            {details.fullDesc.split('\n').map((paragraph, i) => {
              if (!paragraph.trim()) return null;

              if (paragraph.startsWith('- ')) {
                return (
                  <li key={i} className="text-slate-600 text-base leading-relaxed ml-5">
                    {paragraph.replace('- ', '')}
                  </li>
                );
              }

              return (
                <p key={i} className="text-slate-600 text-base leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">What We Provide</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {details.highlights.map((h, i) => (
              <div
                key={i}
                className={`${details.bgColor} rounded-2xl px-6 py-4 flex items-start gap-3 border border-slate-100`}
              >
                <CheckCircle size={20} className={`${details.iconColor} flex-shrink-0 mt-0.5`} />
                <span className="text-slate-700 font-semibold text-sm">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Impact section */}
        <div className={`${details.bgColor} rounded-3xl border-l-4 border-sky-400 px-8 py-6`}>
          <h3 className="font-display text-xl font-bold text-slate-800 mb-3">The Impact</h3>
          <p className="text-slate-700 text-base leading-relaxed">{details.impact}</p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex gap-4">
          <a
            href="#getinvolved"
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-white font-bold text-center px-6 py-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Involved
          </a>
          <a
            href="#donate"
            className="flex-1 bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold text-center px-6 py-4 rounded-2xl transition-colors"
          >
            Support This Program
          </a>
        </div>
      </div>
    </section>
  );
}
