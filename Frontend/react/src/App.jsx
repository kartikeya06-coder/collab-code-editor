import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CodeEditor from './components/CodeEditor';
import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import CtaSection from "@/components/cta-section";
import SiteFooter from "@/components/site-footer";

// 1. We group all your landing page sections into one clean component
const LandingPage = () => {
  return (
    <>
      <SiteHeader />
      <Hero />
      <Features />
      <HowItWorks />
      <CtaSection />
      <SiteFooter />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      {/* Changed overflow: 'hidden' to minHeight: '100vh' so the landing page can scroll normally */}
      <div style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
        <Routes>
          {/* Route 1: The main landing page (accessible at localhost:5173/) */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Route 2: The actual code editor workspace. 
              The :roomId part is a dynamic parameter that catches whatever ID the Hero buttons generate. */}
          <Route path="/editor/:roomId" element={<CodeEditor />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;