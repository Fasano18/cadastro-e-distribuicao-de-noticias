import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Dados fictícios das notícias (depois será substituído pela API)
const noticiasData = [
  {
    id: 1,
    titulo: "Nova tecnologia revoluciona o mercado brasileiro",
    preview: "Startup brasileira desenvolve solução inovadora que promete transformar a forma como empresas gerenciam seus dados...",
    conteudo: "Uma startup brasileira baseada em São Paulo desenvolveu uma solução revolucionária que promete transformar completamente a forma como empresas de médio e grande porte gerenciam seus dados. A tecnologia, que utiliza inteligência artificial avançada e algoritmos de machine learning, permite processar grandes volumes de informações em tempo real, oferecendo insights precisos para tomadas de decisão estratégicas. Segundo os desenvolvedores, a solução já está sendo testada por mais de 50 empresas nacionais, com resultados que mostram um aumento de até 40% na eficiência operacional. A expectativa é que a tecnologia seja lançada oficialmente no mercado ainda neste ano, com planos de expansão para outros países da América Latina.",
    imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
    dataPublicacao: "2025-06-13",
    categoria: "Tecnologia"
  },
  {
    id: 2,
    titulo: "Economia brasileira mostra sinais de recuperação",
    preview: "Indicadores econômicos apontam para crescimento no setor de serviços e indústria no primeiro trimestre de 2025...",
    conteudo: "Os indicadores econômicos do primeiro trimestre de 2025 revelam sinais consistentes de recuperação da economia brasileira. O setor de serviços registrou crescimento de 3,2% em relação ao mesmo período do ano anterior, enquanto a indústria apresentou alta de 2,8%. O mercado de trabalho também demonstra melhoria, com a taxa de desemprego caindo para 8,9%, o menor índice dos últimos três anos. Especialistas atribuem essa recuperação às políticas de estímulo econômico implementadas pelo governo e ao aumento da confiança dos consumidores e investidores.",
    imagem: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    dataPublicacao: "2025-06-12",
    categoria: "Economia"
  },
  {
    id: 3,
    titulo: "Descoberta científica promete revolucionar medicina",
    preview: "Pesquisadores descobrem novo tratamento que pode ser eficaz no combate a doenças degenerativas...",
    conteudo: "Pesquisadores da Universidade de São Paulo (USP) anunciaram uma descoberta que pode revolucionar o tratamento de doenças degenerativas. O novo método, baseado em terapia genética avançada, mostrou-se eficaz em testes laboratoriais para combater o Alzheimer e o Parkinson. Durante os experimentos, observou-se uma melhoria significativa na regeneração neural e na redução dos sintomas característicos dessas doenças. A pesquisa, que durou cinco anos, contou com financiamento da FAPESP e colaboração internacional. Os próximos passos incluem testes clínicos em humanos, previstos para começar no final de 2025.",
    imagem: "https://plus.unsplash.com/premium_photo-1664477032812-e5608c4425dd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    dataPublicacao: "2025-06-11",
    categoria: "Ciência"
  },
  {
    id: 4,
    titulo: "Esportes: Copa do Mundo 2026 terá novidades",
    preview: "FIFA anuncia mudanças no formato do torneio que será realizado nos Estados Unidos, México e Canadá...",
    conteudo: "A FIFA oficializou importantes mudanças no formato da Copa do Mundo de 2026, que será realizada nos Estados Unidos, México e Canadá. O torneio contará com 48 seleções, divididas em 12 grupos de quatro times cada. As duas primeiras de cada grupo avançarão para as oitavas de final, junto com os oito melhores terceiros colocados. Esta será a primeira Copa do Mundo com três países-sede e promete ser a maior da história do futebol. O Brasil, como uma das principais seleções do mundo, já está se preparando para participar desta edição histórica do torneio.",
    imagem: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop",
    dataPublicacao: "2025-06-10",
    categoria: "Esportes"
  },
  {
    id: 5,
    titulo: "Mudanças climáticas: Brasil apresenta novo plano",
    preview: "Governo federal divulga estratégia nacional para redução de emissões de carbono até 2030...",
    conteudo: "O governo federal apresentou sua nova estratégia nacional para o combate às mudanças climáticas, estabelecendo metas ambiciosas para a redução de emissões de carbono até 2030. O plano prevê investimentos de R$ 200 bilhões em energias renováveis, reflorestamento e tecnologias limpas. Entre as principais medidas estão o fim do desmatamento ilegal na Amazônia, a ampliação da matriz energética renovável para 90% e a implementação de um sistema nacional de créditos de carbono. O Brasil busca se posicionar como líder mundial na transição para uma economia verde e sustentável.",
    imagem: "https://images.unsplash.com/photo-1615092296061-e2ccfeb2f3d6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    dataPublicacao: "2025-06-09",
    categoria: "Meio Ambiente"
  },
  {
    id: 6,
    titulo: "Inteligência Artificial transforma educação",
    preview: "Universidades brasileiras implementam IA para personalizar ensino e melhorar experiência dos estudantes...",
    conteudo: "Principais universidades brasileiras estão revolucionando o ensino superior através da implementação de sistemas de inteligência artificial. A USP, UNICAMP e UFRJ lideram essa transformação, utilizando IA para personalizar o aprendizado de acordo com o perfil de cada estudante. Os sistemas conseguem identificar dificuldades individuais e sugerir materiais de estudo específicos, resultando em uma melhoria média de 25% no desempenho acadêmico. Além disso, chatbots inteligentes estão sendo utilizados para orientação acadêmica e suporte aos alunos 24 horas por dia.",
    imagem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    dataPublicacao: "2025-06-08",
    categoria: "Educação"
  },
  {
    id: 7,
    titulo: "Mercado imobiliário aquece em 2025",
    preview: "Setor registra alta de 15% nas vendas no primeiro semestre com foco em sustentabilidade...",
    conteudo: "O mercado imobiliário brasileiro registra forte aquecimento em 2025, com crescimento de 15% nas vendas durante o primeiro semestre. O destaque fica por conta dos empreendimentos sustentáveis, que representam 60% das transações. Construtoras estão investindo pesadamente em tecnologias verdes, como sistemas de captação de água da chuva, painéis solares e materiais de construção ecológicos. As regiões metropolitanas de São Paulo, Rio de Janeiro e Belo Horizonte lideram esse crescimento, com forte demanda por imóveis residenciais e comerciais sustentáveis.",
    imagem: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    dataPublicacao: "2025-06-07",
    categoria: "Economia"
  },
  {
    id: 8,
    titulo: "Saúde pública: novo programa nacional",
    preview: "Ministério da Saúde lança iniciativa para ampliar cobertura de vacinação em todo território nacional...",
    conteudo: "O Ministério da Saúde lançou um ambicioso programa nacional para ampliar a cobertura vacinal em todo o território brasileiro. A iniciativa, denominada 'Brasil Vacinado', tem como meta atingir 95% de cobertura vacinal em todas as faixas etárias até 2027. O programa prevê a modernização de 5.000 postos de saúde, a contratação de 10.000 profissionais de enfermagem e o desenvolvimento de um aplicativo nacional para agendamento e acompanhamento das vacinas. Investimentos de R$ 5 bilhões garantirão a implementação do programa em todos os municípios brasileiros.",
    imagem: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    dataPublicacao: "2025-06-06",
    categoria: "Saúde"
  },
  {
    id: 9,
    titulo: "Tecnologia 5G chega a mais 100 cidades brasileiras",
    preview: "Operadoras expandem cobertura da rede 5G, prometendo revolucionar conectividade no interior do país...",
    conteudo: "As principais operadoras de telefonia móvel do Brasil anunciaram a expansão da rede 5G para mais 100 cidades do interior, representando um marco histórico para a conectividade nacional. A tecnologia promete velocidades até 100 vezes superiores ao 4G, viabilizando aplicações como telemedicina, educação à distância e agricultura de precisão em regiões antes limitadas pela conectividade. O investimento total das operadoras soma R$ 8 bilhões, com previsão de cobertura completa do território nacional até 2026.",
    imagem: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    dataPublicacao: "2025-06-05",
    categoria: "Tecnologia"
  },
  {
    id: 10,
    titulo: "Agricultura brasileira bate recorde de produtividade",
    preview: "Safra 2024/2025 supera expectativas com uso de tecnologias inovadoras e práticas sustentáveis...",
    conteudo: "A agricultura brasileira celebra um recorde histórico de produtividade na safra 2024/2025, superando todas as expectativas do setor. O uso intensivo de tecnologias como drones, sensores IoT e inteligência artificial contribuiu para um aumento de 18% na produção de grãos em relação ao ano anterior. Práticas sustentáveis, como rotação de culturas e agricultura de precisão, também desempenharam papel fundamental nesse resultado. O Brasil consolida sua posição como um dos maiores produtores mundiais de alimentos, contribuindo significativamente para a segurança alimentar global.",
    imagem: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
    dataPublicacao: "2025-06-04",
    categoria: "Agronegócio"
  }
];

