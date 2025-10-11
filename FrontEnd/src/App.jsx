import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home/Home";
import Test from "./pages/test/Test";
import FamilyPage from "./pages/Packages/Family/Family";
import PackagesPage from "./pages/Packages/Packages";
import ScrollToTop from "./hooks/ScrollToTop";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<motion.div {...pageTransition}><PackagesPage /></motion.div>} />
        <Route path="/packages/family" element={<motion.div {...pageTransition}><FamilyPage /></motion.div>} />
        <Route path="/test" element={<motion.div {...pageTransition}><Test /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
