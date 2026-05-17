import { useScrollReveal } from '../hooks/useScrollReveal';

const photos = [
  {
    src: 'https://images.pexels.com/photos/8612952/pexels-photo-8612952.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Children drawing and painting',
    caption: 'Creative time',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/8612988/pexels-photo-8612988.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Children in classroom learning',
    caption: 'Classroom learning',
    span: 'md:col-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/8535230/pexels-photo-8535230.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Teacher interacting with students',
    caption: 'Teacher time',
    span: 'md:col-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/8613014/pexels-photo-8613014.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Children having lunch together',
    caption: 'Meal time',
    span: 'md:col-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Group activity and play',
    caption: 'Group activities',
    span: 'md:col-span-1',
  },
];

export default function Gallery() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="gallery" className="py-24 px-5 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-rose-50 text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Daily Life at Aashiyan
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Moments that matter
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Every day at Aashiyan is filled with laughter, learning, and the joy of being cared for.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {photos.map((p, i) => (
            <GalleryItem key={i} photo={p} delay={i * 100} />
          ))}
        </div>

        {/* Quote below gallery */}
        <div className="mt-14 bg-white rounded-3xl shadow-sm border border-slate-100 px-8 py-8 text-center max-w-2xl mx-auto">
          <p className="font-display text-xl text-slate-700 italic leading-relaxed mb-4">
            "When a child walks into Aashiyan, they leave their worries at the door and carry hope on their shoulders."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-amber-300" />
            <span className="text-slate-400 text-sm font-semibold">Priya Didi, Lead Teacher</span>
            <div className="w-8 h-px bg-amber-300" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  photo,
  delay,
}: {
  photo: (typeof photos)[0];
  delay: number;
}) {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`relative group overflow-hidden rounded-2xl shadow-sm transition-all duration-600 ${photo.span} ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
        style={{ minHeight: '180px' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-white text-xs font-semibold bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {photo.caption}
        </span>
      </div>
    </div>
  );
}
