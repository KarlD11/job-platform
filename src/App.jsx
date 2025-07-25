import React from 'react';
import HeroSection from './sectioms/HeroSEction';
import { Navbar } from "./components/Navbar" 

function App() {
  return (
    <div className="">

      {/* Navigation */}
      <Navbar />
      {/* Hero Section + Search Bar */}
      <HeroSection />
    </div>
  );
}

export default App;
