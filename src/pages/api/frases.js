// pages/api/frases.js

const frases = {
  general: [
    "A vida é feita de escolhas.",
    "O melhor ainda está por vir.",
    "Nunca desista dos seus sonhos.",
    "Tudo acontece no tempo certo.",
    "Acredite no poder do agora.",
    "Você é mais forte do que pensa.",
    "O sucesso começa com a decisão de tentar.",
    "A felicidade é um estado de espírito.",
    "A simplicidade é o segredo da felicidade.",
    "A jornada é tão importante quanto o destino.",
    
  ],
  names: [
    "Para João, que a vida te sorria sempre!",
    "Ana! O melhor está por vir.",
    "Para Lucas, nunca pare de sonhar!",
    "Clara! Que sua jornada seja incrível.",
    "Para Maria, que a felicidade te acompanhe sempre!",
    "Pedro! O futuro é todo seu.",
    "Para Sofia, que seus dias sejam repletos de alegria!",
    "Para Paulo, que suas conquistas sejam muitas.",
    "Para Fernanda, acredite sempre no melhor.",
    "Que a felicidade te acompanhe sempre, Gustavo.",
  
  ],

  Parameuamor: [
    "te amo.",
    "Você é tudo pra mim!",
    "Você nunca vai precisar se sentir só"],

  celebrations: [
    "Parabéns! Que seu dia seja tão incrível quanto você.",
    "Feliz aniversário! Que seus sonhos se realizem.",
    "Parabéns por mais um ano de vida, que venham muitos outros.",
    "Hoje é seu dia! Aproveite cada momento.",
    "Feliz aniversário! Que a alegria nunca te falte.",
    "Parabéns! Que sua vida seja cheia de momentos felizes.",
    "Hoje celebramos você! Muitas felicidades.",
    "Feliz aniversário! Que seu caminho seja repleto de luz.",
    "Que sua celebração seja cheia de amor e alegria.",
    "Celebre cada vitória com gratidão e felicidade.",
   
  ],


  
  inspirational: [
    "Acredite em si mesmo, tudo é possível.",
    "Você pode tudo, basta querer.",
    "Não tenha medo de tentar, o sucesso vem com a coragem.",
    "O impossível é só uma questão de perspectiva.",
    "A persistência transforma sonhos em realidade.",
    "O maior erro é não tentar.",
    "O único limite que você tem é aquele que você coloca em sua mente.",
    "Seu único obstáculo é você mesmo.",
    "Acredite no seu potencial, você é capaz de grandes coisas.",
    "Grandes sonhos começam com pequenos passos.",
    
  ],
  love: [
    "O amor é a maior força do universo.",
    "Amar é dar asas ao outro sem nunca prendê-lo.",
    "O coração fala a linguagem que nenhuma palavra pode traduzir.",
    "Amar é encontrar o paraíso em um sorriso.",
    "O verdadeiro amor é aquele que cresce todos os dias.",
    "O amor é a chave para todas as portas da felicidade.",
    "Não há limites para o poder de um amor genuíno.",
    "Quando há amor, tudo é possível.",
    "O amor transforma o comum em extraordinário.",
    "Um coração cheio de amor é invencível",
    
   
  ],
  friendship: [
    "A amizade é o maior presente da vida.",
    "Amigos são a família que escolhemos.",
    "Um amigo verdadeiro é um tesouro raro.",
    "A amizade torna os bons momentos ainda melhores.",
    "A distância nunca separa amigos de verdade.",
    "Ter um amigo é nunca estar sozinho.",
    "Amizade é a base para qualquer relação duradoura.",
    "Rir com amigos é o melhor remédio.",
    "Amizade é compartilhar a jornada da vida.",
    "Amigos tornam o mundo mais bonito.",
   
  ],
  motivational: [
    "Você é mais forte do que pensa.",
    "Acredite, você pode alcançar o impossível.",
    "Cada passo para frente é uma vitória.",
    "Seja a mudança que deseja ver no mundo.",
    "A vida recompensa quem se esforça.",
    "Pequenos progressos levam a grandes conquistas.",
    "Nunca pare de aprender e crescer.",
    "A jornada pode ser longa, mas vale a pena.",
    "O sucesso é construído com esforço diário.",
    "Você é capaz de superar qualquer desafio.",
    
  ],
  spiritual: [
    "A fé move montanhas.",
    "O universo conspira a favor de quem acredita.",
    "A paz interior começa com a gratidão.",
    "Deus tem um plano para cada um de nós.",
    "A espiritualidade é a conexão com o divino dentro de você.",
    "A luz divina está sempre presente.",
    "Confie no processo divino da vida.",
    "Sua alma conhece o caminho, siga-a.",
    "A serenidade vem da conexão com o espírito.",
    "Cada dia é uma bênção para agradecer.",
    "jovens seguindo a cristo"
   
  ],
  welcome: [
    "Bem-vindo! Que sua jornada seja incrível.",
    "É um prazer ter você aqui!",
    "Que sua chegada traga alegria a todos nós.",
    "Bem-vindo ao início de algo maravilhoso.",
    "Que este seja o começo de grandes conquistas.",
    "Sua presença faz toda a diferença.",
    "Bem-vindo! Estamos ansiosos para compartilhar este momento com você.",
    "Aqui você encontrará um lar longe de casa.",
    "Bem-vindo! Que este lugar seja especial para você.",
    "Sua chegada ilumina o ambiente. Bem-vindo!",
   
  ],
  farewell: [
    "Despedidas são apenas um até logo.",
    "Leve consigo todas as boas memórias.",
    "Sentiremos sua falta, mas desejamos tudo de melhor para você.",
    "Que este novo capítulo seja incrível.",
    "Você deixa um vazio que ninguém poderá preencher.",
    "Até breve! Que sua jornada seja brilhante.",
    "As despedidas são o início de novas aventuras.",
    "Você sempre terá um lugar especial aqui.",
    "Boa sorte em sua nova jornada!",
    "A distância nunca apagará as boas lembranças.",
   
  ],
  gratitude: [
    "Obrigado por fazer a diferença em minha vida.",
    "Sua gentileza é inesquecível.",
    "Sou grato por tudo o que você fez.",
    "A gratidão transforma o comum em extraordinário.",
    "Obrigado por sempre estar lá por mim.",
    "Cada gesto seu significa muito.",
    "Sou imensamente grato pela sua amizade.",
    "Agradeço por cada momento especial que compartilhamos.",
    "Obrigado por ser uma luz em minha vida.",
    "A gratidão é a memória do coração. Obrigado!",
  
  ],
};

export default function handler(req, res) {
  const { category } = req.query;

  if (!category || !frases[category]) {
    return res.status(400).json({ error: "Categoria inválida ou não especificada" });
  }

  res.status(200).json(frases[category]);
}
