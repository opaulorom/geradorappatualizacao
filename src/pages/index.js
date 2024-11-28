import { useState, useEffect } from "react";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
import Footermobile from "../components/Footermobile";


export default function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Detecta o tamanho inicial
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
            {/* Camada de fundo */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                background: `
                    radial-gradient(circle, rgba(0, 0, 128, 0.8) 0%, rgba(0, 0, 139, 0.7) 40%, rgba(25, 25, 112, 1) 100%),
                    radial-gradient(circle at 5px, rgba(0, 0, 255, 0.3) 10px, transparent 1px)`,
                backgroundSize: "100%, 15px 27px",
                backgroundPosition: "center, 0 center",
                backgroundRepeat: "no-repeat, repeat",
            }}></div>

            {/* Camada de blur */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                backdropFilter: isMobile ? "blur(6px)" : "blur(8px)",
            }}></div>

            {/* Conteúdo principal */}
            <div style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: isMobile ? "50px" : "100px",
                minHeight: "100vh",
            }}>
                       
                {/* Cabeçalho */}
                <header>
                    <h1 style={{ color: "#fff", textAlign: "center" }}>
                        <br/>
                        <img src="/efrases.png" alt="Logo do eFrases" width="230px"  className="logo-edit"  />
                        
                       
                    </h1>
                </header>

                {/* Componente de Tabs */}
                <main style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}>
                    <Tabs />
                </main>

                {/* Rodapé */}
                {isMobile ? <Footermobile /> : <Footer />}
            </div>
        </div>
    );
}