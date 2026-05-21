import { useState } from "react";
import CustomCursor from "./components/cursor/CustomCursor";
import ScrollProgress from "./components/common/ScrollProgress";
import ScrollToTop from "./components/common/ScrollToTop";
import Loader from "./components/common/Loader";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Learning from "./components/sections/Learning";
import Contact from "./components/sections/Contact";
import Footer from "./components/common/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#080808", color: "#fff" }}
    >
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Learning />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}