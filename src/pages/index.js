import Nav from '../components/Nav';
import Hero from '../components/Hero';
import LogoScroll from '../components/LogoScroll';
import Exhibition from '../components/Exhibition';
import About from '../components/About';
import Career from '../components/Career';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-off-white">
      <Nav />
      <Hero />
      <LogoScroll />
      <Exhibition />
      <About />
      <Career />
    </main>
  );
}
