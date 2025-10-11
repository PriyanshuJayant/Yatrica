import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Delay scroll reset until after page transition completes
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 200); // ⏱ matches fade duration (adjust if needed)

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
