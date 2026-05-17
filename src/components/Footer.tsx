import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center">
                <Heart size={15} className="text-white fill-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">Aashiyan</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              A safe learning and daycare space for the children of migrant workers — built on love, sustained by community.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={15} className="text-slate-300" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} className="text-slate-300" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-400 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={15} className="text-slate-300" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Explore</h4>
            <ul className="space-y-3">
              {['About Us', 'What We Provide', 'Daily Life', 'Impact', 'Support', 'Volunteer'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Sector 12, Dharavi Community Centre,<br />Mumbai, Maharashtra 400017</span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  <Phone size={15} className="text-amber-400 flex-shrink-0" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:hello@aashiyan.org" className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  <Mail size={15} className="text-amber-400 flex-shrink-0" />
                  hello@aashiyan.org
                </a>
              </li>
            </ul>
          </div>

          {/* Support CTA */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Give Today</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Your ₹100 provides school supplies for a child. Your ₹300 feeds a child for a month.
            </p>
            <a
              href="#donate"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg"
            >
              <Heart size={14} className="fill-white" />
              Support A Child
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center sm:justify-start">
              <span>NGO Reg. No: MH/2015/0045321</span>
              <span>80G Certified</span>
              <span>12A Registered</span>
            </div>
            <div className="flex items-center gap-1">
              Built with
              <Heart size={12} className="text-rose-400 fill-rose-400 mx-0.5" />
              community support · © 2024 Aashiyan
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
