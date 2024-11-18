// src/components/Footer.js
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

const Footer = () => (
    <Box
      bg="black"
      color="white"
      textAlign="center"
      pt={10} // Padding top (menor espaço superior)
      pb={1} // Padding bottom (menor espaço inferior)
      px={4} // Padding lateral (esquerda e direita)
      borderTop="2px solid #00aaff"
      borderRadius="10px 10px 0 0"
      width="100%"
      minHeight="80px" // Altura mínima reduzida
      marginTop={2}
    >
      <Text fontWeight="bold" fontSize="lg" mb={1}>
        Contribua com o eFrases!
      </Text>
      <Text fontSize="sm" mb={2} maxWidth="500px" mx="auto">
        O eFrases é um projeto feito com carinho para oferecer a você as melhores frases inspiradoras, motivacionais e criativas.
        Se você gosta do nosso conteúdo e deseja apoiar o nosso trabalho, considere fazer uma contribuição via Pix.
      </Text>
      <Text fontSize="sm" mb={1}>
        Toda contribuição, independentemente do valor, nos ajuda a continuar desenvolvendo novas funcionalidades, criar mais conteúdos e manter o site sempre atualizado e gratuito para todos.
        <br />
        Agradecemos de coração por seu apoio! ❤️
      </Text>
      <Text fontSize="md" mb={2}>
        📲[QR Code Pix abaixo]
      </Text>
      <Image
        src="/qrcodepix.png"
        alt="QR Code do Pix"
        width={150} // QR Code menor para ocupar menos espaço
        height={120}
        style={{ margin: '0 auto', }}
      />
      <br/> <br/> <br/> <br/> <br/> <br/>
      <Text fontSize="sm" mb={1}>
      © 2024 Copyright efrases.com.br -Todos os direitos reservados.
      </Text>
    </Box>
  );
  
  export default Footer;