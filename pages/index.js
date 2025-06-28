import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

// Dados fictícios das notícias (mantidos como fallback)
const noticiasDataFallback = [
  {
    id: 1,
    titulo: "Nova tecnologia revoluciona o mercado brasileiro",
    preview:
      "Startup brasileira desenvolve solução inovadora que promete transformar a forma como empresas gerenciam seus dados...",
    conteudo:
      "Uma startup brasileira baseada em São Paulo desenvolveu uma solução revolucionária que promete transformar completamente a forma como empresas de médio e grande porte gerenciam seus dados. A tecnologia, que utiliza inteligência artificial avançada e algoritmos de machine learning, permite processar grandes volumes de informações em tempo real, oferecendo insights precisos para tomadas de decisão estratégicas. Segundo os desenvolvedores, a solução já está sendo testada por mais de 50 empresas nacionais, com resultados que mostram um aumento de até 40% na eficiência operacional. A expectativa é que a tecnologia seja lançada oficialmente no mercado ainda neste ano, com planos de expansão para outros países da América Latina.",
    imagem:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
    dataPublicacao: "2025-06-13",
    categoria: "Tecnologia",
  },
  {
    id: 2,
    titulo: "Economia brasileira mostra sinais de recuperação",
    preview:
      "Indicadores econômicos apontam para crescimento no setor de serviços e indústria no primeiro trimestre de 2025...",
    conteudo:
      "Os indicadores econômicos do primeiro trimestre de 2025 revelam sinais consistentes de recuperação da economia brasileira. O setor de serviços registrou crescimento de 3,2% em relação ao mesmo período do ano anterior, enquanto a indústria apresentou alta de 2,8%. O mercado de trabalho também demonstra melhoria, com a taxa de desemprego caindo para 8,9%, o menor índice dos últimos três anos. Especialistas atribuem essa recuperação às políticas de estímulo econômico implementadas pelo governo e ao aumento da confiança dos consumidores e investidores.",
    imagem:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    dataPublicacao: "2025-06-12",
    categoria: "Economia",
  },
  // ... outros itens de fallback podem ser mantidos se necessário
];

export default function PortalNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [noticiasPorPagina] = useState(9);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        setCarregando(true);
        setErro(null);
        const response = await fetch("http://localhost:5001/news");

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        console.log("Notícias da API:", data);

        // Se a API retornar dados válidos, use-os, senão use o fallback
        if (data.news && Array.isArray(data.news) && data.news.length > 0) {
          setNoticias(data.news);
        } else {
          console.warn("API retornou dados vazios, usando fallback");
          setNoticias(noticiasDataFallback);
        }
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        setErro(error.message);
        // Em caso de erro, usar dados de fallback
        setNoticias(noticiasDataFallback);
      } finally {
        setCarregando(false);
      }
    };

    fetchNoticias();
  }, []);

  // Calcular notícias da página atual
  const indexUltimaNoticia = paginaAtual * noticiasPorPagina;
  const indexPrimeiraNoticia = indexUltimaNoticia - noticiasPorPagina;
  const noticiasAtuais = noticias.slice(
    indexPrimeiraNoticia,
    indexUltimaNoticia
  );

  // Calcular total de páginas
  const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);

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
    return dataObj.toLocaleDateString("pt-BR");
  };

  // Loading state
  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando notícias...</p>
        </div>
      </div>
    );
  }

  return (
    <>
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
            {/* Container para título e botão */}
            <div className="flex justify-between items-center mb-4">
              {/* Título centralizado */}
              <div className="flex-1 text-center">
                <h1 className="text-4xl font-bold text-gray-800">
                  Portal de Notícias
                </h1>
              </div>

              {/* Botão Nova Notícia */}
              <div className="flex-shrink-0">
                <Link href="/criar-noticia">
                  <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Nova Notícia
                  </button>
                </Link>
              </div>
            </div>

            {/* Subtítulo */}
            <p className="text-center text-gray-700">
              Suas notícias em primeira mão
            </p>

            {/* Mensagem de erro da API */}
            {erro && (
              <div className="mt-2 text-center">
                <span className="text-red-600 text-sm bg-red-100 px-3 py-1 rounded">
                  Aviso: Usando dados de exemplo (Erro na API: {erro})
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Verificar se há notícias */}
          {noticias.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Nenhuma notícia encontrada no momento.
              </p>
            </div>
          ) : (
            <>
              {/* Grid de Notícias */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {noticiasAtuais.map((noticia) => (
                  <article
                    key={noticia._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Imagem */}
                    <Link href={`/noticia/${noticia._id}`}>
                      <div className="h-48 overflow-hidden cursor-pointer">
                        <img
                          src={
                            noticia.imagem ||
                            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop"
                          }
                          alt={noticia.titulo}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop";
                          }}
                        />
                      </div>
                    </Link>

                    {/* Conteúdo do Card */}
                    <div className="p-6">
                      {/* Categoria e Data */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {noticia.categoria || "Geral"}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {formatarData(noticia.dataPublicacao || new Date())}
                        </span>
                      </div>

                      {/* Título */}
                      <Link href={`/noticia/${noticia._id}`}>
                        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-yellow-600 transition-colors cursor-pointer">
                          {noticia.titulo}
                        </h2>
                      </Link>

                      {/* Preview */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {noticia.subtitulo ||
                          noticia.descricao?.substring(0, 150) + "..."}
                      </p>

                      {/* Link Leia Mais */}
                      <div className="mt-4">
                        <Link href={`/noticia/${noticia._id}`}>
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
              {totalPaginas > 1 && (
                <>
                  <div className="flex justify-center items-center space-x-2">
                    {/* Botão Anterior */}
                    <button
                      onClick={paginaAnterior}
                      disabled={paginaAtual === 1}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        paginaAtual === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
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
                              ? "bg-yellow-400 text-gray-800"
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
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
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      Próximo →
                    </button>
                  </div>

                  {/* Informação da Paginação */}
                  <div className="text-center mt-4 text-gray-600">
                    Mostrando {indexPrimeiraNoticia + 1} a{" "}
                    {Math.min(indexUltimaNoticia, noticias.length)} de{" "}
                    {noticias.length} notícias
                  </div>
                </>
              )}
            </>
          )}
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
                  Desenvolvido pelo Grupo 4 - Certificadora de Competência
                  Identitária
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
