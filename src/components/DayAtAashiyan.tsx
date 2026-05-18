import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const dayImages = [
  {
    url: 'https://images.pexels.com/photos/8612988/pexels-photo-8612988.jpeg?auto=compress&cs=tinysrgb&w=1200',
    caption: 'Morning learning circle — children engaged in collaborative activities',
  },
  {
    url: 'https://images.pexels.com/photos/8612952/pexels-photo-8612952.jpeg?auto=compress&cs=tinysrgb&w=1200',
    caption: 'Lunch time — every child gets a nutritious, freshly prepared meal',
  },
  {
    url: 'https://images.pexels.com/photos/8535230/pexels-photo-8535230.jpeg?auto=compress&cs=tinysrgb&w=1200',
    caption: 'Art and creative expression — exploring feelings through creation',
  },
  {
    url: 'https://images.pexels.com/photos/8613014/pexels-photo-8613014.jpeg?auto=compress&cs=tinysrgb&w=1200',
    caption: 'Playtime and outdoor activities — building confidence and friendships',
  },
];

export default function DayAtAashiyan() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, visible } = useScrollReveal();

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dayImages.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + dayImages.length) % dayImages.length);
  };

  const currentImage = dayImages[currentIndex];

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
          <div className="inline-block bg-amber-50 text-amber-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Daily Life
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            A day at Aashiyan
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            From sunrise activities to afternoon care, every moment is designed with love and intention.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main image */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl mb-6">
            <img
              src={currentImage.url}
              alt={currentImage.caption}
              className="w-full h-96 sm:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
              <p className="font-display text-xl sm:text-2xl font-bold">{currentImage.caption}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={goToPrev}
              className="w-12 h-12 bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center flex-1">
              {dayImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-16 w-16 rounded-xl overflow-hidden transition-all border-2 ${
                    i === currentIndex
                      ? 'border-sky-400 ring-2 ring-sky-200'
                      : 'border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-full flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Indicator */}
          <div className="text-center mt-6 text-slate-500 text-sm font-medium">
            {currentIndex + 1} / {dayImages.length}
          </div>
        </div>
      </div>
    </section>
  );
}
