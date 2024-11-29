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
import Draggable from "react-draggable";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import dynamic from 'next/dynamic';
import { useNavigate } from 'react-router-dom';




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
      <SliderThumb aria-label="Controle de tamanho do nome"  />
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
  
  const [name, setName] = useState("");
  const [showNameAlert, setShowNameAlert] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [gradientStart, setGradientStart] = useState("#000000");
  const [gradientEnd, setGradientEnd] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#FFFFFF"); // Cor do texto principal
  const [borderColor, setBorderColor] = useState("#000000"); // Cor do texto duplicado

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
  const [selectedVerticalFormat, setSelectedVerticalFormat] = useState("instagramStories");
  const [initialDistance, setInitialDistance] = useState(null);
const [currentTarget, setCurrentTarget] = useState(null); // Para saber se o gesto está sobre o nome ou a frase
const [currentNameSize, setCurrentNameSize] = useState(nameSize);
const [currentPhraseSize, setCurrentPhraseSize] = useState(phraseSize);
const [textBorder, setTextBorder] = useState("none"); // "none" ou estilo da borda
const [offsetX, setOffsetX] = useState(3); // Deslocamento horizontal padrão
const [offsetY, setOffsetY] = useState(3); // Deslocamento vertical padrão

const [namePosition, setNamePosition] = useState({ x: 0, y: 0 });
const [phrasePosition, setPhrasePosition] = useState({ x: 0, y: 0 });

const [customPhrases, setCustomPhrases] = useState([]); // Adiciona o estado de frases personalizadas

const allPhrases = useMemo(() => [...customPhrases, ...greetingMessages], [customPhrases, greetingMessages]);
const [userPhrase, setUserPhrase] = useState(""); // Frase digitada pelo usuário

const [nameFontFamily, setNameFontFamily] = useState("Roboto"); // Fonte para o nome
const [phraseFontFamily, setPhraseFontFamily] = useState("Nunito"); // Fonte para a frase
const [nameFont, setNameFont] = useState("Roboto"); // Fonte do nome
const [phraseFont, setPhraseFont] = useState("Nunito"); // Fonte da frase
const [nameColor, setNameColor] = useState("#FFFFFF"); // Cor do nome
const [phraseColor, setPhraseColor] = useState("#FFFFFF"); // Cor da frase
const [hasInteracted, setHasInteracted] = useState(false);
const addCustomPhrase = () => {
  if (userPhrase.trim() !== "") {
    setCustomPhrases((prevPhrases) => [...prevPhrases, userPhrase]); // Atualiza a lista de frases
    setUserPhrase(""); // Limpa o campo de entrada
  }
};



useEffect(() => {
  const combinedPhrases = [...customPhrases, ...greetingMessages];
  if (combinedPhrases.length > 0) {
    console.log("Frases disponíveis:", combinedPhrases);
  }
}, [customPhrases, greetingMessages]); // Use os estados como dependências


const changePhrase = useCallback(() => {
  const combinedPhrases = [...customPhrases, ...greetingMessages];
  if (combinedPhrases.length > 0) {
    setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % combinedPhrases.length);
  }
}, [customPhrases, greetingMessages]); // Dependências diretas



const createFFmpeg = dynamic(
  () => import('@ffmpeg/ffmpeg').then((mod) => mod.createFFmpeg),
  { ssr: false }
);
  
  const currentPhrase = useMemo(() => {
    if (allPhrases.length > 0) {
      return allPhrases[currentPhraseIndex];
    }
    return ""; // Retorna vazio se não houver frases
  }, [allPhrases, currentPhraseIndex]);
  
  <Text
    fontSize={`${currentPhraseSize}rem`}
    fontWeight="semibold"
    lineHeight="1.2"
    color={textColor}
  >
    {currentPhrase}
  </Text>
  
  const handleTouchStart = (e, target) => {
    if (e.touches.length === 2) {
      const dist = Math.sqrt(
        Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2) +
        Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2)
      );
      setInitialDistance(dist); // Define a distância inicial entre os dedos
      setCurrentTarget(target); // Define o alvo (nome ou frase)
    }
  };
  
  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialDistance) {
      const dist = Math.sqrt(
        Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2) +
        Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2)
      );
      const scale = dist / initialDistance;
  
      // Atualiza o tamanho com base no alvo (nome ou frase)
      if (currentTarget === "name") {
        setCurrentNameSize(Math.max(1, Math.min(10, nameSize * scale)));
      } else if (currentTarget === "phrase") {
        setCurrentPhraseSize(Math.max(1, Math.min(10, phraseSize * scale)));
      }
    }
  };
  
  const handleTouchEnd = () => {
    setInitialDistance(null); // Limpa a distância inicial ao soltar os dedos
    setCurrentTarget(null); // Limpa o alvo
  };
  
  
