// src/pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme"; // ajuste o caminho conforme necessário
import '../styles/style.css';
import '../styles/stylephone.css';


<<<<<<< HEAD
=======


>>>>>>> db8a886ada88c71795954e05d070a9d4ac4db14f
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;