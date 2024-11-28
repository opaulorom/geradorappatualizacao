// components/Tutorial.js
import React from "react";
import styles from "./Tutorial.module.css";  // Importando o CSS como módulo

const Tutorial = () => {
    return (
        <div className={styles.tutorialContainer}>
            <header>
                <h2 className={styles.tutorialTitle}>Mini Tutorial do eFrases</h2>
            </header>
            <article className={styles.tutorialSteps}>
                <section className={`${styles.step} ${styles.step1}`}>
                    <h3 className={`${styles.stepTitle} ${styles.step1Title}`}>1. Digite seu Nome</h3>
                    <p className={styles.stepDescription}>Insira seu nome no campo designado para personalizar as frases geradas.</p>
                </section>
                <section className={`${styles.step} ${styles.step2}`}>
                    <h3 className={`${styles.stepTitle} ${styles.step2Title}`}>2. Escolha um Tipo de Frase</h3>
                    <p className={styles.stepDescription}>Selecione uma categoria de frases, como Amor, Inspiração ou Celebrações.</p>
                </section>
                <section className={`${styles.step} ${styles.step3}`}>
                    <h3 className={`${styles.stepTitle} ${styles.step3Title}`}>3. Adicione uma Frase Personalizada</h3>
                    <p className={styles.stepDescription}>Digite sua própria frase e clique em "Adicionar Frase" para torná-la única.</p>
                </section>
                <section className={`${styles.step} ${styles.step4}`}>
                    <h3 className={`${styles.stepTitle} ${styles.step4Title}`}>4. Personalize o Visual</h3>
                    <p className={styles.stepDescription}>Altere as cores e tamanhos do texto e do fundo para um visual exclusivo.</p>
                </section>
                <section className={`${styles.step} ${styles.step5}`}>
                    <h3 className={`${styles.stepTitle} ${styles.step5Title}`}>5. Carregue uma Imagem de Fundo</h3>
                    <p className={styles.stepDescription}>Arraste e solte ou clique para fazer upload de uma imagem de fundo.</p>
                </section>
                <section className={`${styles.step} ${styles.step6}`}>
                    <h3 className={`${styles.stepTitle} ${styles.step6Title}`}>6. Gere uma Nova Frase</h3>
                    <p className={styles.stepDescription}>Clique em "Nova Frase" para obter uma frase aleatória da categoria selecionada.</p>
                </section>
                <section className={`${styles.step} ${styles.step7}`}>
                    <h3 className={`${styles.stepTitle} ${styles.step7Title}`}>7. Baixe sua Criação</h3>
                    <p className={styles.stepDescription}>Escolha o formato desejado e clique em "Baixar Imagem Vertical" para salvar sua criação.</p>
                </section>
                <section className={styles.finalTips}>
                    <h3 className={styles.finalTips}>Dicas Finais</h3>
                    <p className={styles.stepDescription}>Explore as categorias e personalize suas frases para torná-las ainda mais especiais!</p>
                </section>
            </article>
        </div>
    );
};

export default Tutorial;
