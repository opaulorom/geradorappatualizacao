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
        </div>
    );
}
