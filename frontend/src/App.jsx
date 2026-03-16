import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './components/home/home';
import About from './components/about/about';
import FoodOffers from './components/offers/foodOffers';
import DonateFood from './components/donate/donateFood';
import Faq from './components/faq/faq';
import './index.css';

function App() {
  return (
    <Router>
      <div className="font-sans bg-[#F8F8F6] min-h-screen text-[#1F5E2A] selection:bg-[#A7D63B] selection:text-[#1F5E2A] scroll-smooth flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/offers" element={<FoodOffers />} />
            <Route path="/donate" element={<DonateFood />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
