import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const Analytics = () => {
  useEffect(() => {
    // Google Analytics 4 setup
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID
    
    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href
      });
    `;
    document.head.appendChild(script2);

    // Track page views
    const trackPageView = () => {
      if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_title: document.title,
          page_location: window.location.href
        });
      }
    };

    // Track scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        if (window.gtag) {
          window.gtag('event', 'scroll_depth', {
            event_category: 'engagement',
            event_label: `${scrollPercent}%`,
            value: scrollPercent
          });
        }
      }
    };

    // Track contact form interactions
    const trackContactFormInteraction = (action: string) => {
      if (window.gtag) {
        window.gtag('event', action, {
          event_category: 'contact_form',
          event_label: 'portfolio_contact'
        });
      }
    };

    // Track project clicks
    const trackProjectClick = (projectName: string) => {
      if (window.gtag) {
        window.gtag('event', 'project_click', {
          event_category: 'portfolio',
          event_label: projectName
        });
      }
    };

    // Add event listeners
    window.addEventListener('scroll', trackScrollDepth);
    
    // Track initial page view
    trackPageView();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return null;
};

export default Analytics;