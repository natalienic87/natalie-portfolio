import Cursor from '../components/Cursor';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import LogoScroll from '../components/LogoScroll';
import Exhibition from '../components/Exhibition';
import About from '../components/About';
import Career from '../components/Career';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="main-clip-mobile relative min-h-screen bg-background text-off-white" style={{ overflowX: 'clip' }}>
      <Cursor />
      <Nav />
      <Hero />
      <LogoScroll />
      <Exhibition />
      <About />
      <Career />
      <Footer />
    </main>
  );
}
