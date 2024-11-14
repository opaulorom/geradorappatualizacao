import TextGenerator from "../components/TextGenerator";
import logo from "/public/efrases.png"; // Certifique-se de que o caminho está correto

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "70px",
        background: "linear-gradient(135deg, #081151, #081151)", // Exemplo de gradiente
      }}
    >
      {/* Logo */}
      <img
        src="/efrases.png"
        alt="Logo"
        style={{ width: "230px", marginBottom: "20px" }}
      />

      {/* Componente TextGenerator */}
      <TextGenerator />
    </div>
  );
}
