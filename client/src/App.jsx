import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import BootSequence from './components/BootSequence';
import HeroHub from './components/HeroHub';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';
import AboutSection from './components/AboutSection';
import SkillsArsenal from './components/SkillsArsenal';
import ContactSection from './components/ContactSection';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Simulate boot time
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 4000); // 4 seconds boot normally, we can adjust later based on BootSequence animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-gray-200 selection:bg-primary/30 selection:text-primary overflow-x-hidden relative font-sans">
      {/* Global Scanline Effect */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 Mix-blend-overlay"></div>

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
