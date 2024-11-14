import { useState, useCallback, useEffect } from "react";
import styles from "./TextGenerator.module.css";
import {
  Box,
  Button,
  Text,
  Input,
  Flex,
  Select,
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { toPng } from "html-to-image";
import { useDropzone } from "react-dropzone";
import { RepeatIcon } from "@chakra-ui/icons";

const TextGenerator = () => {
  const [textColor, setTextColor] = useState("#ffffff");
  const [name, setName] = useState("");
  const [showNameAlert, setShowNameAlert] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [gradientStart, setGradientStart] = useState("#000000");
  const [gradientEnd, setGradientEnd] = useState("#ffffff");
  const [gradientDirection, setGradientDirection] = useState("to bottom");
  const [gradientOpacity, setGradientOpacity] = useState(0.6);
  const [greetingMessages, setGreetingMessages] = useState([]); // Estado para armazenar todas as frases
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [loading, setLoading] = useState(false);
  const [nameSize, setNameSize] = useState(4);
  const [phraseSize, setPhraseSize] = useState(2.5);
  const [textAlign, setTextAlign] = useState("center");
  const [textShadow, setTextShadow] = useState("none");
  const [newFrase, setNewFrase] = useState(""); // Estado para nova frase
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0); // Estado para o índice da frase atual

  // Função para buscar frases da API
  const fetchFrases = async () => {
    const response = await fetch('/api/frases');
    const data = await response.json();
    setGreetingMessages(data); // Armazena todas as frases
  };

  // Função para adicionar uma nova frase
  const addFrase = async () => {
    if (!newFrase) return; // Não adiciona se a frase estiver vazia
    const response = await fetch('/api/frases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ frase: newFrase }),
    });
    await fetchFrases(); // Atualiza a lista após adicionar
    setNewFrase(""); // Limpa o campo de nova frase
    return response.json();
  };

  // Função para mudar a frase exibida
  const changePhrase = () => {
    if (greetingMessages.length > 0) {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % greetingMessages.length);
    }
  };

  const validateName = useCallback(() => {
    const isValid = name && /^[a-zA-Z\s]{1,20}$/.test(name);
    setShowNameAlert(!isValid);
    return isValid;
  }, [name]);

  const handleDownload = useCallback(() => {
    if (!validateName()) return;

    const node = document.getElementById("text-image");

    setLoading(true);
    toPng(node, { canvasWidth: 1080, canvasHeight: 1920 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "story.png";
        link.href = dataUrl;
        link.click();
        setDownloadFeedback("Imagem baixada com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao baixar a imagem:", error);
        setDownloadFeedback("Erro ao baixar a imagem.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [validateName]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    onDrop: useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      const validMimeTypes = ["image/jpeg", "image/png"];
  
      if (!file || !validMimeTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
        setDownloadFeedback("Por favor, escolha uma imagem válida (PNG ou JPEG) com até 2MB.");
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setBackgroundImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }, []),
  });
  

  useEffect(() => {
    fetchFrases(); // Buscar frases ao montar o componente
  }, []);

  return (
    <Flex
      minH="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={3}
    >
      <Input
        placeholder="Digite seu nome e veja"
        value={name}
        onChange={(e) => setName(e.target.value)}
        mb={1}
        borderRadius="md"
        width={"350px"}
        fontSize="1.5rem"
        bg="white"
        aria-label="Nome"
        pattern="^[a-zA-Z\s]{0,20}$"
      />
      <br />

      <Box
        {...getRootProps()}
        border="2px dashed #ccc"
        borderRadius="md"
        p={4}
        mb={4}
        textAlign="center"
      >
        <input {...getInputProps()} />
        <Text color="white">Arraste e solte uma imagem aqui, ou clique</Text>
        <Text fontSize="sm" color="white">Aceito: PNG e JPEG | Tamanho máximo: 2MB</Text>
      </Box>

      {showNameAlert && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          Por favor, insira um nome válido (apenas letras e até 20 caracteres).
        </Alert>
      )}

      <Box width={{ base: "90%", sm: "90vw", md: "400px" }} p={4} borderRadius="md" mb={4}>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" color={"white"}>
                Configurações de Texto e Nome
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Box mb={4}>
                <Text color="white">Cor do Texto</Text>
                <Input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  width="100%"
                />
              </Box>
              <Box mb={4}>
                <Text color="white">Alinhamento do Texto</Text>
                <Select
                  value={textAlign}
                  onChange={(e) => setTextAlign(e.target.value)}
                  bg="white"
                  color="black"
                >
                  <option value="left">Esquerda</option>
                  <option value="center">Centro</option>
                  <option value="right">Direita</option>
                </Select>
              </Box>
              <Box mb={4}>
                <Text color="white">Sombra do Texto</Text>
                <Select
                  value={textShadow}
                  onChange={(e) => setTextShadow(e.target.value)}
                  bg="white"
                  color="black"
                >
                  <option value="none">Nenhuma</option>
                  <option value="2px 2px 5px rgba(0, 0, 0, 0.5)">Sombra</option>
                  <option value="3px 3px 8px rgba(0, 0, 0, 0.7)">Sombra forte</option>
                </Select>
              </Box>
              <Box width="100%" mb={4}>
                <Text color="white">Tamanho do Nome</Text>
                <Input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={nameSize}
                  onChange={(e) => setNameSize(e.target.value)}
                  width="100%"
                />
              </Box>
              <Box width="100%" mb={4}>
                <Text color="white">Tamanho da Frase</Text>
                <Input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={phraseSize}
                  onChange={(e) => setPhraseSize(e.target.value)}
                  width="100%"
                />
              </Box>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" color={"white"}>
                Configurações de Fundo e Gradiente
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Flex mb={4} justify="space-between" align="center">
                <Box width="48%">
                  <Text color="white">Cor 1</Text>
                  <Input
                    type="color"
                    value={gradientStart}
                    onChange={(e) => setGradientStart(e.target.value)}
                    width="100%"
                  />
                </Box>
                <Box width="48%">
                  <Text color="white">Cor 2</Text>
                  <Input
                    type="color"
                    value={gradientEnd}
                    onChange={(e) => setGradientEnd(e.target.value)}
                    width="100%"
                  />
                </Box>
              </Flex>
              <Select
                placeholder="Direção do gradiente"
                onChange={(e) => setGradientDirection(e.target.value)}
                mb={4}
                bg="white"
                color="black"
              >
                <option value="to bottom">De cima para baixo</option>
                <option value="to top">De baixo para cima</option>
                <option value="to right">Da esquerda para a direita</option>
                <option value="to left">Da direita para a esquerda</option>
                <option value="to top right">Diagonal superior direita</option>
                <option value="to top left">Diagonal superior esquerda</option>
                <option value="to bottom right">Diagonal inferior direita</option>
                <option value="to bottom left">Diagonal inferior esquerda</option>
              </Select>
              <Box>
                <Text color="white">Opacidade do gradiente</Text>
                <Input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={gradientOpacity}
                  onChange={(e) => setGradientOpacity(parseFloat(e.target.value))}
                  width="100%"
                />
              </Box>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" color={"white"}>
                Configurações de Fonte
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Box mb={4}>
                <Text color="white">Fonte</Text>
                <Select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  bg="white"
                  color="black"
                >
                  <option value="Roboto">Roboto</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Trebuchet MS">Trebuchet MS</option>
                  <option value="Lucida Sans">Lucida Sans</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                  <option value="Impact">Impact</option>
                  <option value="Palatino">Palatino</option>
                  <option value="Garamond">Garamond</option>
                  <option value="Tahoma">Tahoma</option>
                  <option value="Bookman">Bookman</option>
                  <option value="Brush Script MT">Brush Script MT</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Lato">Lato</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Raleway">Raleway</option>
                  <option value="Quicksand">Quicksand</option>
                  <option value="Nunito">Nunito</option>
                  <option value="Merriweather">Merriweather</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Oswald">Oswald</option>
                  <option value="Fira Sans">Fira Sans</option>
                </Select>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <Box
        id="text-image"
        position="relative"
        width="100%"
        maxWidth="360px"
        height="640px"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        boxShadow="lg"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg={`linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`}
          opacity={gradientOpacity}
        />
        
        <Flex
          position="relative"
          direction="column"
          align="center"
          justify="center"
          height="100%"
          color={textColor}
          fontFamily={fontFamily}
          textAlign={textAlign}
          textShadow={textShadow}
        >
          <Text fontSize={`${nameSize}rem`} fontWeight="bold">
            {name}
          </Text>
          <Flex align="center">
            <Text fontSize={`${phraseSize}rem`}>
              {greetingMessages[currentPhraseIndex]} {/* Exibe a frase atual */}
            </Text>
          </Flex>
        </Flex>

        <Box
          position="absolute"
          bottom={2}
          left="83%"
          transform="translateX(-50%)"
          width="100px"
          height="auto"
          zIndex={9999}
        >
          <img
            src="/efrasesmarcadagua.png"
            alt="Logo efrases"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Box>

      <Flex mt={4}>
      
        <IconButton
          aria-label="Mostrar todas as frases"
          icon={<RepeatIcon />}
          onClick={changePhrase} // Chama a função para mudar a frase
          variant="outline"
          colorScheme="whiteAlpha"
          size="sm"
          color={"white"}
          ml={2}
        />
      </Flex>

      <Button colorScheme="blue" onClick={handleDownload} mt={4} isDisabled={loading}>
        {loading ? <Spinner size="sm" /> : "Baixar Imagem"}
      </Button>
      <br />

      {downloadFeedback && (
        <Text color="white" mt={2}>
          {downloadFeedback}
        </Text>
      )}

      <br /><br /><br />
      <Box
        as="footer"
        width={"1900px"}
        bg="gray.800"
        color="white"
        p={6}
        textAlign="center"
        mb={-8}
      >
        <Text>&copy; 2024 efrases. Todos os direitos reservados.</Text>
        <Text fontSize="sm">
          <a href="https://www.meusite.com" target="_blank" rel="noopener noreferrer">
            Política de Privacidade
          </a>{" "} | {" "}
          <a href="https://www.meusite.com" target="_blank" rel="noopener noreferrer">
            Termos de Uso
          </a>
        </Text>
      </Box>
    </Flex>
  );
};

export default TextGenerator;