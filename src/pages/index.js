import { useState, useEffect } from "react";
import TextGeneratorDesktop from "../components/TextGeneratorDesktop";
import TextGeneratorMobile from "../components/TextGeneratorMobile";
import Footer from "../components/Footer";
import Footermobile from "../components/Footermobile";

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Define mobile se a largura for <= 768px
        };

        handleResize(); // Detecta o tamanho inicial
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const backgroundStyle = isMobile
        ? {
              background: "linear-gradient(135deg, #181F6D, #404090)", // Gradiente para mobile
              backgroundSize: "200% auto", // Aumenta a largura proporcionalmente
              backgroundPosition: "center", // Centraliza
              backgroundRepeat: "no-repeat", // Sem repetição
              width: "113%", // Garante que o fundo ocupe toda a largura
          }
        : {
              background: "url('/fundodesktop.png') no-repeat, linear-gradient(180deg, #181F6D, #2D2D73)", // Imagem + gradiente
              backgroundSize: "435%", // Tamanho fixo para desktop
              backgroundPosition: "left", // Alinha à esquerda
              backgroundRepeat: "no-repeat", // Sem repetição
              width: "100%", // Garante que o fundo ocupe toda a largura
          };

    return (
        <div
            style={{
                ...backgroundStyle, // Estilo de fundo baseado no dispositivo
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: isMobile ? "50px" : "100px", // Padding ajustado
                transition: "background 0.3s ease-in-out, padding 0.3s ease-in-out",
            }}
        >
            {/* Cabeçalho */}
            <header>
                <h1 style={{ color: "#fff", textAlign: "center" }}>
                    <img src="/efrases.png" alt="Logo do eFrases" width="250px" />
                    <p
                        style={{
                            color: "#7378EE",
                            textAlign: "center",
                            fontWeight: "300",
                            fontSize: "14.8px",
                        }}
                    >
                        O melhor, feito especialmente <b>pra você!</b>
                    </p>
                    <br /> <br />
                </h1>
            </header>

            {/* Conteúdo principal */}
            <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {isMobile ? <TextGeneratorMobile /> : <TextGeneratorDesktop />}
            </main>

            {/* Rodapé */}
            {isMobile ? <Footermobile /> : <Footer />}
        </div>
    );
}