export default function PortalNoticias() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [noticiasPorPagina] = useState(9); // Mudado de 5 para 9
  const [todasNoticias, setTodasNoticias] = useState(noticiasData);

  // Calcular notícias da página atual
  const indexUltimaNoticia = paginaAtual * noticiasPorPagina;
  const indexPrimeiraNoticia = indexUltimaNoticia - noticiasPorPagina;
  const noticiasAtuais = todasNoticias.slice(indexPrimeiraNoticia, indexUltimaNoticia);

  // Calcular total de páginas
  const totalPaginas = Math.ceil(todasNoticias.length / noticiasPorPagina);

  // Funções de paginação
  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const irParaPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  // Função para formatar data
  const formatarData = (data) => {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString('pt-BR');
  };

  return (
    <>
      {/* Adicionado Head para título da página */}
      <Head>
        <title>Portal de Notícias</title>
        <meta name="description" content="Suas notícias em primeira mão" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-yellow-400 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              Portal de Notícias
            </h1>
            <p className="text-center text-gray-700 mt-2">
              Suas notícias em primeira mão
            </p>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Grid de Notícias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {noticiasAtuais.map((noticia) => (
              <article 
                key={noticia.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Imagem - Agora com Link */}
                <Link href={`/noticia/${noticia.id}`}>
                  <div className="h-48 overflow-hidden cursor-pointer">
                    <img 
                      src={noticia.imagem} 
                      alt={noticia.titulo}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                {/* Conteúdo do Card */}
                <div className="p-6">
                  {/* Categoria e Data */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {noticia.categoria}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatarData(noticia.dataPublicacao)}
                    </span>
                  </div>

                  {/* Título - Agora com Link */}
                  <Link href={`/noticia/${noticia.id}`}>
                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-yellow-600 transition-colors cursor-pointer">
                      {noticia.titulo}
                    </h2>
                  </Link>

                  {/* Preview */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {noticia.preview}
                  </p>

                  {/* Link Leia Mais - Agora conectado */}
                  <div className="mt-4">
                    <Link href={`/noticia/${noticia.id}`}>
                      <span className="text-yellow-600 hover:text-yellow-800 font-medium text-sm cursor-pointer">
                        Leia mais →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sistema de Paginação */}
          <div className="flex justify-center items-center space-x-2">
            {/* Botão Anterior */}
            <button
              onClick={paginaAnterior}
              disabled={paginaAtual === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                paginaAtual === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              ← Anterior
            </button>

            {/* Números das Páginas */}
            <div className="flex space-x-1">
              {Array.from({ length: totalPaginas }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => irParaPagina(index + 1)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    paginaAtual === index + 1
                      ? 'bg-yellow-400 text-gray-800'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Botão Próximo */}
            <button
              onClick={proximaPagina}
              disabled={paginaAtual === totalPaginas}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                paginaAtual === totalPaginas
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Próximo →
            </button>
          </div>

          {/* Informação da Paginação */}
          <div className="text-center mt-4 text-gray-600">
            Mostrando {indexPrimeiraNoticia + 1} a {Math.min(indexUltimaNoticia, todasNoticias.length)} de {todasNoticias.length} notícias
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Portal de Notícias</h3>
              <p className="text-gray-300 mb-4">
                Mantendo você informado sobre os principais acontecimentos
              </p>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-sm">
                  © 2025 Portal de Notícias. Todos os direitos reservados.
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Desenvolvido pelo Grupo 4 - Certificadora de Competência Identitária
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}