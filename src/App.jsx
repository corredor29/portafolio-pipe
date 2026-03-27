import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import AboutMe from "./sections/AboutMe";
import Projects from "./sections/Projects";

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
    </div>
  );
}

export default App;