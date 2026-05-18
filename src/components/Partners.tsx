import { useScrollReveal } from '../hooks/useScrollReveal';

const partners = [
  {
    name: 'Education First',
    logo: 'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
  },
  {
    name: 'Child Care Alliance',
    logo: 'https://images.pexels.com/photos/3769710/pexels-photo-3769710.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
  },
  {
    name: 'Community Health',
    logo: 'https://images.pexels.com/photos/3769707/pexels-photo-3769707.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
  },
  {
    name: 'Hope Foundation',
    logo: 'https://images.pexels.com/photos/3769711/pexels-photo-3769711.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
  },
  {
    name: 'Nutrition Partners',
    logo: 'https://images.pexels.com/photos/3769708/pexels-photo-3769708.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
  },
  {
    name: 'Youth Empowerment',
    logo: 'https://images.pexels.com/photos/3769706/pexels-photo-3769706.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
  },
];

export default function Partners() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-24 px-5 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-emerald-50 text-emerald-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Our Network
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Partner & supporters
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Aashiyan is stronger because of our partners who share our vision for every child.
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p, i) => {
            const { ref: itemRef, visible: itemVisible } = useScrollReveal(0.1);
            return (
              <div
                key={p.name}
                ref={itemRef}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-700 p-6 flex items-center justify-center h-32 ${
                  itemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-slate-600 text-base mb-5">
            Interested in partnering with Aashiyan? We'd love to hear from you!
          </p>
          <a
            href="mailto:partners@aashiyan.org"
            className="inline-flex bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
