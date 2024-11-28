import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

const Layout = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    minHeight="100vh" // Garante que o layout ocupe toda a altura da tela
  >
    <Box flex="1">
      {/* O conteúdo principal */}
      {children}
    </Box>
    {/* Rodapé */}
    <Footer />
  </Box>
);

const Footer = () => (
  <Box
    as="footer"
    bg="black"
    color="white"
    borderTop="2px solid #00aaff"
    borderRadius="10px 10px 0 0"
    width="489px" // Ajuste para largura flexível
    position="relative" // Garante que o rodapé não sobreponha conteúdo
    textAlign="center"
    py={10}
    marginBottom={-70} // Diminuir o padding vertical
  >
    <Box
      maxWidth="1200px" // Limite máximo da largura do conteúdo
      mx="auto"
      px={{ base: 4, md: 6, lg: 8 }} // Diminuir o padding horizontal
    >
      {/* Ícones das redes sociais */}
      <Box display="flex" justifyContent="center" mb={2}> {/* Diminuir a margem inferior */}
        <a
          href="https://www.facebook.com/efrasesapp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/facebook-icon.png" // Substitua pelo caminho do seu ícone do Facebook
            alt="Ícone do Facebook"
            width={40}
            height={40}
            style={{ margin: "0 8px" }} // Menor espaço entre os ícones
          />
        </a>
        <a
          href="https://www.instagram.com/efrases.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/instagram-icon.png" // Substitua pelo caminho do seu ícone do Instagram
            alt="Ícone do Instagram"
            width={40}
            height={40}
            style={{ margin: "0 8px" }} // Menor espaço entre os ícones
          />
        </a>
      </Box>

      {/* Título */}
      <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} mb={2}> {/* Diminuir a margem inferior */}
        Contribua com o eFrases!
      </Text>

      {/* Mensagem de apoio */}
      <Text fontSize={{ base: "sm", md: "md" }} mb={2} lineHeight="1.2">
        Feito com carinho para oferecer a você as melhores frases
        inspiradoras, motivacionais e criativas. Se você gosta do nosso conteúdo e deseja apoiar
        o nosso trabalho, considere fazer uma contribuição via Pix.
      </Text>

      {/* Mensagem de agradecimento */}
      <Text fontSize={{ base: "xs", md: "sm" }} mb={4} lineHeight="1.2">
        Toda contribuição, independentemente do valor, nos ajuda a continuar desenvolvendo
        novas funcionalidades, criar mais conteúdos e manter o site sempre atualizado e
        gratuito para todos. <br />
        Agradecemos de coração por seu apoio! ❤️
      </Text>

      {/* QR Code */}
      <Text fontSize={{ base: "sm", md: "md" }} mb={2}>
        📲 QR Code Pix abaixo:
      </Text>
      <Box display="flex" justifyContent="center" mx="auto" mb={4}>
        <Image
          src="/qrcodepix.png"
          alt="QR Code para contribuição via Pix. Escaneie com seu app bancário para doar."
          width={200}
          height={200}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>

      {/* Rodapé final */}
      <Text fontSize={{ base: "xs", md: "sm" }} mt={4} lineHeight="1.4">
        © 2024 Copyright efrases.com.br - Todos os direitos reservados.
      </Text>
    </Box>
  </Box>
);

export default Layout;
