import { useState, useEffect } from 'react';
import { FaArrowTurnUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out"
          aria-label="Scroll to Top"
        >
          <FaArrowTurnUp />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
