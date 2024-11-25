// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/style.css';
import '../styles/stylephone.css';




function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
