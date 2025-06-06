import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="mx-auto animate-bounce" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;