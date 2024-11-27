import { useState, useEffect } from "react";
import TextGeneratorDesktop from "../components/TextGeneratorDesktop";
import TextGeneratorMobile from "../components/TextGeneratorMobile";
import Footer from "../components/Footer";
import Footermobile from "../components/Footermobile";
<<<<<<< HEAD

=======
>>>>>>> db8a886ada88c71795954e05d070a9d4ac4db14f

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

<<<<<<< HEAD
    const gradient = isMobile
        ? "linear-gradient(135deg, #181F6D, #404090)" // Mobile
        : "linear-gradient(180deg, #181F6D, #2D2D73)"; // Desktop

    return (
        <div
            style={{
                background: gradient,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: isMobile ? "50px" : "100px", // Padding diferente
                width: isMobile ? "110%" : "100%", // Width separado: 100% para mobile, 1200px para desktop
                margin: isMobile ? "0" : "auto", // Centraliza no desktop
                transition: "background 0.3s ease-in-out, width 0.3s ease-in-out, padding 0.3s ease-in-out",
            }}
        >
            <header>
                <h1 style={{ color: "#fff", textAlign: "center" }}>
                    <img src="/efrases.png" className="edit-logo" alt="Logo do eFrases" width={"270px"} />
                    <p style={{ color: "#7378EE", textAlign: "center", fontWeight: "300",}} className="slogan">
                        O melhor, feito especialmente <b>pra você!</b>
                    </p>
                    <br /> <br />
                </h1>
            </header>

            <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {isMobile ? <TextGeneratorMobile /> : <TextGeneratorDesktop />}
            </main>

            {isMobile ? <Footermobile /> : <Footer />}
=======
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
>>>>>>> db8a886ada88c71795954e05d070a9d4ac4db14f
        </div>
    );
}
