import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      const criticalResources = [
        '/Untitled design (3) copy.png',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.includes('.png') ? 'image' : 'style';
        if (resource.includes('.png')) {
          link.type = 'image/png';
        }
        document.head.appendChild(link);
      });
    };

    // Lazy load images
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Optimize scroll performance
    let ticking = false;
    const optimizeScroll = () => {
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Scroll-related operations here
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    };

    // Reduce layout shifts
    const preventLayoutShifts = () => {
      // Add explicit dimensions to images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.style.aspectRatio && !img.width && !img.height) {
          img.style.aspectRatio = '1 / 1'; // Default aspect ratio
        }
      });
    };

    // Initialize optimizations
    preloadResources();
    lazyLoadImages();
    const cleanupScroll = optimizeScroll();
    preventLayoutShifts();

    // Web Vitals tracking
    const trackWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
        
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      } catch (error) {
        console.log('Web Vitals not available');
      }
    };

    trackWebVitals();

    return cleanupScroll;
  }, []);

  return null;
};

export default PerformanceOptimizer;