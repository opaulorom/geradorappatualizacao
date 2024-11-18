import { extendTheme } from "@chakra-ui/react";

// Definindo um novo tema
const theme = extendTheme({
  colors: {
    // Aqui você define cores globais para o projeto
    primary: "#FF6347", // Exemplo de cor primária
    secondary: "#4CAF50", // Cor secundária
    background: "#f4f4f4", // Cor de fundo padrão
    text: "#333", // Cor do texto
    // ... outras cores personalizadas
  },
  fonts: {
    heading: "Poppins, sans-serif", // Fonte para cabeçalhos
    body: "Roboto, sans-serif", // Fonte para o corpo do texto
  },
  styles: {
    global: {
      // Estilos globais que afetam toda a aplicação
      body: {
        backgroundColor: "#f4f4f4", // Cor de fundo global
        color: "#333", // Cor do texto global
        fontFamily: "Roboto, sans-serif", // Fonte global
      },
      h1: {
        fontFamily: "Poppins, sans-serif", // Fontes específicas para h1
      },
      h2: {
        fontFamily: "Poppins, sans-serif", // Fontes específicas para h2
      },
    },
  },
});

export default theme;
