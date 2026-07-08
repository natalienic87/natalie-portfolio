import '../styles/globals.css';
import GridOverlay from '../components/GridOverlay';
import DevEdit    from '../components/DevEdit';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GridOverlay />
      <DevEdit />
    </>
  );
}
