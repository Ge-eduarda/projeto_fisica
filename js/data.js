const FONTES = [
  {
    id: "hidreletrica",
    nome: "Hidrelétrica",
    tipo: "renovavel",
    icone: "hidro",
    resumo: "A água em movimento gira turbinas conectadas a geradores. É a principal fonte de eletricidade do Brasil.",
    detalhe: "As usinas hidrelétricas aproveitam o desnível e o fluxo dos rios para mover turbinas e gerar eletricidade. No Brasil, elas respondem pela maior fatia da matriz elétrica, com gigantes como Itaipu e Belo Monte.",
    curiosidade: "Itaipu, no Rio Paraná, já bateu recordes mundiais de geração — uma única usina chegou a fornecer quase 10% de toda a energia elétrica consumida pelo Brasil."
  },
  {
    id: "solar",
    nome: "Solar",
    tipo: "renovavel",
    icone: "sol",
    resumo: "Painéis fotovoltaicos convertem luz solar direto em eletricidade. Inclui a Geração Distribuída (GD) nos telhados.",
    detalhe: "Os painéis solares transformam a luz do Sol em eletricidade por meio do efeito fotovoltaico. Além das grandes usinas solares, cresce rapidamente no Brasil a Geração Distribuída (GD): prédios, casas e comércios que produzem sua própria energia na laje e injetam o excedente na rede.",
    curiosidade: "O Brasil está entre os países com maior irradiação solar do planeta — em muitas regiões, um painel aqui gera mais energia que o mesmo painel na Alemanha, líder mundial em solar."
  },
  {
    id: "eolica",
    nome: "Eólica",
    tipo: "renovavel",
    icone: "vento",
    resumo: "A força dos ventos gira as hélices dos aerogeradores. O Nordeste brasileiro é uma potência mundial nessa fonte.",
    detalhe: "Os aerogeradores convertem a energia cinética do vento em eletricidade. O Nordeste do Brasil tem ventos fortes, constantes e que sopram ao contrário do consumo — perfeitos para complementar as hidrelétricas.",
    curiosidade: "Ventos do litoral nordestino chegam a girar turbinas por mais de 90% das horas do dia. O Brasil já figura entre os dez maiores produtores de energia eólica do mundo."
  },
  {
    id: "biomassa",
    nome: "Biomassa",
    tipo: "renovavel",
    icone: "folha",
    resumo: "Energia da matéria orgânica: bagaço de cana, casca de arroz, resíduos florestais e agrícolas viram calor e eletricidade.",
    detalhe: "A biomassa gera energia pela queima ou decomposição de material orgânico. As usinas de açúcar e etanol queimam o bagaço da cana em caldeiras, produzindo vapor e eletricidade — a chamada cogeração.",
    curiosidade: "O etanol da cana-de-açúcar e o bagaço usado nas caldeiras fazem o setor sucroenergético ser um dos exemplos de economia circular mais bem-sucedidos do agronegócio brasileiro."
  },
  {
    id: "geotermica",
    nome: "Geotérmica",
    tipo: "renovavel",
    icone: "terra",
    resumo: "Usa o calor vindo do interior da Terra. Forte em países como Islândia e Quênia, quase não aparece no Brasil.",
    detalhe: "A energia geotérmica aproveita o calor natural do subsolo para aquecer água, produzir vapor e mover turbinas. É uma fonte estável, que funciona dia e noite, independente do clima.",
    curiosidade: "Na Islândia, cerca de 25% da eletricidade vem do subsolo vulcânico — e quase todas as piscinas do país são aquecidas por água geotérmica."
  },
  {
    id: "oceanica",
    nome: "Oceânica",
    tipo: "renovavel",
    icone: "onda",
    resumo: "Captura a energia das marés e das ondas do mar. Tecnologia emergente, com enorme potencial ainda pouco explorado.",
    detalhe: "Usinas maremotrizes e conversores de ondas transformam o movimento constante dos oceanos em eletricidade. Ainda são caras e pouco difundidas, mas têm potencial imenso para países costeiros.",
    curiosidade: "A energia das marés é uma das únicas fontes previsíveis com décadas de antecedência — afinal, o movimento das marés depende da órbita da Lua."
  },
  {
    id: "petroleo",
    nome: "Petróleo",
    tipo: "naorenovavel",
    icone: "petroleo",
    resumo: "Seus derivados dominam os transportes: gasolina, diesel e querosene de aviação. Maior fonte da matriz energética mundial.",
    detalhe: "Do petróleo extraem-se combustíveis que movimentam carros, caminhões, navios e aviões. Ele lidera a matriz energética tanto do Brasil quanto do mundo, principalmente por causa dos transportes.",
    curiosidade: "Cada litro de gasolina representa milhões de anos de história: o petróleo se forma a partir de organismos marinhos que viveram há eras geológicas inteiras."
  },
  {
    id: "gas-natural",
    nome: "Gás Natural",
    tipo: "naorenovavel",
    icone: "chama",
    resumo: "O fóssil mais limpo da família. Termelétricas a gás 'despacham' rápido para complementar hidrelétricas e renováveis.",
    detalhe: "O gás natural alimenta indústrias, aquecedores e termelétricas. Como suas usinas ligam e desligam com rapidez, ele funciona como uma reserva flexível quando falta chuva ou vento.",
    curiosidade: "Uma termelétrica a gás consegue ir de zero à potência máxima em poucos minutos — enquanto uma hidrelétrica depende de reservatórios e uma nuclear leva dias."
  },
  {
    id: "carvao-mineral",
    nome: "Carvão Mineral",
    tipo: "naorenovavel",
    icone: "rocha",
    resumo: "Fortíssimo na geração elétrica mundial, especialmente na Ásia. É o combustível fóssil que mais emite CO₂.",
    detalhe: "O carvão move termelétricas há séculos e ainda sustenta grande parte da eletricidade global. Porém, é a fonte que mais libera gases de efeito estufa por unidade de energia gerada.",
    curiosidade: "A Revolução Industrial começou movida a carvão — e a primeira usina termelétrica da história (Londres, 1882) também queimava esse mineral."
  },
  {
    id: "nuclear",
    nome: "Nuclear",
    tipo: "naorenovavel",
    icone: "atomo",
    resumo: "A fissão do urânio libera enorme quantidade de calor. Alta densidade energética e zero emissão direta de CO₂.",
    detalhe: "Nos reatores, o urânio sofre fissão controlada, gerando calor que produz vapor e move turbinas. Tem baixo impacto climático, mas exige cuidados especiais com resíduos radioativos e segurança.",
    curiosidade: "Um único pastilha de urânio do tamanho de uma bateria de pilha equivale energeticamente a cerca de uma tonelada de carvão."
  }
];

