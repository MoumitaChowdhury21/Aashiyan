import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Heart, Check, X, Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WishItem {
  id: string;
  name: string;
  description: string;
  quantity_needed: number;
  unit: string;
  icon: string;
  color: string;
  bg_color: string;
  is_default?: boolean;
}

export default function Wishlist() {
  const [items, setItems] = useState<WishItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    quantity_needed: 0,
    unit: '',
    icon: '📦',
  });
  const [loading, setLoading] = useState(true);
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase.from('wishlist_items').select('*').order('is_default', { ascending: false }).order('created_at');

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      // Fallback to default items if database fails
      setItems([
        {
          id: '1',
          name: 'Books & Story Books',
          description: 'Colorful picture books and story books in Hindi and English for all ages',
          quantity_needed: 50,
          unit: 'books',
          icon: '📚',
          color: 'text-sky-600',
          bg_color: 'bg-sky-50',
        },
        {
          id: '2',
          name: 'Stationery Supplies',
          description: 'Pencils, crayons, notebooks, coloring books, and drawing supplies',
          quantity_needed: 200,
          unit: 'sets',
          icon: '✏️',
          color: 'text-amber-600',
          bg_color: 'bg-amber-50',
        },
        {
          id: '3',
          name: 'Educational Toys',
          description: 'Age-appropriate toys for learning, play, and development (blocks, puzzles, etc.)',
          quantity_needed: 30,
          unit: 'pieces',
          icon: '🧩',
          color: 'text-rose-600',
          bg_color: 'bg-rose-50',
        },
        {
          id: '4',
          name: 'Clothes & Shoes',
          description: 'School uniforms, shoes, and seasonal clothing in various sizes (2-9 years)',
          quantity_needed: 100,
          unit: 'pieces',
          icon: '👕',
          color: 'text-emerald-600',
          bg_color: 'bg-emerald-50',
        },
        {
          id: '5',
          name: 'Nutritious Food',
          description: 'Rice, lentils, vegetables, milk, and other essentials for daily meals',
          quantity_needed: 500,
          unit: 'kg',
          icon: '🍎',
          color: 'text-green-600',
          bg_color: 'bg-green-50',
        },
        {
          id: '6',
          name: 'Medical Supplies',
          description: 'First aid kits, hygiene products, vitamins, and health essentials',
          quantity_needed: 20,
          unit: 'kits',
          icon: '🏥',
          color: 'text-red-600',
          bg_color: 'bg-red-50',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.description || !newItem.unit || newItem.quantity_needed <= 0) {
      alert('Please fill in all fields with valid values');
      return;
    }

    try {
      const { error } = await supabase.from('wishlist_items').insert([
        {
          name: newItem.name,
          description: newItem.description,
          quantity_needed: newItem.quantity_needed,
          unit: newItem.unit,
          icon: newItem.icon,
          color: 'text-purple-600',
          bg_color: 'bg-purple-50',
          is_default: false,
        },
      ]);

      if (error) throw error;
      setNewItem({ name: '', description: '', quantity_needed: 0, unit: '', icon: '📦' });
      setShowAddForm(false);
      await fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .update({ quantity_needed: Math.max(0, newQuantity) })
        .eq('id', itemId);

      if (error) throw error;
      await fetchItems();
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase.from('wishlist_items').delete().eq('id', itemId);

      if (error) throw error;
      await fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const toggleSelection = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => {
      if (prev[itemId]) {
        const newSelected = { ...prev };
        delete newSelected[itemId];
        return newSelected;
      }
      return { ...prev, [itemId]: quantity };
    });
  };

  const handleDonate = () => {
    const selected = items.filter((item) => selectedItems[item.id]);
    if (selected.length === 0) {
      alert('Please select items you would like to donate.');
      return;
    }
    const message = selected
      .map((i) => `${i.name}: ${selectedItems[i.id]} ${i.unit}`)
      .join(', ');
    window.location.href = `mailto:donate@aashiyan.org?subject=Donation Request&body=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <section className="py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-500">Loading wishlist...</p>
        </div>
      </section>
    );
  }

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
            Customize quantities to match your donation or add items specific to your interest. Your donation makes a direct impact.
          </p>
        </div>

        {/* Wishlist items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {items.map((item, i) => {
            const { ref: itemRef, visible: itemVisible } = useScrollReveal(0.1);
            const isSelected = !!selectedItems[item.id];
            const isEditing = editingItem === item.id;

            return (
              <div
                key={item.id}
                ref={itemRef}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`${item.bg_color} rounded-3xl p-6 cursor-pointer transition-all duration-700 border-2 hover:shadow-lg hover:-translate-y-1 ${
                  itemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isSelected ? 'border-sky-400 ring-2 ring-sky-100' : 'border-transparent'}`}
              >
                {/* Header with checkbox and actions */}
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleSelection(item.id, item.quantity_needed)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-sky-400 border-sky-400'
                          : 'border-slate-300 hover:border-sky-400'
                      }`}
                    >
                      {isSelected && <Check size={16} className="text-white" />}
                    </button>
                    {!item.is_default && (
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="w-6 h-6 rounded-lg hover:bg-red-100 flex items-center justify-center transition-colors"
                        title="Delete item"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-slate-800 text-lg mb-2">{item.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>

                {/* Quantity needed - Editable */}
                <div className="bg-white rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-4">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={item.quantity_needed}
                        onChange={(e) => {
                          const updated = items.map((i) =>
                            i.id === item.id ? { ...i, quantity_needed: parseInt(e.target.value) || 0 } : i
                          );
                          setItems(updated);
                        }}
                        className="w-16 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:border-sky-400"
                      />
                      <span className="text-slate-600 text-sm">{item.unit}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity_needed)}
                        className="text-green-600 hover:text-green-700 transition-colors"
                        title="Save"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-slate-800 font-bold text-sm">
                        {item.quantity_needed} {item.unit} needed
                      </span>
                      <button
                        onClick={() => setEditingItem(item.id)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                        title="Edit quantity"
                      >
                        <Edit2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add new item card */}
          <div
            className={`bg-slate-50 rounded-3xl p-6 border-2 border-dashed border-slate-300 hover:border-slate-400 transition-all flex items-center justify-center min-h-[300px] cursor-pointer hover:bg-slate-100`}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <div className="text-center">
              <Plus size={32} className="text-slate-400 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">Add Custom Item</p>
            </div>
          </div>
        </div>

        {/* Add item form */}
        {showAddForm && (
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 mb-10">
            <h3 className="font-display text-xl font-bold text-slate-800 mb-6">Add a Custom Item</h3>
            <form onSubmit={addItem} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Item Name *</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., Winter Blankets"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Icon/Emoji *</label>
                <input
                  type="text"
                  value={newItem.icon}
                  onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                  placeholder="e.g., 🛏️"
                  maxLength={2}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-400 text-2xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
                <input
                  type="text"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="What is this item for?"
                  className="w-full sm:col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity Needed *</label>
                <input
                  type="number"
                  min="1"
                  value={newItem.quantity_needed || ''}
                  onChange={(e) => setNewItem({ ...newItem, quantity_needed: parseInt(e.target.value) || 0 })}
                  placeholder="e.g., 50"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Unit *</label>
                <input
                  type="text"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  placeholder="e.g., pieces, kg, sets"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="sm:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewItem({ name: '', description: '', quantity_needed: 0, unit: '', icon: '📦' });
                  }}
                  className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-3xl p-8 border border-rose-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">
                {Object.keys(selectedItems).length > 0
                  ? `You've selected ${Object.keys(selectedItems).length} item${Object.keys(selectedItems).length !== 1 ? 's' : ''}`
                  : 'Select items to donate'}
              </h3>
              <p className="text-slate-600 text-base">
                Every donation helps us provide better care and education for our children.
              </p>
            </div>
            <button
              onClick={handleDonate}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Heart size={18} />
              {Object.keys(selectedItems).length > 0 ? 'Donate Selected' : 'View Items'}
            </button>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-10 bg-sky-50 border border-sky-200 rounded-2xl px-6 py-4 text-center">
          <p className="text-sky-800 text-sm">
            <span className="font-bold">Can't find what you want to donate?</span> Add it as a custom item above or contact us at{' '}
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
