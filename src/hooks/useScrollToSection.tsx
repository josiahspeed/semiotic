import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Custom hook for scrolling to sections with cross-page navigation support.
 * Handles the case where user is on a different page and needs to navigate home first.
 */
export const useScrollToSection = () => {
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && pendingScroll) {
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(pendingScroll);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setPendingScroll(null);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, pendingScroll]);

  const scrollToSection = (sectionId: string, closeMobileMenu?: () => void) => {
    if (location.pathname !== '/') {
      setPendingScroll(sectionId);
      navigate('/');
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    closeMobileMenu?.();
  };

  const handlePageNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { scrollToSection, handlePageNavigation };
};
