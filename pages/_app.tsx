/* istanbul ignore file */
import '../styles/index.css';

// Setup mocks
if (process.env.NODE_ENV === 'development') {
  const mocks = require('../mocks');
  mocks.initMocks();
  console.warn('You have activated the mocks.');
}

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
