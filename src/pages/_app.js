// src/pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme"; // ajuste o caminho conforme necessário
import '../styles/style.css';
import '../components/Tutorial.css';
import '../components/Tabs.css';

function MyApp({ Component, pageProps }) {
  return (
    
    <ChakraProvider theme={theme}>
     
      <Component {...pageProps} />
    </ChakraProvider>
       
  );
}

export default MyApp;



