import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import AboutMe from "./sections/AboutMe";
import Projects from "./sections/Projects";
import Recommendations from "./sections/Recommendations";
import SkillsPortfolio from "./sections/skills";
import Contact from "./sections/Contact";

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <div id="inicio">
        <Hero />
      </div>
      <div id="sobre-mi">
        <AboutMe />
      </div>
      <div id="proyectos">
        <Projects />
      </div>
      <div id="recomendaciones">
        <Recommendations />
      </div>
      <div id="habilidades">
        <SkillsPortfolio />
      </div>
      <div id="contacto">
        <Contact />
      </div>
    </div>
  );
}

export default App;