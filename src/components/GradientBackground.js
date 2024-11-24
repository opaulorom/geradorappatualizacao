import { useEffect, useState } from "react";

const GradientBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se o dispositivo é mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Largura máxima para dispositivos móveis
    };
    handleResize(); // Definir inicialmente
    window.addEventListener("resize", handleResize); // Atualizar ao redimensionar
    return () => window.removeEventListener("resize", handleResize); // Limpar evento
  }, []);

  const gradient = isMobile
    ? "linear-gradient(135deg, #181F6D, #404090)" // Gradiente para Mobile
    : "linear-gradient(180deg, #181F6D, #2D2D73)"; // Gradiente para Desktop

  const containerStyle = {
    background: gradient,
    height: "100vh", // Preencher a tela inteira
    width: "100%", // Preencher a largura inteira
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff", // Texto branco para contraste
  };

  return (
    <div style={containerStyle}>
      <h1>Gradiente Responsivo</h1>
    </div>
  );
};

export default GradientBackground;
