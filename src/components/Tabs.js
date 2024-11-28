// components/Tabs.js
import { useState, useEffect } from 'react';
import TextGeneratorDesktop from './TextGeneratorDesktop';
import TextGeneratorMobile from './TextGeneratorMobile';
import Tutorial from './Tutorial';
import Contact from './Contact';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Verifica se a largura da janela é menor que 768px e atualiza o estado
        const checkWindowSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Verifica o tamanho da janela inicialmente
        checkWindowSize();

        // Adiciona o listener para a mudança de tamanho da janela
        window.addEventListener('resize', checkWindowSize);

        // Limpeza do listener quando o componente for desmontado
        return () => window.removeEventListener('resize', checkWindowSize);
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return isMobile ? <TextGeneratorMobile /> : <TextGeneratorDesktop />;
            case 'tutorial':
                return <Tutorial />;
            case 'contact':
                return <Contact />;
            default:
                return null;
        }
    };

    return (
        <div className="ajeitando">

            <div className="tabs-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px'  } } >
                <button 
                    onClick={() => setActiveTab('home')} 
                    className="edit-menu-tab"
                    style={{
                        padding: '10px 20px', 
                        cursor: 'pointer', 
                        color: 'white', 
                        backgroundColor: 'transparent',  // Fundo transparente
                        border: '2px solid transparent',  // Borda transparente
                        borderRadius: '5px',  // Borda arredondada
                        fontWeight: '600',  // Fonte mais grossa
                        letterSpacing: '2px',  // Espaçamento entre as letras
                        transition: 'all 0.3s ease'  // Transição suave
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#FF6347'} // Hover: Cor laranja
                    onMouseLeave={(e) => e.target.style.color = 'white'} // Retorna ao branco
                >
                    Início
                </button>
                <button 
                    onClick={() => setActiveTab('tutorial')} 
                    style={{
                        padding: '10px 20px', 
                        cursor: 'pointer', 
                        color: 'white',
                        backgroundColor: 'transparent',  // Fundo transparente
                        border: '2px solid transparent',  // Borda transparente
                        borderRadius: '5px',  // Borda arredondada
                        fontWeight: '600',  // Fonte mais grossa
                        letterSpacing: '2px',  // Espaçamento entre as letras
                        transition: 'all 0.3s ease'  // Transição suave
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#4CAF50'} // Hover: Cor verde
                    onMouseLeave={(e) => e.target.style.color = 'white'} // Retorna ao branco
                >
                    Tutorial
                </button>
                <button 
                    onClick={() => setActiveTab('contact')} 
                    style={{
                        padding: '10px 20px', 
                        cursor: 'pointer', 
                        color: 'white',
                        backgroundColor: 'transparent',  // Fundo transparente
                        border: '2px solid transparent',  // Borda transparente
                        borderRadius: '5px',  // Borda arredondada
                        fontWeight: '600',  // Fonte mais grossa
                        letterSpacing: '2px',  // Espaçamento entre as letras
                        transition: 'all 0.3s ease'  // Transição suave
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#ADD8E6'} // Hover: Cor azul claro
                    onMouseLeave={(e) => e.target.style.color = 'white'} // Retorna ao branco
                >
                    Contato
                </button>
            </div>

            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default Tabs;
