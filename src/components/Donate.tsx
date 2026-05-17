import { useState } from 'react';
import { Heart, QrCode, Smartphone, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const UPI_ID = 'aashiyan@okicici';
const UPI_NAME = 'Aashiyan+NGO';
const NOTE = 'Donation+to+Aashiyan+NGO';

const amounts = [
  { value: 100, label: '₹100', desc: 'School Supplies', icon: '📚' },
  { value: 300, label: '₹300', desc: 'Meals for a Child', icon: '🍱' },
  { value: 1000, label: '₹1000', desc: 'Monthly Support', icon: '🌟' },
];

const upiApps = [
  {
    name: 'Google Pay',
    scheme: 'gpay',
    color: 'bg-white border-2 border-slate-200 hover:border-sky-300',
    textColor: 'text-slate-700',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png',
  },
  {
    name: 'PhonePe',
    scheme: 'phonepe',
    color: 'bg-white border-2 border-slate-200 hover:border-sky-300',
    textColor: 'text-slate-700',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/2560px-PhonePe_Logo.svg.png',
  },
  {
    name: 'Paytm',
    scheme: 'paytmmp',
    color: 'bg-white border-2 border-slate-200 hover:border-sky-300',
    textColor: 'text-slate-700',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png',
  },
  {
    name: 'BHIM',
    scheme: 'bhim',
    color: 'bg-white border-2 border-slate-200 hover:border-sky-300',
    textColor: 'text-slate-700',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/BHIM_Svg_Logo.svg/800px-BHIM_Svg_Logo.svg.png',
  },
];

function buildUpiLink(scheme: string, amount: number) {
  return `${scheme}://pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${amount}&cu=INR&tn=${NOTE}`;
}

export default function Donate() {
  const { ref, visible } = useScrollReveal();
  const [selected, setSelected] = useState(300);
  const [custom, setCustom] = useState('');
  const [showQR, setShowQR] = useState(false);

  const finalAmount = custom ? parseInt(custom) || 0 : selected;
  const qrData = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&am=${finalAmount}&cu=INR&tn=${NOTE}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&bgcolor=ffffff&color=1a1a2e&margin=10`;

  return (
    <section id="donate" className="py-24 px-5 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-rose-50 text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Support Aashiyan
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Give a child their brightest tomorrow
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Your contribution — however small — provides meals, books, safety, and love to a child who needs it most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Amount selection */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
              <Heart size={18} className="text-rose-400 fill-rose-400" />
              Choose your support
            </h3>

            {/* Preset amounts */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {amounts.map((a) => (
                <button
                  key={a.value}
                  onClick={() => { setSelected(a.value); setCustom(''); }}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                    selected === a.value && !custom
                      ? 'border-amber-400 bg-amber-50 shadow-sm'
                      : 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  <span className="text-2xl mb-1">{a.icon}</span>
                  <span className="font-bold text-slate-800 text-sm">{a.label}</span>
                  <span className="text-slate-500 text-xs mt-0.5 text-center leading-tight">{a.desc}</span>
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mb-6">
              <label className="text-slate-500 text-xs font-semibold mb-2 block uppercase tracking-widest">
                Or enter custom amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl pl-8 pr-4 py-3 text-slate-700 font-semibold outline-none transition-colors"
                />
              </div>
            </div>

            {finalAmount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-5">
                <div className="text-amber-700 text-sm font-semibold">
                  You are donating{' '}
                  <span className="text-amber-600 font-bold text-base">₹{finalAmount}</span>{' '}
                  to Aashiyan NGO
                </div>
                <div className="text-amber-600 text-xs mt-0.5">100% reaches the children</div>
              </div>
            )}

            <button
              onClick={() => setShowQR(true)}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg"
            >
              <QrCode size={18} />
              Show QR to Donate
            </button>
          </div>

          {/* Right: UPI apps */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h3 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
              <Smartphone size={18} className="text-sky-500" />
              Pay directly via UPI
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Open your preferred UPI app and donate instantly.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {upiApps.map((app) => (
                <a
                  key={app.name}
                  href={buildUpiLink(app.scheme, finalAmount || 100)}
                  className={`${app.color} rounded-2xl px-4 py-4 flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer`}
                >
                  <img src={app.logo} alt={app.name} className="w-7 h-7 object-contain rounded" />
                  <span className={`${app.textColor} font-semibold text-sm`}>{app.name}</span>
                  <ChevronRight size={14} className="text-slate-400 ml-auto" />
                </a>
              ))}
            </div>

            <div className="bg-sky-50 rounded-2xl px-5 py-4">
              <div className="text-sky-800 text-xs font-semibold mb-1">UPI ID</div>
              <div className="text-sky-700 font-bold text-base font-mono">{UPI_ID}</div>
              <div className="text-sky-600 text-xs mt-1">Name: Aashiyan NGO</div>
            </div>

            <div className="mt-5 flex items-start gap-3 bg-slate-50 rounded-2xl px-5 py-4">
              <span className="text-lg">🔒</span>
              <p className="text-slate-500 text-xs leading-relaxed">
                All payments are processed directly through your UPI app. We never store your payment details. Your contribution is completely secure.
              </p>
            </div>
          </div>
        </div>

        {/* QR Modal */}
        {showQR && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-5"
            onClick={() => setShowQR(false)}
          >
            <div
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode size={22} className="text-amber-600" />
              </div>
              <h3 className="font-display font-bold text-slate-800 text-xl mb-1">Scan to Donate</h3>
              <p className="text-slate-500 text-sm mb-5">
                Scan with any UPI app · <span className="font-bold text-amber-600">₹{finalAmount}</span>
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 inline-block mb-5 shadow-inner">
                <img
                  src={qrUrl}
                  alt="UPI QR Code"
                  className="w-48 h-48 rounded-xl"
                />
              </div>

              <p className="text-slate-400 text-xs mb-5">
                UPI ID: <span className="font-mono font-semibold text-slate-600">{UPI_ID}</span>
              </p>

              <button
                onClick={() => setShowQR(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