const DADOS_MATRIZES = {
  energetica: {
    brasil: {
      titulo: "Matriz Energética — Brasil",
      renovavel: 49.5,
      itens: [
        { rotulo: "Petróleo e derivados", valor: 33.5, cor: "#37474f" },
        { rotulo: "Gás natural", valor: 13.5, cor: "#ef6c00" },
        { rotulo: "Hidrelétrica", valor: 11.0, cor: "#0277bd" },
        { rotulo: "Derivados da cana", valor: 12.0, cor: "#7cb342" },
        { rotulo: "Lenha e carvão vegetal", valor: 8.0, cor: "#8d6e63" },
        { rotulo: "Outras biomassas", valor: 7.5, cor: "#aed581" },
        { rotulo: "Eólica", valor: 4.5, cor: "#26c6da" },
        { rotulo: "Solar", valor: 3.5, cor: "#f7c948" },
        { rotulo: "Outras renováveis", valor: 3.0, cor: "#c5e1a5" },
        { rotulo: "Carvão mineral", valor: 2.5, cor: "#455a64" },
        { rotulo: "Nuclear (urânio)", valor: 1.0, cor: "#ab47bc" }
      ]
    },
    mundo: {
      titulo: "Matriz Energética — Mundo",
      renovavel: 15,
      itens: [
        { rotulo: "Petróleo", valor: 30.5, cor: "#37474f" },
        { rotulo: "Carvão mineral", valor: 26.0, cor: "#455a64" },
        { rotulo: "Gás natural", valor: 23.0, cor: "#ef6c00" },
        { rotulo: "Nuclear", valor: 4.5, cor: "#ab47bc" },
        { rotulo: "Outros não renováveis", valor: 1.0, cor: "#78909c" },
        { rotulo: "Biomassa e resíduos", valor: 7.0, cor: "#8d6e63" },
        { rotulo: "Hidrelétrica", valor: 6.0, cor: "#0277bd" },
        { rotulo: "Eólica, solar e outras", valor: 2.0, cor: "#26c6da" }
      ]
    }
  },
  eletrica: {
    brasil: {
      titulo: "Matriz Elétrica — Brasil",
      renovavel: 84,
      itens: [
        { rotulo: "Hidrelétrica", valor: 58.5, cor: "#0277bd" },
        { rotulo: "Eólica", valor: 12.0, cor: "#26c6da" },
        { rotulo: "Solar", valor: 8.5, cor: "#f7c948" },
        { rotulo: "Biomassa", valor: 5.0, cor: "#7cb342" },
        { rotulo: "Gás natural", valor: 7.5, cor: "#ef6c00" },
        { rotulo: "Petróleo e outros fósseis", valor: 4.0, cor: "#37474f" },
        { rotulo: "Nuclear", valor: 2.5, cor: "#ab47bc" },
        { rotulo: "Carvão mineral", valor: 2.0, cor: "#455a64" }
      ]
    },
    mundo: {
      titulo: "Matriz Elétrica — Mundo",
      renovavel: 30,
      itens: [
        { rotulo: "Carvão mineral", valor: 35.0, cor: "#455a64" },
        { rotulo: "Gás natural", valor: 22.0, cor: "#ef6c00" },
        { rotulo: "Hidrelétrica", valor: 14.0, cor: "#0277bd" },
        { rotulo: "Nuclear", valor: 10.0, cor: "#ab47bc" },
        { rotulo: "Eólica", valor: 8.0, cor: "#26c6da" },
        { rotulo: "Solar", valor: 5.5, cor: "#f7c948" },
        { rotulo: "Petróleo e outros fósseis", valor: 3.0, cor: "#37474f" },
        { rotulo: "Biomassa e outras", valor: 2.5, cor: "#7cb342" }
      ]
    }
  }
};

const DESTAQUES = {
  brasil: {
    emoji: "🇧🇷",
    titulo: "Destaque brasileiro",
    texto: "Na matriz elétrica do Brasil, a força é clara: a hidrelétrica lidera com folga, os ventos potentes do Nordeste impulsionam a eólica e a solar cresce em ritmo recorde — inclusive nos telhados, com a Geração Distribuída (GD). Somando tudo, mais de 80% da eletricidade nacional já é renovável."
  },
  mundo: {
    emoji: "🌍",
    titulo: "Retrato do cenário global",
    texto: "No mundo, a história é diferente: combustíveis fósseis como carvão, petróleo e gás ainda dominam tanto a matriz energética quanto a elétrica. As renováveis crescem rápido, mas representam apenas cerca de 15% da energia total e ~30% da eletricidade gerada."
  }
};
