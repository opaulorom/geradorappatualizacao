import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme"; // ajuste o caminho conforme necessário
import '../styles/style.css';
import '../components/Tutorial.css';
import '../components/Tabs.css';
import Script from "next/script"; // Importa o componente Script
import { useEffect } from "react";
import { useRouter } from "next/router";

// Substitua pelo seu ID de medição do Google Analytics
const GA_TRACKING_ID = "G-9XV5JD2NE2";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* ChakraProvider e Component */}
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
