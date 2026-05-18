import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Heart, BookOpen, Users, Briefcase } from 'lucide-react';

type ModalView = 'volunteer' | 'internship' | 'donate' | 'work' | null;

export default function GetInvolved() {
  const { ref, visible } = useScrollReveal();
  const [activeModal, setActiveModal] = useState<ModalView>(null);

  const cards = [
    {
      icon: BookOpen,
      title: 'Volunteer',
      desc: 'Share your skills and time with the children',
      img: 'https://images.pexels.com/photos/8535230/pexels-photo-8535230.jpeg?auto=compress&cs=tinysrgb&w=800',
      modal: 'volunteer' as const,
      button: 'Become a Volunteer',
    },
    {
      icon: Heart,
      title: 'Donate',
      desc: 'Support education, meals, and care',
      img: 'https://images.pexels.com/photos/8612952/pexels-photo-8612952.jpeg?auto=compress&cs=tinysrgb&w=800',
      modal: 'donate' as const,
      button: 'Give Now',
    },
    {
      icon: Users,
      title: 'Work With Us',
      desc: 'Join our team as staff or collaborator',
      img: 'https://images.pexels.com/photos/8612988/pexels-photo-8612988.jpeg?auto=compress&cs=tinysrgb&w=800',
      modal: 'work' as const,
      button: 'View Positions',
    },
    {
      icon: Briefcase,
      title: 'Internship',
      desc: 'Gain meaningful experience in community work',
      img: 'https://images.pexels.com/photos/8613014/pexels-photo-8613014.jpeg?auto=compress&cs=tinysrgb&w=800',
      modal: 'internship' as const,
      button: 'Apply Now',
    },
  ];

  return (
    <section id="getinvolved" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-rose-50 text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Get Involved
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Be part of their journey
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Every contribution creates a safer and brighter childhood. Give your time, skills, resources, or ideas.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const { ref: cardRef, visible: cardVisible } = useScrollReveal(0.1);
            return (
              <div
                key={c.title}
                ref={cardRef}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer transition-all duration-500 hover:-translate-y-2 h-72 ${
                  cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                onClick={() => setActiveModal(c.modal)}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-1">{c.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{c.desc}</p>
                  <span className="inline-flex text-sm font-bold text-amber-300 group-hover:gap-1.5 gap-1 transition-all">
                    {c.button}
                    <span>→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <FormModal modal={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </section>
  );
}

function FormModal({
  modal,
  onClose,
}: {
  modal: ModalView;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-5 py-10 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {modal === 'volunteer' && <VolunteerForm />}
        {modal === 'internship' && <InternshipForm />}
        {modal === 'work' && <WorkForm />}
        {modal === 'donate' && <DonateForm />}

        <div className="p-8 border-t border-slate-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function VolunteerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-5">
      <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">Become a Volunteer</h2>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="+91 98765 43210"
        />
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Area of Interest</label>
        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
        >
          <option value="">Select an area</option>
          <option value="teaching">Teaching basic subjects</option>
          <option value="storytelling">Storytelling & reading</option>
          <option value="arts">Art, dance, music, yoga</option>
          <option value="english">Spoken English & communication</option>
          <option value="events">Events & activities</option>
          <option value="mentoring">Mentoring & confidence</option>
          <option value="social">Social media & content</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors resize-none"
          placeholder="Tell us about yourself and why you want to volunteer..."
        />
      </div>

      {submitted && (
        <div className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-3 rounded-xl">
          Thank you! We'll contact you soon.
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-2xl transition-colors"
      >
        Submit Application
      </button>
    </form>
  );
}

function InternshipForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [major, setMajor] = useState('');
  const [area, setArea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-5">
      <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">Apply for Internship</h2>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-slate-700 text-sm font-bold mb-2 block">College</label>
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
            placeholder="Your college"
          />
        </div>
        <div>
          <label className="text-slate-700 text-sm font-bold mb-2 block">Major/Course</label>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
            placeholder="Your field"
          />
        </div>
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Area of Interest</label>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
        >
          <option value="">Select an area</option>
          <option value="psychology">Psychology</option>
          <option value="social-work">Social Work</option>
          <option value="creative-writing">Creative Writing</option>
          <option value="education">Education & Teaching</option>
          <option value="content">Content & Communication</option>
        </select>
      </div>

      {submitted && (
        <div className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-3 rounded-xl">
          Application received! We'll be in touch.
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-2xl transition-colors"
      >
        Submit Application
      </button>
    </form>
  );
}

function WorkForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-5">
      <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">Join Our Team</h2>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Interested Position</label>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
        >
          <option value="">Select a position</option>
          <option value="teacher">Teacher</option>
          <option value="assistant-teacher">Assistant Teacher</option>
          <option value="social-media">Social Media Strategist</option>
          <option value="child-support">Child Support Staff</option>
          <option value="coordinator">Program Coordinator</option>
        </select>
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors resize-none"
          placeholder="Tell us about yourself and your experience..."
        />
      </div>

      {submitted && (
        <div className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-3 rounded-xl">
          Thank you for your interest! We'll be in touch soon.
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-2xl transition-colors"
      >
        Submit Application
      </button>
    </form>
  );
}

function DonateForm() {
  const [donationType, setDonationType] = useState('funds');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-5">
      <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">Make a Donation</h2>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">What would you like to donate?</label>
        <select
          value={donationType}
          onChange={(e) => setDonationType(e.target.value)}
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
        >
          <option value="funds">Funds</option>
          <option value="books">Books & stationery</option>
          <option value="toys">Toys & learning materials</option>
          <option value="clothes">Clothes & essentials</option>
          <option value="food">Food supplies & snacks</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Additional Details</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors resize-none"
          placeholder="Tell us more about what you'd like to donate..."
        />
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3">
        <p className="text-sky-700 text-sm leading-relaxed">
          For monetary donations, click the <strong>Support A Child</strong> button on the Donate section above to use UPI payment. For other donations, we'll contact you to arrange logistics.
        </p>
      </div>

      {submitted && (
        <div className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-3 rounded-xl">
          Thank you! We'll contact you to finalize the donation.
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 rounded-2xl transition-colors"
      >
        Register Donation
      </button>
    </form>
  );
}
