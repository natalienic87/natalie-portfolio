import '../styles/globals.css';
import DevGrid from '../components/DevGrid';
import DevDrag from '../components/DevDrag';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <DevGrid />
      <DevDrag />
    </>
  );
}
