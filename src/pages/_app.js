import '../styles/globals.css';  // Import your global styles
import { ParallaxProvider } from 'react-scroll-parallax';

function MyApp({ Component, pageProps }) {
  return (
    <ParallaxProvider>
      <Component {...pageProps} />
    </ParallaxProvider>
  );
}

export default MyApp;
