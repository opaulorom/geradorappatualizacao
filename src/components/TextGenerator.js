import {
  Button,
  Text,
  Input,
  Flex,
  Select,
  Spinner,
  IconButton,
  Alert,
  AlertIcon,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { toPng } from "html-to-image";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone"; 
import { useMediaQuery } from "@chakra-ui/react";
import Image from 'next/image';

// Componente para Controle de Gradiente
const GradientControls = ({
  gradientStart,
  gradientEnd,
  gradientDirection,
  gradientOpacity,
  setGradientStart,
  setGradientEnd,
  setGradientDirection,
  setGradientOpacity,
}) => (

  
  <Box mb={4} width="100%">
    <br />
    <Text color="white" fontWeight="bold" mb={2}>
      Fundo e Gradiente
    </Text>
    <Slider
      aria-label="Transparência do gradiente"
      defaultValue={gradientOpacity * 100}
      onChange={(val) => setGradientOpacity(val / 100)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
    <Input
      type="color"
      value={gradientStart}
      onChange={(e) => setGradientStart(e.target.value)}
      mb={2}
      aria-label="Cor inicial do gradiente"
    />
    <Input
      type="color"
      value={gradientEnd}
      onChange={(e) => setGradientEnd(e.target.value)}
      mb={2}
      aria-label="Cor final do gradiente"
    />
    <Select
      value={gradientDirection}
      onChange={(e) => setGradientDirection(e.target.value)}
      bg="white"
      color="black"
      aria-label="Direção do gradiente"
    >
       <option value="to bottom">Vertical (para baixo)</option>
  <option value="to top">Vertical (para cima)</option>
  <option value="to right">Horizontal (para a direita)</option>
  <option value="to left">Horizontal (para a esquerda)</option>
  <option value="to bottom right">Diagonal (para baixo à direita)</option>
  <option value="to top left">Diagonal (para cima à esquerda)</option>
  <option value="to bottom left">Diagonal (para baixo à esquerda)</option>
  <option value="to top right">Diagonal (para cima à direita)</option>
  <option value="135deg">Ângulo de 135 graus</option>
  <option value="225deg">Ângulo de 225 graus</option>
    </Select>
    
    
  </Box>
   
);

const TextGenerator = () => {
  // State Variables
  const [textColor, setTextColor] = useState("#ffffff");
  const [name, setName] = useState("");
  const [showNameAlert, setShowNameAlert] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [gradientStart, setGradientStart] = useState("#000000");
  const [gradientEnd, setGradientEnd] = useState("#ffffff");
  const [gradientDirection, setGradientDirection] = useState("to bottom");
  const [gradientOpacity, setGradientOpacity] = useState(0.6);
  const [greetingMessages, setGreetingMessages] = useState([]);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [loading, setLoading] = useState(false);
  const [nameSize, setNameSize] = useState(4);
  const [phraseSize, setPhraseSize] = useState(2.5);
  const [textAlign, setTextAlign] = useState("center");
  const [textShadow, setTextShadow] = useState("none");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [phraseCategory, setPhraseCategory] = useState("general");
  const [apiError, setApiError] = useState("");



  const TextGenerator = () => {
    // Hook deve estar dentro do componente
    const [isMobile] = useMediaQuery("(max-width: 768px)");
  
    return (
      <Flex
        direction={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Box width={isMobile ? "100%" : "40%"}>Controles</Box>
        <Box width={isMobile ? "100%" : "60%"}>Pré-visualização</Box>
      </Flex>
    );
  };

  const [theme, setTheme] = useState("default");

  const themes = {
    default: { gradientStart: "#000000", gradientEnd: "#ffffff" },
    sunset: { gradientStart: "#ff7e5f", gradientEnd: "#feb47b" },
    ocean: { gradientStart: "#00c6ff", gradientEnd: "#0072ff" },
    forest: { gradientStart: "#11998e", gradientEnd: "#38ef7d" },
    twilight: { gradientStart: "#6441a5", gradientEnd: "#2a0845" },
  };
  
  const applyTheme = (selectedTheme) => {
    const themeColors = themes[selectedTheme];
    if (themeColors) {
      setGradientStart(themeColors.gradientStart);
      setGradientEnd(themeColors.gradientEnd);
      setTheme(selectedTheme);
    }
  };
  
<Box mb={4}>
  <Text color="white" fontWeight="bold" mb={2}>
    Escolher Tema
  </Text>
  <Select
    value={theme}
    onChange={(e) => applyTheme(e.target.value)}
    bg="white"
    color="black"
  >
    {Object.keys(themes).map((themeKey) => (
      <option key={themeKey} value={themeKey}>
        {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
      </option>
    ))}
  </Select>
</Box>
  
  // Componente de Dropzone
  const ImageDropzone = ({ setBackgroundImage }) => {
    const onDrop = useCallback(
      (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => setBackgroundImage(reader.result);
          reader.readAsDataURL(file);
        }
      },
      [setBackgroundImage]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
        'image/gif': ['.gif'],
        'image/webp': ['.webp'],
      },
    });
    

    return (
      <Box
        {...getRootProps()}
        p={4}
        border="2px dashed white"
        borderRadius="md"
        bg={"black"}
        color="white"
        cursor="pointer"
        textAlign="center"
        mb={4}
        className="baix-img"
        
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text>Solte a imagem aqui...</Text>
        ) : (
          <Text className="black">Arraste uma imagem ou clique para fazer upload. </Text>
        )}
      </Box>
    );
  };

  // Estilo de fundo memoizado
  const backgroundStyle = useMemo(() => {
    return {
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }, [backgroundImage]);

  // Estilo do gradiente memoizado
  const gradientStyle = useMemo(() => {
    return `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`;
  }, [gradientDirection, gradientStart, gradientEnd]);

  // Fetch phrases from API
  const fetchFrases = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/frases?category=${phraseCategory}&name=${name}`
      );
      if (!response.ok) throw new Error("Erro ao carregar frases.");
      const data = await response.json();
      setGreetingMessages(data || []);
      setApiError("");
    } catch (error) {
      console.error("Erro ao carregar frases:", error);
      setApiError("Não foi possível carregar as frases.");
    }
  }, [phraseCategory, name]);

  // Change Greeting Phrase
  const changePhrase = useCallback(() => {
    if (greetingMessages.length > 0) {
      setCurrentPhraseIndex(
        (prevIndex) => (prevIndex + 1) % greetingMessages.length
      );
    }
  }, [greetingMessages]);

  // Validate Name Input
  const validateName = useCallback(() => {
    const isValid = name && /^[a-zA-ZÀ-ÿ\s'-]{1,20}$/.test(name);
    setShowNameAlert(!isValid);
    return isValid;
  }, [name]);

  // Handle Image Download
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

  useEffect(() => {
    fetchFrases();
  }, [fetchFrases, name]);

  return (
    <Flex
      minH="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={3}
      maxWidth="90%"
      mx="auto"
    >
     
      
      {/* Texto e Nome */}
      <Box mb={4} width="100%" >
         
        <div className="purple">
        <Text   color="white" fontWeight="700"  fontFamily={" Nunito, sans-serif;"} mb={2} >
        Nome
        </Text>
       
        <Input
          placeholder={`Digite seu nome ${phraseCategory === "names" ? "e veja" : ""}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb={1}
          borderRadius="md"
          maxLength={20}
          width={"320px"}
          fontSize="1.5rem"
          bg="white"
          aria-label="Nome"
          
        />
         <p className="p-tutor">Escreva seu nome aí em cima e veja uma frase inspiradora.</p>

        {showNameAlert && (
          <Alert status="error" borderRadius="md" mb={2}>
            <AlertIcon />
            Nome inválido. Use até 20 caracteres, letras, acentos, apóstrofos e hífens.
          </Alert>
        )}
        
</div>
<br />
        <div className="green">
        <Box mb={4} width="100%">
  <Text color="white" fontWeight="700"  fontFamily={" Nunito, sans-serif;"}  mb={2}>
    Cor do Texto
  </Text>
  <Input
    type="color"
    value={textColor}
    onChange={(e) => setTextColor(e.target.value)}
    aria-label="Cor do Texto"
    width={"320px"}
    height="40px"
    bg="white"
  />
   <p className="p-tutorColor">Clique e mude a cor do seu texto do seu jeito.</p>
</Box>

</div>

<br />

<div className="orange ">
<Box mb={4} width="100%">
  <Text color="white" fontWeight="700" fontFamily={" Nunito, sans-serif;"}   mb={2}>
    Tamanho do Nome
  </Text>
  <Slider
    aria-label="Tamanho do Nome"
    value={nameSize}
    onChange={(val) => setNameSize(val)}
    min={1}
    max={10}
    step={0.1}
    mb={2}
  >
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
    <SliderThumb />
  </Slider>
  <p className="p-tutorMova">Mova a bolinha para o lado esquerdo ou direito para mudar o tamanho do seu nome.</p>
  <Text color="white" fontSize="sm" textAlign="center">
   
  </Text>
</Box>
</div>
<br />
 
<div className="pink">
<Box mb={4} width="100%">
  <Text color="white" fontWeight="700"  fontFamily={" Nunito, sans-serif;"}  mb={2}>
    Tamanho da Frase
  </Text>
  <Slider
    aria-label="Tamanho da Frase"
    value={phraseSize}
    onChange={(val) => setPhraseSize(val)}
    min={1}
    max={10}
    step={0.1}
    mb={2}
  >
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
    <SliderThumb />
  </Slider>
  
  <Text color="white" fontSize="sm" textAlign="center">
  </Text>
  <p className="p-tutorMova">Mova a bolinha para o lado esquerdo ou direito para mudar o tamanho da sua frase.</p>

  <div className="posicionamento-texto">
  <br/>
  <Box mb={4} width="100%">
    <Text color="white" fontWeight="700" fontFamily={"Nunito, sans-serif"} mb={2}>
      Posição do Texto
    </Text>
    <Select
      value={textAlign}
      onChange={(e) => setTextAlign(e.target.value)}
      bg="white"
      color="black"
      mb={2}
    >
      <option value="center">Centro</option>
      <option value="flex-start">Em Cima</option>
      <option value="flex-end">Embaixo</option>
      <option value="row">Ao Lado</option>
    </Select>
  </Box>
 
  <p className="p-tutor-posicao">Escolha onde posicionar o texto na imagem.</p>
</div>


</Box>
</div>

<br />
      <div className="yellow tam-Fontes">
      <Box>
        <Text color="white" fontWeight="700"  fontFamily={" Nunito, sans-serif;"} mb={2}>
          Tipos de Frases
        </Text>
        <Select
          value={phraseCategory}
          onChange={(e) => setPhraseCategory(e.target.value)}
          bg="white"
          color="black"
          mb={2}
        >
          <option value="general">Frases Gerais</option>
<option value="names">Frases com Nome</option>
<option value="parameuamor">Para meu amor</option>
<option value="celebrations">Frases de Celebrações</option>
<option value="inspirational">Frases Inspiradoras</option>
<option value="love">Frases de Amor</option>
<option value="funny">Frases Divertidas</option>
<option value="friendship">Frases de Amizade</option>
<option value="motivational">Frases Motivacionais</option>
<option value="spiritual">Frases Religiosas/Espirituais</option>
<option value="welcome">Frases de Boas-Vindas</option>
<option value="farewell">Frases de Despedida</option>
<option value="gratitude">Frases de Agradecimento</option>
<option value="thoughtful">Frases de Reflexão</option>
<option value="seasonal">Frases Sazonais</option>

        </Select>

      </Box>
      <p className="p-tutorTiposdeFrase">Selecione o seu tipo de frase e gere sua inspiração. Abaixo, personalize mudando a cor do gradiente 1 e gradiente 2 do seu jeito.</p>
      

      <GradientControls
        gradientStart={gradientStart}
        gradientEnd={gradientEnd}
        gradientDirection={gradientDirection}
        gradientOpacity={gradientOpacity }
        setGradientStart={setGradientStart}
        setGradientEnd={setGradientEnd}
        setGradientDirection={setGradientDirection}
        setGradientOpacity={setGradientOpacity}
      />
      
      <ImageDropzone setBackgroundImage={setBackgroundImage} />
      </div>
<br />
      
      <div className="green-2">
      <Box mb={4} width="100%" >
        <Text color="white" fontWeight="700"  fontFamily={" Nunito, sans-serif;"} mb={2}>
          Fontes
        </Text>
        <Select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          bg="white"
          color="black"
         
        >
        
           <option value="Roboto">Roboto</option>
  <option value="Arial">Arial</option>
  <option value="Times New Roman">Times New Roman</option>
  <option value="Open Sans">Open Sans</option>
  <option value="Lato">Lato</option>
  <option value="Montserrat">Montserrat</option>
  <option value="Poppins">Poppins</option>
  <option value="Raleway">Raleway</option>
  <option value="Nunito">Nunito</option>
  <option value="Source Sans Pro">Source Sans Pro</option>
  <option value="Merriweather">Merriweather</option>
  <option value="Georgia">Georgia</option>
  <option value="Verdana">Verdana</option>
  <option value="Courier New">Courier New</option>
  <option value="Tahoma">Tahoma</option>
  <option value="Comic Sans MS">Comic Sans MS</option>
  <option value="Oswald">Oswald</option>
  <option value="Dancing Script">Dancing Script</option>
  <option value="Lora">Lora</option>
  <option value="Quicksand">Quicksand</option>
  <option value="Playfair Display">Playfair Display</option>
        </Select>
      </Box>
      <p className="p-tutorTiposdeFrase">Selecione acima a sua fonte para personalizar sua frase</p>
      </div>
        
      {/*  Preview */}
      <Box
        id="text-image"
        position="relative"
        width={"360px"}
        height={"640px"}
        style={backgroundStyle}
        boxShadow="lg"
        overflow="hidden"
       
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg={gradientStyle}
          opacity={gradientOpacity}
        />
        <Flex
  position="relative"
  direction={textAlign === "row" ? "row" : "column"}
  align="center"
  justify={textAlign === "center" ? "center" : textAlign}
  width="360px"
  height="100%"
  color={textColor}
  fontFamily={fontFamily}
  textAlign={textAlign === "row" ? "left" : "center"}
  textShadow={textShadow}
>
  <Text fontSize={`${nameSize}rem`} fontWeight="bold">
    {name}
  </Text>
  <Text fontSize={`${phraseSize}rem`} fontWeight="semibold">
    {greetingMessages[currentPhraseIndex]}
  </Text>
</Flex>
      </Box>

      {/* Controles */}
      <div className="control">
      <Flex mt={4} gap={2}>
        <Button colorScheme="blue" onClick={changePhrase}>
          Nova Frase
        </Button>
        <Button
          colorScheme="green"
          onClick={handleDownload}
          isLoading={loading}
          alignItems={"center"}
        >
          Baixar
        </Button>
      </Flex>
      </div>
      {downloadFeedback && (
        <Alert status="info" borderRadius="md" mt={4}>
          <AlertIcon />
          {downloadFeedback}
        </Alert>
      )}
{apiError && (
  <Alert status="error" borderRadius="md" mt={4}>
    <AlertIcon />
    {apiError}
  </Alert>
)}
 <div className="espaco-1">
    1
  </div>

    </Box>   
    </Flex>
    
  );
 
};

export default TextGenerator;