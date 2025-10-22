import "./App.css";
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { KeepAliveProvider } from "./context/KeepAliveContext";
import { DataCacheProvider } from "./context/DataCacheContext";
import { RouteCacheManager } from "./hooks/useRouteCache";
import { PreloadAssets, DNSPrefetch } from "./components/PreloadAssets/PreloadAssets";
import { initializeCacheWarming } from "./utils/CacheWarming";
import CacheDebugPanel from "./components/CacheDebugPanel/CacheDebugPanel";

// ==================== LOADING COMPONENT ====================
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'rgb(236, 236, 236)',
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #2563eb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// ==================== LAZY LOADED ROUTES ====================
// Main Pages
const Home = lazy(() => import("./pages/Home/Home"));
const PackagesPage = lazy(() => import("./pages/Packages/Packages"));
const FamilyPage = lazy(() => import("./pages/Packages/Family/Family"));
const CorporatePage = lazy(() => import("./pages/Packages/Corporate/Corporate"));
const HoneyMoonPage = lazy(() => import("./pages/Packages/Honeymoon/HoneyMoon"));
const BudgetPage = lazy(() => import("./pages/Packages/Budget/Budget"));
const All = lazy(() => import("./pages/Packages/All/All"));

// Static Pages
const ContactPage = lazy(() => import("./pages/Static/Contact/ContactPage"));
const UserAgreement = lazy(() => import("./pages/Static/UserAgreement/UserAgreement"));
const TermsConditions = lazy(() => import("./pages/Static/TermsConditions/TermsConditions"));
const QuotePage = lazy(() => import("./pages/Static/Quote/Quote"));

// Individual Package Pages (26 packages)
const ID1 = lazy(() => import("./packages/1_Thailand"));
const ID2 = lazy(() => import("./packages/2_Vietnam"));
const ID3 = lazy(() => import("./packages/3_SriLanka"));
const ID4 = lazy(() => import("./packages/4_Laos"));
const ID5 = lazy(() => import("./packages/5_Dubai"));
const ID6 = lazy(() => import("./packages/6_Kenya"));
const ID7 = lazy(() => import("./packages/7_Mauritius"));
const ID8 = lazy(() => import("./packages/8_Bali"));
const ID9 = lazy(() => import("./packages/9_France"));
const ID10 = lazy(() => import("./packages/10_Spain"));
const ID11 = lazy(() => import("./packages/11_USA"));
const ID12 = lazy(() => import("./packages/12_Turkey"));
const ID13 = lazy(() => import("./packages/13_Russia"));
const ID14 = lazy(() => import("./packages/14_Cambodia"));
const ID15 = lazy(() => import("./packages/15_Mexico"));
const ID16 = lazy(() => import("./packages/16_Japan"));
const ID17 = lazy(() => import("./packages/17_Greece"));
const ID18 = lazy(() => import("./packages/18_Australia"));
const ID19 = lazy(() => import("./packages/19_Switzerland"));
const ID20 = lazy(() => import("./packages/20_Norway"));
const ID21 = lazy(() => import("./packages/21_Egypt"));
const ID22 = lazy(() => import("./packages/22_Hawai"));
const ID23 = lazy(() => import("./packages/23_SouthKorea"));
const ID24 = lazy(() => import("./packages/24_Tanzania"));
const ID25 = lazy(() => import("./packages/25_CostaRica"));
const ID26 = lazy(() => import("./packages/26_Brazil"));

// Import ScrollToTop
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
        {/* Main Pages */}
        <Route path="/" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><Home /></motion.div></Suspense>} />
        <Route path="/packages" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><PackagesPage /></motion.div></Suspense>} />
        <Route path="/packages/family" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><FamilyPage /></motion.div></Suspense>} />
        <Route path="/packages/corporate" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><CorporatePage /></motion.div></Suspense>} />
        <Route path="/packages/honeymoon" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><HoneyMoonPage /></motion.div></Suspense>} />
        <Route path="/packages/budget" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><BudgetPage /></motion.div></Suspense>} />
        <Route path="/packages/allpackages" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><All /></motion.div></Suspense>} />
        
        {/* Static Pages */}
        <Route path="/contact" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ContactPage /></motion.div></Suspense>} />
        <Route path="/user-agreement" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><UserAgreement /></motion.div></Suspense>} />
        <Route path="/terms-conditions" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><TermsConditions /></motion.div></Suspense>} />
        <Route path="/quote" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><QuotePage /></motion.div></Suspense>} />

        {/* Individual Package Pages (Lazy Loaded On-Demand) */}
        <Route path="/packages/id/1" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID1 /></motion.div></Suspense>} />
        <Route path="/packages/id/2" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID2 /></motion.div></Suspense>} />
        <Route path="/packages/id/3" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID3 /></motion.div></Suspense>} />
        <Route path="/packages/id/4" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID4 /></motion.div></Suspense>} />
        <Route path="/packages/id/5" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID5 /></motion.div></Suspense>} />
        <Route path="/packages/id/6" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID6 /></motion.div></Suspense>} />
        <Route path="/packages/id/7" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID7 /></motion.div></Suspense>} />
        <Route path="/packages/id/8" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID8 /></motion.div></Suspense>} />
        <Route path="/packages/id/9" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID9 /></motion.div></Suspense>} />
        <Route path="/packages/id/10" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID10 /></motion.div></Suspense>} />
        <Route path="/packages/id/11" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID11 /></motion.div></Suspense>} />
        <Route path="/packages/id/12" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID12 /></motion.div></Suspense>} />
        <Route path="/packages/id/13" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID13 /></motion.div></Suspense>} />
        <Route path="/packages/id/14" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID14 /></motion.div></Suspense>} />
        <Route path="/packages/id/15" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID15 /></motion.div></Suspense>} />
        <Route path="/packages/id/16" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID16 /></motion.div></Suspense>} />
        <Route path="/packages/id/17" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID17 /></motion.div></Suspense>} />
        <Route path="/packages/id/18" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID18 /></motion.div></Suspense>} />
        <Route path="/packages/id/19" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID19 /></motion.div></Suspense>} />
        <Route path="/packages/id/20" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID20 /></motion.div></Suspense>} />
        <Route path="/packages/id/21" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID21 /></motion.div></Suspense>} />
        <Route path="/packages/id/22" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID22 /></motion.div></Suspense>} />
        <Route path="/packages/id/23" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID23 /></motion.div></Suspense>} />
        <Route path="/packages/id/24" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID24 /></motion.div></Suspense>} />
        <Route path="/packages/id/25" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID25 /></motion.div></Suspense>} />
        <Route path="/packages/id/26" element={<Suspense fallback={<PageLoader />}><motion.div {...pageTransition}><ID26 /></motion.div></Suspense>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Initialize cache warming on app start
  useEffect(() => {
    const cleanup = initializeCacheWarming();
    return cleanup;
  }, []);

  return (
    <DataCacheProvider>
      <KeepAliveProvider>
        {/* Preload critical assets for faster initial render */}
        <PreloadAssets 
          assets={[
            '/videos/Hero.mp4',
            '/images/Logo.png',
          ]} 
        />
        
        {/* DNS Prefetch for external domains */}
        <DNSPrefetch 
          domains={[
            'https://images.unsplash.com',
            'https://res.cloudinary.com',
          ]} 
        />
        
        <Router>
          <ScrollToTop />
          <RouteCacheManager />
          <AnimatedRoutes />
        </Router>

        {/* Cache Debug Panel (dev only) - Commented out */}
        {/* <CacheDebugPanel /> */}
      </KeepAliveProvider>
    </DataCacheProvider>
  );
}

export default App;
