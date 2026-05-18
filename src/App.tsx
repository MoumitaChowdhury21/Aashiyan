import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import WhatWeDoDetail from './components/WhatWeDoDetail';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Impact from './components/Impact';
import DayAtAashiyan from './components/DayAtAashiyan';
import ArtworkGallery from './components/ArtworkGallery';
import ImpactStories from './components/ImpactStories';
import Partners from './components/Partners';
import Wishlist from './components/Wishlist';
import Blog from './components/Blog';
import GetInvolved from './components/GetInvolved';
import Donate from './components/Donate';
import Volunteer from './components/Volunteer';
import CtaStrip from './components/CtaStrip';
import Footer from './components/Footer';
import type { ServiceType } from './components/WhatWeDoDetail';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  if (selectedService) {
    return (
      <div className="min-h-screen font-sans antialiased">
        <Navbar />
        <WhatWeDoDetail
          service={selectedService}
          onBack={() => {
            setSelectedService(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <CtaStrip />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <WhatWeDo onServiceClick={setSelectedService} />
      <Services />
      <Gallery />
      <DayAtAashiyan />
      <ArtworkGallery />
      <ImpactStories />
      <Impact />
      <Partners />
      <Wishlist />
      <Blog />
      <GetInvolved />
      <Donate />
      <Volunteer />
      <CtaStrip />
      <Footer />
    </div>
  );
}
