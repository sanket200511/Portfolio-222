import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

import BootSequence from './components/BootSequence';
import HeroHub from './components/HeroHub';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsArsenal from './components/SkillsArsenal';
import ContactSection from './components/ContactSection';
import AdminDashboard from './components/AdminDashboard';
import CustomCursor from './components/CustomCursor';
import MatrixOverlay from './components/MatrixOverlay';
import RedAlertOverlay from './components/RedAlertOverlay';
import MeltdownModal from './components/MeltdownModal';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Simulate boot time
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-gray-200 selection:bg-primary/30 selection:text-primary overflow-x-hidden relative font-sans">
      <CustomCursor />
      <MatrixOverlay />
      <RedAlertOverlay />
      <MeltdownModal />
      {/* Global Scanline Effect */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20"></div>

      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" onComplete={() => setIsBooting(false)} />
        ) : (
          <div key="main-app" className="flex flex-col min-h-screen">
            <Routes>
              <Route path="/override" element={<AdminDashboard />} />
              <Route path="/*" element={
                <>
                  <Navbar />
                  <main className="flex-grow relative">
                    <HeroHub onNodeClick={(proj) => setSelectedProject(proj)} />

                    <ProjectModal
                      project={selectedProject}
                      onClose={() => setSelectedProject(null)}
                    />

                    <AboutSection />
                    <ExperienceSection />
                    <SkillsArsenal />
                    <ContactSection />
                  </main>
                </>
              } />
            </Routes>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
