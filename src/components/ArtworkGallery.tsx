import { useScrollReveal } from '../hooks/useScrollReveal';

const artworks = [
  {
    url: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Rainbow Dreams',
    artist: 'Priya, Age 6',
  },
  {
    url: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'My Family',
    artist: 'Arjun, Age 7',
  },
  {
    url: 'https://images.pexels.com/photos/3945697/pexels-photo-3945697.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'The Garden',
    artist: 'Zara, Age 5',
  },
  {
    url: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'My Home',
    artist: 'Isha, Age 8',
  },
  {
    url: 'https://images.pexels.com/photos/3945719/pexels-photo-3945719.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Butterfly Friends',
    artist: 'Rohan, Age 6',
  },
  {
    url: 'https://images.pexels.com/photos/3938044/pexels-photo-3938044.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Happy Day',
    artist: 'Neha, Age 7',
  },
];

export default function ArtworkGallery() {
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
          <div className="inline-block bg-rose-50 text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Creativity
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Child artwork gallery
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Every creation tells a story. Through art, children express their emotions, dreams, and world.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art, i) => {
            const { ref: itemRef, visible: itemVisible } = useScrollReveal(0.1);
            return (
              <div
                key={art.title}
                ref={itemRef}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`group rounded-3xl overflow-hidden shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                  itemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  <img
                    src={art.url}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <h3 className="font-display font-bold text-lg mb-1">{art.title}</h3>
                    <p className="text-white/90 text-sm">{art.artist}</p>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <h3 className="font-display font-bold text-slate-800 text-lg mb-1">{art.title}</h3>
                  <p className="text-slate-500 text-sm">{art.artist}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
