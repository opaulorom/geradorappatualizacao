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

    return (
        <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
            {/* Camada de fundo */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                    background: `
                        radial-gradient(circle, rgba(0, 0, 128, 0.8) 0%, rgba(0, 0, 139, 0.7) 40%, rgba(25, 25, 112, 1) 100%),
                        radial-gradient(circle at 5px, rgba(0, 0, 255, 0.3) 10px, transparent 1px)`, // Azul para as bolinhas
                    backgroundSize: "100%, 15px 27px", // Ajuste do tamanho do gradiente e espaçamento das bolinhas
                    backgroundPosition: "center, 0 center", // Bolinhas distribuídas uniformemente
                    backgroundRepeat: "no-repeat, repeat", // Bolinhas repetem
                }}
            ></div>

            {/* Camada de blur */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                    backdropFilter: isMobile ? "blur(6px)" : "blur(8px)", // Desfoque ajustado
                }}
            ></div>

            {/* Conteúdo principal */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1, // Garante que o conteúdo fique acima do fundo
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: isMobile ? "50px" : "100px",
                    minHeight: "100vh",
                }}
            >
                {/* Cabeçalho */}
                <header>
                    <h1 style={{ color: "#fff", textAlign: "center" }}>
                        <img src="/efrases.png" alt="Logo do eFrases" width="260px" />
                        <p
                            style={{
                                color: "#b2b2fd",
                                textAlign: "center",
                                fontWeight: "400",
                                fontSize: "13px",
                            }}
                        >
                            O melhor, feito especialmente <b>pra você!</b>
                        </p>
                        <br /> <br />
                    </h1>
                </header>

                {/* Conteúdo principal */}
                <main
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {isMobile ? <TextGeneratorMobile /> : <TextGeneratorDesktop />}
                </main>

                {/* Rodapé */}
                {isMobile ? <Footermobile /> : <Footer />}
            </div>
        </div>
    );
}
