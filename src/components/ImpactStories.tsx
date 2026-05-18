import { useScrollReveal } from '../hooks/useScrollReveal';
import { Quote } from 'lucide-react';

const stories = [
  {
    name: 'Ravi',
    age: 7,
    story:
      'Ravi arrived at Aashiyan unable to speak clearly due to a speech delay. After 8 months of consistent support from our counselor and teachers, he now participates confidently in class discussions. His mother says he comes home excited about school every day.',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Meera',
    age: 6,
    story:
      'Meera had never attended school before joining us. She was shy and struggled with basic literacy. Today, she is reading simple stories and helps younger children learn their letters. Her confidence has blossomed.',
    image: 'https://images.pexels.com/photos/3807516/pexels-photo-3807516.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Amit',
    age: 8,
    story:
      'Amit came from a family constantly moving for work. He had attended 4 different schools and felt lost. At Aashiyan, he found stability and care. He is now catching up academically and has discovered a love for drawing.',
    image: 'https://images.pexels.com/photos/3807519/pexels-photo-3807519.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Priya',
    age: 5,
    story:
      'Priya\'s family lived in a migrant worker colony with no access to early education. At Aashiyan\'s daycare, she has thrived — playing, learning numbers and letters, and developing friendships. She is now ready to enter formal school.',
    image: 'https://images.pexels.com/photos/3807515/pexels-photo-3807515.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function ImpactStories() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-sky-50 text-sky-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Real Impact
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Stories of transformation
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            These are the real stories of children whose lives have changed at Aashiyan.
          </p>
        </div>

        {/* Stories grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {stories.map((s, i) => {
            const { ref: storyRef, visible: storyVisible } = useScrollReveal(0.1);
            return (
              <div
                key={s.name}
                ref={storyRef}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`group transition-all duration-700 hover:-translate-y-1 ${
                  storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-sky-200 hover:shadow-lg transition-all">
                  {/* Quote icon */}
                  <Quote size={32} className="text-sky-200 mb-4" />

                  {/* Story text */}
                  <p className="text-slate-600 text-base leading-relaxed mb-6 italic">"{s.story}"</p>

                  {/* Child info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-sky-100 flex-shrink-0 bg-gradient-to-br from-sky-200 to-amber-200 flex items-center justify-center">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML =
                            '<span class="text-2xl text-sky-600 font-bold">👧</span>';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-slate-800">{s.name}</h3>
                      <p className="text-slate-500 text-sm">Age {s.age}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
