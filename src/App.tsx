import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Impact from './components/Impact';
import Blog from './components/Blog';
import GetInvolved from './components/GetInvolved';
import Donate from './components/Donate';
import Volunteer from './components/Volunteer';
import CtaStrip from './components/CtaStrip';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <WhatWeDo />
      <Services />
      <Gallery />
      <Impact />
      <Blog />
      <GetInvolved />
      <Donate />
      <Volunteer />
      <CtaStrip />
      <Footer />
    </div>
  );
}
