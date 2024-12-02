import { useState, useEffect } from 'react';
import TextGeneratorDesktop from './TextGeneratorDesktop';
import TextGeneratorMobile from './TextGeneratorMobile';
import Tutorial from './Tutorial';
import Contact from './Contato';
import Sobre from './sobre';


const Tabs = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkWindowSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkWindowSize();
        window.addEventListener('resize', checkWindowSize);
        return () => window.removeEventListener('resize', checkWindowSize);
    }, []);
<br/>
    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return isMobile ? <TextGeneratorMobile /> : <TextGeneratorDesktop />;
            case 'tutorial':
                return <Tutorial />;
            case 'Contato':
                return <Contato />;
            case 'sobre':
                return <Sobre />;
            default:
                return null;
        }
    };

    return (
        <div className="tabs-wrapper">
            <div 
                className={`tabs-container ${isMobile ? 'tabs-container-mobile' : 'tabs-container-desktop'}`}
            >
                {['home', 'tutorial', 'contact', 'sobre'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`tab-button ${activeTab === tab ? 'active-tab' : ''}`}
                    >
                        {tab === 'home' ? 'Início' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
            <div className="tabs-content">{renderContent()}</div>

            <style jsx>{`
                .tabs-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }
                .tabs-container {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                    gap: 10px;
                }
                .tabs-container-mobile {
                    flex-direction: column;
                    align-items: center;
                }
                .tabs-container-desktop {
                    flex-direction: row;
                }
                .tab-button {
                    padding: 10px 20px;
                    cursor: pointer;
                    color: white;
                    background-color: transparent;
                    border: 2px solid transparent;
                    border-radius: 5px;
                    font-weight: 600;
                    letter-spacing: 2px;
                    transition: all 0.3s ease;
                }
                .tab-button:hover {
                    color: #FF6347;
                }
                .active-tab {
                    border: 2px solid #FF6347;
                }
                .tabs-content {
                    width: 100%;
                    max-width: 1200px;
                }
                @media (max-width: 768px) {
                    .tabs-container {
                        gap: 5px;
                    }
                    .tab-button {
                        padding: 8px 15px;
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Tabs;
