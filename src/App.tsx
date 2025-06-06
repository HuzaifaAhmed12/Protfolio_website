import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import './styles/animations.css';

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'Syed Huzaifa Ahmed | Full Stack Developer Portfolio';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Syed Huzaifa Ahmed - Professional Full Stack Developer specializing in React, Node.js, Laravel, and modern web technologies. View my portfolio, projects, and get in touch for web development services.');
    }
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Syed Huzaifa Ahmed",
      "jobTitle": "Full Stack Developer",
      "description": "Professional Full Stack Developer specializing in React, Node.js, Laravel, and modern web technologies",
      "url": window.location.origin,
      "email": "huzaifaahmed0605@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Pakistan"
      },
      "sameAs": [
        "https://www.linkedin.com/in/syed-huzaifa-ahmed-20390729a",
        "https://github.com/HuzaifaAhmed12"
      ],
      "knowsAbout": [
        "JavaScript",
        "React",
        "Node.js",
        "Laravel",
        "PHP",
        "MongoDB",
        "SQL",
        "Full Stack Development",
        "Web Development"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Full Stack Developer",
        "occupationLocation": {
          "@type": "Country",
          "name": "Pakistan"
        },
        "skills": [
          "React Development",
          "Node.js Development", 
          "Laravel Development",
          "Database Design",
          "API Development",
          "Frontend Development",
          "Backend Development"
        ]
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Iqra University"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      });
    });

    // Service Worker for caching (PWA features)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    return () => {
      // Cleanup structured data script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Analytics />
      <PerformanceOptimizer />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;