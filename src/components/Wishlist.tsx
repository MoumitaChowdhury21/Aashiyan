import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Heart, Check } from 'lucide-react';

interface WishItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  icon: string;
  color: string;
  bgColor: string;
}

const wishItems: WishItem[] = [
  {
    id: 'books',
    name: 'Books & Story Books',
    description: 'Colorful picture books and story books in Hindi and English for all ages',
    quantity: 50,
    unit: 'books',
    icon: '📚',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
  },
  {
    id: 'stationery',
    name: 'Stationery Supplies',
    description: 'Pencils, crayons, notebooks, coloring books, and drawing supplies',
    quantity: 200,
    unit: 'sets',
    icon: '✏️',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'toys',
    name: 'Educational Toys',
    description: 'Age-appropriate toys for learning, play, and development (blocks, puzzles, etc.)',
    quantity: 30,
    unit: 'pieces',
    icon: '🧩',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
  {
    id: 'clothes',
    name: 'Clothes & Shoes',
    description: 'School uniforms, shoes, and seasonal clothing in various sizes (2-9 years)',
    quantity: 100,
    unit: 'pieces',
    icon: '👕',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'nutrition',
    name: 'Nutritious Food',
    description: 'Rice, lentils, vegetables, milk, and other essentials for daily meals',
    quantity: 500,
    unit: 'kg',
    icon: '🍎',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'medical',
    name: 'Medical Supplies',
    description: 'First aid kits, hygiene products, vitamins, and health essentials',
    quantity: 20,
    unit: 'kits',
    icon: '🏥',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
];

export default function Wishlist() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { ref, visible } = useScrollReveal();

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleDonate = () => {
    if (selectedItems.length === 0) {
      alert('Please select items you would like to donate.');
      return;
    }
    const selected = wishItems.filter((item) => selectedItems.includes(item.id));
    const message = `I would like to donate: ${selected.map((i) => i.name).join(', ')}`;
    window.location.href = `mailto:donate@aashiyan.org?subject=Donation Request&body=${encodeURIComponent(message)}`;
  };

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
          <div className="inline-block bg-rose-50 text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Monthly Needs
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            What we need this month
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            These are the items that help us care for and educate children every day. Your donation makes a direct impact.
          </p>
        </div>

        {/* Wishlist items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {wishItems.map((item, i) => {
            const { ref: itemRef, visible: itemVisible } = useScrollReveal(0.1);
            const isSelected = selectedItems.includes(item.id);

            return (
              <div
                key={item.id}
                ref={itemRef}
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => toggleItem(item.id)}
                className={`${item.bgColor} rounded-3xl p-6 cursor-pointer transition-all duration-700 border-2 hover:shadow-lg hover:-translate-y-1 ${
                  itemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isSelected ? 'border-sky-400 ring-2 ring-sky-100' : 'border-transparent'}`}
              >
                {/* Checkbox */}
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{item.icon}</div>
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-sky-400 border-sky-400'
                        : 'border-slate-300 hover:border-sky-400'
                    }`}
                  >
                    {isSelected && <Check size={16} className="text-white" />}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-slate-800 text-lg mb-2">{item.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>

                {/* Quantity needed */}
                <div className="bg-white rounded-xl px-4 py-2 inline-block">
                  <span className="text-slate-800 font-bold text-sm">
                    {item.quantity} {item.unit} needed
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-3xl p-8 border border-rose-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">
                {selectedItems.length > 0
                  ? `You've selected ${selectedItems.length} item${selectedItems.length !== 1 ? 's' : ''}`
                  : 'Select items to donate'}
              </h3>
              <p className="text-slate-600 text-base">
                Every item helps us provide better care and education for our children.
              </p>
            </div>
            <button
              onClick={handleDonate}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Heart size={18} />
              {selectedItems.length > 0 ? 'Donate Selected' : 'View Items'}
            </button>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-10 bg-sky-50 border border-sky-200 rounded-2xl px-6 py-4 text-center">
          <p className="text-sky-800 text-sm">
            <span className="font-bold">Can't find what you want to donate?</span> Contact us at{' '}
            <a href="mailto:donate@aashiyan.org" className="underline hover:no-underline">
              donate@aashiyan.org
            </a>{' '}
            and we'll help you find the perfect way to contribute.
          </p>
        </div>
      </div>
    </section>
  );
}