const initialNamePosition = { x: 0, y: 0 };
const initialPhrasePosition = { x: 0, y: 0 };
  
  const handleSizeChange = (option) => {
    setSelectedSize(sizeOptions[option]);
  };
  

  const captureFrame = async (elementId) => {
    const node = document.getElementById(elementId);
    if (!node) return null;
  
    return await toPng(node, { quality: 1, width: 1080, height: 1920 });
  };
  
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
    
    const captureFrame = async (elementId) => {
      const node = document.getElementById(elementId);
      if (!node) return null;
    
      return await toPng(node, { quality: 1, width: 1080, height: 1920 });
    };

    return (
      <Box
        {...getRootProps()}
        p={4}
        border="2px dashed white"
        borderRadius="md"
        bg={"black"}
        color="white"
        cursor="pointer"
       
        alt="adicione img"
        textAlign="center"
       
        mb={4}
        className="baix-img"
        
      >
        <input {...getInputProps()} aria-label="Upload de imagem"  />
        {isDragActive ? (
          <Text>Solte a imagem aqui...</Text>
        ) : (
          <Text className="black">Arraste uma imagem ou clique para fazer upload. </Text>
        )}
      </Box>
    );
  };

  const processVideo = async () => {
    try {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }
      // Código para manipular vídeo...
    } catch (error) {
      console.error('Erro ao processar vídeo:', error);
    }
  };


  const isOutOfBounds = (position, containerWidth, containerHeight) => {
    const margin = 50; // Margem para evitar que desapareçam parcialmente
    return (
      position.x < -margin || position.y < -margin ||
      position.x > containerWidth + margin || position.y > containerHeight + margin
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


  const resetNamePosition = () => {
    setNamePosition(initialNamePosition);
  };
  
  const resetPhrasePosition = () => {
    setPhrasePosition(initialPhrasePosition);
  };
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

  const resetPhrases = () => {
    setCustomPhrases([]); // Remove todas as frases personalizadas
    setCurrentPhraseIndex(0); // Volta para a frase padrão (índice inicial)
  };

// Validate Name Input
const validateName = useCallback(() => {
  const isValid = name && /^[a-zA-ZÀ-ÿ\s'-]{1,20}$/.test(name);
  setShowNameAlert(!isValid);
  return isValid;
}, [name]);

const verticalSizes = {
  instagramStories: { width: 1080, height: 1920 },
  facebookStories: { width: 1080, height: 1920 },
  
};



const handleDownloadSelected = useCallback(async () => {
  const node = document.getElementById("text-image"); // O elemento no DOM

  if (!node) {
    setDownloadFeedback("Erro: Elemento não encontrado.");
    return;
  }

  setLoading(true);

  try {
    // Obtenha as dimensões com base no formato selecionado
    const { width, height } = verticalSizes[selectedVerticalFormat];

    // Exportar como PNG com dimensões maiores
    const dataUrl = await toPng(node, {
      canvasWidth: width, // Largura final da imagem
      canvasHeight: height, // Altura final da imagem
      scale: 3, // Escala para manter a qualidade
    });

    // Criar link para download
    const link = document.createElement("a");
    link.download = `${selectedVerticalFormat}.png`; // Nome do arquivo
    link.href = dataUrl;
    link.click();

    setDownloadFeedback(`Imagem no formato ${selectedVerticalFormat} baixada com sucesso!`);
  } catch (error) {
    console.error("Erro ao baixar imagem:", error);
    setDownloadFeedback("Erro ao gerar a imagem. Tente novamente.");
  } finally {
    setLoading(false);
  }
}, [selectedVerticalFormat]);
  
  useEffect(() => {
    if (validateName()) {
      fetchFrases();
    }
  }, [fetchFrases, name]);
  

<Box>



      <Text color="white" fontWeight="bold" mb={2}>
        Frases Personalizadas
      </Text>
      {customPhrases.length > 0 ? (
        customPhrases.map((phrase, index) => (
          <Text key={index} color="white" mb={1}>
            {phrase}
          </Text>
        ))
      ) : (
        <Text color="gray.500">Nenhuma frase adicionada ainda.</Text>
      )}
    </Box>

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
        Digite seu nome
        </Text>
       
        <Input
          placeholder={`aqui escreva o nome${phraseCategory === "names" ? "e veja" : ""}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb={1}
          borderRadius="md"
          maxLength={20}
         
          fontSize="1.5rem"
          bg="white"
          aria-label="Campo para digitar o nome"
          onBlur={validateName} // Valida ao sair do campo
          
        />
         <h2 className="p-tutor">Escreva seu nome aí em cima<a  href="#text-image" className="irbaixo">Visualizar</a> <img src=""/>  </h2>

         {hasInteracted && showNameAlert && (
<Alert status="error" borderRadius="md" mb={2}>
  <AlertIcon />
  Nome inválido. Use até 20 caracteres, letras, acentos, apóstrofos e hífens.
</Alert>
)}
        


</div>
<br />
        <div className="green">

<Box mb={4}>
<h2 className="p-tutor">Escolha sua cor <a  href="#text-image" className="irbaixo2">Visualizar</a> <img src=""/>  </h2>
<Text color="white" fontWeight="700" fontFamily="Nunito, sans-serif" mb={2}>
  Cor do Nome
</Text>
<Input
  type="color"
  value={nameColor}
  onChange={(e) => setNameColor(e.target.value)}
  aria-label="Cor do Nome"
  
  height="40px"
  bg="white"
/>
</Box>
<br/>
<Box mb={4}>
<Text color="white" fontWeight="700" fontFamily="Nunito, sans-serif" mb={2}>
  Cor da Frase
</Text>
<Input
  type="color"
  value={phraseColor}
  onChange={(e) => setPhraseColor(e.target.value)}
  aria-label="Cor da Frase"
 
  height="40px"
  bg="white"
/>
</Box>


</div>

<br />

<div className="orange ">
<Box mb={4} width="100%">
<h2 className="p-tutor">Escolha o Tamanho<a  href="#text-image" className="irbaixo2">Visualizar</a> <img src=""/>  </h2>

<Text color="white" fontWeight="700" fontFamily="Nunito, sans-serif" mb={2}>
  Tamanho do Nome
</Text>
<Slider
  aria-label="Tamanho do Nome"
  value={nameSize}
  onChange={(val) => setNameSize(val)}
  min={1}
  max={10}
  step={0.1}
>
  <SliderTrack>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb aria-label="Tanho do nome"  />
</Slider>
</Box>




<Text color="white" fontWeight="700" fontFamily="Nunito, sans-serif" mb={2}>
  Tamanho da Frase
</Text>
<Slider
aria-label="Tamanho da Frase"
value={phraseSize}
onChange={(val) => setPhraseSize(val)} // Atualiza o estado
min={1}
max={10}
step={0.1}
>
<SliderTrack>
  <SliderFilledTrack />
</SliderTrack>
<SliderThumb aria-label="Controle de tamanho da Frase"  />
</Slider>

<Box mb={4}>
<Text color="white" fontWeight="700" mb={2}>
  Fonte do Nome
</Text>
<Select
  value={nameFont}
  onChange={(e) => setNameFont(e.target.value)} // Atualiza a fonte do nome
  bg="white"
  color="black"
  fontFamily={nameFont}
>
<option value="Roboto, sans-serif">Roboto</option>
  <option value="Open Sans, sans-serif">Open Sans</option>
  <option value="Lato, sans-serif">Lato</option>
  <option value="Quicksand, sans-serif">Quicksand</option>
  <option value="Montserrat, sans-serif">Montserrat</option>
  <option value="Dancing Script, cursive">Dancing Script</option>
  <option value="Pacifico, cursive">Pacifico</option>
  <option value="Allura, cursive">Allura</option>
  <option value="Satisfy, cursive">Satisfy</option>
  <option value="Sacramento, cursive">Sacramento</option>


</Select>
</Box>



<Box mb={4}>
<Text color="white" fontWeight="700" mb={2}>
  Fonte da Frase
</Text>
<Select
  value={phraseFont}
  onChange={(e) => setPhraseFont(e.target.value)} // Atualiza a fonte da frase
  bg="white"
  color="black"
  fontFamily={nameFont}
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

</div>

<br />
      <div className="pink tam-Fontes">
      <Box mb={4}>
        <h2 className="p-tutor"><a  href="#text-image" className="irbaixo2">Visualizar</a> <img src=""/>  </h2>
        <Box mb={4}>
          
<Text color="white" fontWeight="bold" mb={2}>
Adicione sua frase personalizada (Opcional)
</Text>
<Input
  placeholder="Escreve Aqui"
  value={userPhrase}
  onChange={(e) => setUserPhrase(e.target.value)}
  mb={2}
  bg="white"
  alt="escreva frase personalizada"
/>
<Button colorScheme="blue" onClick={addCustomPhrase}  aria-label="Gerar uma nova frase"  aria-live="polite">
  Adicionar Frase
</Button>

</Box>
<br /><br />
</Box>



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
      <Box
id="text-image"
position="relative"
width={"310px"}
height={"600px"}
style={{
  ...backgroundStyle,
}}
boxShadow="lg"
overflow="hidden"
padding="20px"
>
{/* Fundo com Gradiente */}
<Box
  position="absolute"
  top={0}
  left={0}
  width="100%"
  height="100%"
  bg={gradientStyle}
  opacity={gradientOpacity}
/>

{/* Nome Draggable */}
<Draggable
  position={namePosition}
  onStop={(e, data) => setNamePosition({ x: data.x, y: data.y })}
>
  <Box>
    <Text
      fontSize={`${nameSize}rem`}
      fontWeight="bold"
      color={nameColor}
      fontFamily={nameFont}
        role="button"
  aria-label="Mover nome"
    >
      {name || "Digite seu nome!"}
    </Text>
  </Box>
</Draggable>

<Draggable
  position={phrasePosition}
  onStop={(e, data) => setPhrasePosition({ x: data.x, y: data.y })}
>
  <Box>
    <Text
      fontSize={`${phraseSize}rem`}
      fontWeight="semibold"
      fontFamily={phraseFont}
      color={phraseColor}
    >
      {currentPhrase || "Digite uma frase!"}
    </Text>
  </Box>
</Draggable>

</Box>



      {/* Controles */}
      <div className="controlphone">
      <Flex mt={4} gap={2}>
      <Button colorScheme="blue" onClick={changePhrase} aria-label="Gerar uma nova frase"  aria-live="polite" >
Nova Frase
</Button>

      </Flex>
      </div>
 
<div className="edit-TiposBaixar">

</div>


 <div className="espaco-1">
 <Box mb={4}>
  <Text color="white" fontWeight="bold" mb={2}>
    Escolha o Formato
  </Text>
  <Select
    value={selectedVerticalFormat}
    onChange={(e) => setSelectedVerticalFormat(e.target.value)}
    bg="white"
    color="black"
    width={"305px"}
  >
    {Object.keys(verticalSizes).map((key) => (
      <option key={key} value={key}>
        {key.replace(/([A-Z])/g, " $1").trim()} {/* Ex.: instagramStories -> Instagram Stories */}
      </option>
    ))}
  </Select>
</Box>


<Button
  colorScheme="green"
  onClick={handleDownloadSelected} // Aciona a função de download
  isLoading={loading} // Exibe estado de carregamento
  loadingText="Baixando..." 
  className="green-2"
  aria-label="baixe sua imagem vertical"
   aria-live="polite"
>
  Baixar Imagem Vertical
</Button > 
{downloadFeedback && (
        <Alert status="info" borderRadius="md" mt={2}  aria-live="polite">
          <AlertIcon />
          {downloadFeedback}
        </Alert>
      )}

<div className="edit-bot">
  <Button colorScheme="blue" onClick={resetNamePosition} margin={2} aria-label="volta com a frase"  aria-live="polite">
    Voltar Nome
  </Button>
  <Button colorScheme="teal" onClick={resetPhrasePosition} margin={2} aria-label="volta com a frase"  aria-live="polite">
    Voltar Frase
  </Button>
</div>
  </div>

    </Box>   
    
    </Flex>
    
  );
 
};

export default TextGenerator;