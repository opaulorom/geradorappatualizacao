import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

const Footer = () => (
  
  <Box
    as="footer"
    bg="black"
    color="white"
    borderTop="2px solid #00aaff"
    borderRadius="10px 10px 0 0"
    width="50"
    mt="auto" // Garante que o rodapé seja empurrado para baixo
    textAlign="center"
  >
    
    {/* Contêiner principal */}
    
    <Box
      maxWidth={{ base: "100%", md: "100px" }}
      mx="auto"
      px={{ base: 4, md: 8, lg: 16 }}
      py={{ base: 6, md: 8 }}
      className="conteudofootermobile"
    >
      {/* Título */}
      <Text
        fontWeight="bold"
        fontSize={{ base: "lg", md: "xl" }}
        mb={4}
        aria-label="Título do rodapé"
      >
        Contribua com o eFrases!
      </Text>

      {/* Mensagem de apoio */}
      <Text
        fontSize={{ base: "sm", md: "md" }}
        mb={4}
        maxWidth={{ base: "90%", md: "700px" }}
        mx="auto"
        lineHeight="1.6"
        aria-label="Mensagem de apoio"
      >
        O eFrases é um projeto feito com carinho para oferecer a você as melhores frases
        inspiradoras, motivacionais e criativas. Se você gosta do nosso conteúdo e deseja apoiar
        o nosso trabalho, considere fazer uma contribuição via Pix.
      </Text>

      {/* Mensagem de agradecimento */}
      <Text
        fontSize={{ base: "xs", md: "sm" }}
        mb={6}
        maxWidth={{ base: "90%", md: "100px" }}
        mx="auto"
        lineHeight="1.6"
        aria-label="Mensagem de agradecimento"
      >
        Toda contribuição, independentemente do valor, nos ajuda a continuar desenvolvendo
        novas funcionalidades, criar mais conteúdos e manter o site sempre atualizado e
        gratuito para todos. <br />
        Agradecemos de coração por seu apoio! ❤️
      </Text>

      {/* QR Code */}
      <Text fontSize={{ base: "sm", md: "md" }} mb={4} aria-label="QR Code Pix abaixo">
        📲 QR Code Pix abaixo:
      </Text>
      <Box display="flex" justifyContent="center" mx="auto" mb={4}>
        <Image
          src="/qrcodepix.png"
          alt="QR Code para contribuição via Pix"
          width={200}
          height={200}
          style={{ maxWidth: "180px", height: "auto" }}
        />
      </Box>

      {/* Rodapé final */}
      <Text
        fontSize={{ base: "xs", md: "sm" }}
        mt={6}
        lineHeight="1.4"
        aria-label="Copyright"
        className="ceodesktopmobile"
      >
        © 2024 Copyright efrases.com.br - Todos os direitos reservados.
      </Text>
    </Box>
  </Box>
);

export default Footer;
