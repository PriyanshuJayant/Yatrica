import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home/Home";
import Test from "./pages/test/Test";
import FamilyPage from "./pages/Packages/Family/Family";
import PackagesPage from "./pages/Packages/Packages";
import ScrollToTop from "./hooks/ScrollToTop";
import CorporatePage from "./pages/Packages/Corporate/Corporate";
import HoneyMoonPage from "./pages/Packages/Honeymoon/HoneyMoon";
import BudgetPage from "./pages/Packages/Budget/Budget";
import ContactPage from "./pages/Static/Contact/ContactPage";
import All from './pages/Packages/All/All';
import UserAgreement from "./pages/Static/UserAgreement/UserAgreement";

import ID1 from "./packages/1_Thailand";
import ID2 from "./packages/2_Vietnam";
import ID3 from "./packages/3_SriLanka";
import ID4 from "./packages/4_Laos";
import ID5 from "./packages/5_Dubai";
import ID6 from "./packages/6_Kenya";
import ID7 from "./packages/7_Mauritius";
import ID8 from "./packages/8_Bali";
import ID9 from "./packages/9_France";
import ID10 from "./packages/10_Spain";
import ID11 from "./packages/11_USA";
import ID12 from "./packages/12_Turkey";
import ID13 from "./packages/13_Russia";
import ID14 from "./packages/14_Cambodia";
import ID15 from "./packages/15_Mexico";
import ID16 from "./packages/16_Japan";
import ID17 from "./packages/17_Greece";
import ID18 from "./packages/18_Australia";
import ID19 from "./packages/19_Switzerland";
import ID20 from "./packages/20_Norway";
import ID21 from "./packages/21_Egypt";
import ID22 from "./packages/22_Hawai";
import ID23 from "./packages/23_SouthKorea";
import ID24 from "./packages/24_Tanzania";
import ID25 from "./packages/25_CostaRica";
import ID26 from "./packages/26_Brazil";


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
        <Route path="/" element={<motion.div {...pageTransition}><Home /></motion.div>} />
        <Route path="/packages" element={<motion.div {...pageTransition}><PackagesPage /></motion.div>} />
        <Route path="/packages/family" element={<motion.div {...pageTransition}><FamilyPage /></motion.div>} />
        <Route path="/packages/corporate" element={<motion.div {...pageTransition}><CorporatePage /></motion.div>} />
        <Route path="/packages/honeymoon" element={<motion.div {...pageTransition}><HoneyMoonPage /></motion.div>} />
        <Route path="/packages/budget" element={<motion.div {...pageTransition}><BudgetPage /></motion.div>} />
        <Route path="/test" element={<motion.div {...pageTransition}><Test /></motion.div>} />
        <Route path="/contact" element={<motion.div {...pageTransition}><ContactPage /></motion.div>} />
        <Route path="/packages/allpackages" element={<motion.div {...pageTransition}><All /></motion.div>} />
        <Route path="/user-agreement" element={<motion.div {...pageTransition}><UserAgreement /></motion.div>} />


        <Route path="/packages/id/1" element={<motion.div {...pageTransition}><ID1 /></motion.div>} />
        <Route path="/packages/id/2" element={<motion.div {...pageTransition}><ID2 /></motion.div>} />
        <Route path="/packages/id/3" element={<motion.div {...pageTransition}><ID3 /></motion.div>} />
        <Route path="/packages/id/4" element={<motion.div {...pageTransition}><ID4 /></motion.div>} />
        <Route path="/packages/id/5" element={<motion.div {...pageTransition}><ID5 /></motion.div>} />
        <Route path="/packages/id/6" element={<motion.div {...pageTransition}><ID6 /></motion.div>} />
        <Route path="/packages/id/7" element={<motion.div {...pageTransition}><ID7 /></motion.div>} />
        <Route path="/packages/id/8" element={<motion.div {...pageTransition}><ID8 /></motion.div>} />
        <Route path="/packages/id/9" element={<motion.div {...pageTransition}><ID9 /></motion.div>} />
        <Route path="/packages/id/10" element={<motion.div {...pageTransition}><ID10 /></motion.div>} />
        <Route path="/packages/id/11" element={<motion.div {...pageTransition}><ID11 /></motion.div>} />
        <Route path="/packages/id/12" element={<motion.div {...pageTransition}><ID12 /></motion.div>} />
        <Route path="/packages/id/13" element={<motion.div {...pageTransition}><ID13 /></motion.div>} />
        <Route path="/packages/id/14" element={<motion.div {...pageTransition}><ID14 /></motion.div>} />
        <Route path="/packages/id/15" element={<motion.div {...pageTransition}><ID15 /></motion.div>} />
        <Route path="/packages/id/16" element={<motion.div {...pageTransition}><ID16 /></motion.div>} />
        <Route path="/packages/id/17" element={<motion.div {...pageTransition}><ID17 /></motion.div>} />
        <Route path="/packages/id/18" element={<motion.div {...pageTransition}><ID18 /></motion.div>} />
        <Route path="/packages/id/19" element={<motion.div {...pageTransition}><ID19 /></motion.div>} />
        <Route path="/packages/id/20" element={<motion.div {...pageTransition}><ID20 /></motion.div>} />
        <Route path="/packages/id/21" element={<motion.div {...pageTransition}><ID21 /></motion.div>} />
        <Route path="/packages/id/22" element={<motion.div {...pageTransition}><ID22 /></motion.div>} />
        <Route path="/packages/id/23" element={<motion.div {...pageTransition}><ID23 /></motion.div>} />
        <Route path="/packages/id/24" element={<motion.div {...pageTransition}><ID24 /></motion.div>} />
        <Route path="/packages/id/25" element={<motion.div {...pageTransition}><ID25 /></motion.div>} />
        <Route path="/packages/id/26" element={<motion.div {...pageTransition}><ID26 /></motion.div>} />



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
