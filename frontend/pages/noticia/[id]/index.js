import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Share2,
  Loader2,
  MapPin,
  Trash2,
  Edit3,
} from "lucide-react";

export default function DetalhesNoticia() {
  const [noticia, setNoticia] = useState(null);
  const [noticiasRelacionadas, setNoticiasRelacionadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  // Função para buscar uma notícia específica
  const buscarNoticia = async (noticiaId) => {
    try {
      const response = await fetch(`http://localhost:5001/news/${noticiaId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar notícia: ${response.status}`);
      }
      const data = await response.json();
      console.log("Notícia da API:", data);

      // A API retorna a notícia dentro do campo 'news'
      return data.news;
    } catch (error) {
      console.error("Erro ao buscar notícia:", error);
      throw error;
    }
  };

  // Função para buscar notícias relacionadas por tema ou categoria
  const buscarNoticiasRelacionadas = async (noticiaAtual) => {
    try {
      const response = await fetch("http://localhost:5001/news");
      if (!response.ok) {
        throw new Error(
          `Erro ao buscar notícias relacionadas: ${response.status}`
        );
      }
      const data = await response.json();
      console.log("Notícias relacionadas da API:", data);

      // A API pode retornar um array diretamente ou dentro de um campo
      // Verifica se tem campo 'news' ou se é um array direto
      let noticias = [];
      if (Array.isArray(data)) {
        noticias = data;
      } else if (data.news && Array.isArray(data.news)) {
        noticias = data.news;
      } else if (data.data && Array.isArray(data.data)) {
        noticias = data.data;
      }

      // Filtra notícias relacionadas por tema ou categoria, excluindo a atual
      const relacionadas = noticias
        .filter((noticia) => {
          return (
            noticia._id !== noticiaAtual._id &&
            (noticia.tema === noticiaAtual.tema ||
              noticia.categoria === noticiaAtual.categoria)
          );
        })
        .slice(0, 3);

      // Se não encontrar por tema/categoria, pega as 3 mais recentes
      if (relacionadas.length === 0) {
        return noticias
          .filter((noticia) => noticia._id !== noticiaAtual._id)
          .sort(
            (a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao)
          )
          .slice(0, 3);
      }

      return relacionadas;
    } catch (error) {
      console.error("Erro ao buscar notícias relacionadas:", error);
      throw error;
    }
  };

  // Carrega os dados quando o componente é montado ou o ID muda
  useEffect(() => {
    if (!id) return;

    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca a notícia principal primeiro
        const noticiaData = await buscarNoticia(id);
        setNoticia(noticiaData);

        // Depois busca as relacionadas baseadas na notícia atual
        const relacionadasData = await buscarNoticiasRelacionadas(noticiaData);
        setNoticiasRelacionadas(relacionadasData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  const formatarData = (data) => {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatarLocalizacao = (local) => {
    if (!local) return "";

    const partes = [];
    if (local.cidade) partes.push(local.cidade);
    if (local.estado) partes.push(local.estado);
    if (local.pais) partes.push(local.pais);

    return partes.join(", ");
  };

  const voltarPagina = () => {
    router.back();
  };

  const editarNoticia = () => {
    router.push(`/noticia/${id}/editar`);
  };

  const compartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: noticia.titulo,
        text: noticia.subtitulo,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  const excluirNoticia = async () => {
    // Confirma se o usuário realmente deseja excluir
    if (
      !confirm(
        "Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir notícia: ${response.status}`);
      }

      // Se a exclusão foi bem-sucedida, redireciona para a página anterior
      alert("Notícia excluída com sucesso!");
      router.back();
    } catch (error) {
      console.error("Erro ao excluir notícia:", error);
      alert("Erro ao excluir a notícia. Tente novamente.");
    }
  };

  const irParaNoticia = (noticiaId) => {
    router.push(`/noticia/${noticiaId}`);
  };

  // Estados de loading e erro
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-600">Carregando notícia...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded mb-4">
            <p className="font-semibold">Erro ao carregar a notícia</p>
            <p>{error}</p>
          </div>
          <button
            onClick={voltarPagina}
            className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Notícia não encontrada</p>
          <button
            onClick={voltarPagina}
            className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative w-full">
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-bold text-gray-800 text-center">
                Portal de Notícias
              </h1>
            </div>
            <button
              onClick={voltarPagina}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Voltar</span>
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={editarNoticia}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 size={16} />
                <span>Editar</span>
              </button>
              <button
                onClick={excluirNoticia}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} />
                <span>Excluir</span>
              </button>
              <button
                onClick={compartilhar}
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Share2 size={16} />
                <span>Compartilhar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {noticia.categoria}
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {noticia.tema}
                </span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar size={16} className="mr-1" />
                {formatarData(noticia.dataPublicacao)}
              </div>
            </div>

            {/* Localização */}
            {noticia.local && formatarLocalizacao(noticia.local) && (
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <MapPin size={16} className="mr-1" />
                <span>{formatarLocalizacao(noticia.local)}</span>
              </div>
            )}

            <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {noticia.titulo}
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {noticia.subtitulo}
            </p>

            <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-800">
                    {noticia?.autor?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{noticia.autor}</p>
                  <p className="text-sm text-gray-500">Jornalista</p>
                </div>
              </div>
              {noticia.updatedAt && noticia.updatedAt !== noticia.createdAt && (
                <p className="text-sm text-gray-500">
                  Atualizado em {formatarData(noticia.updatedAt)}
                </p>
              )}
            </div>
          </div>

          {/* Imagem */}
          {noticia.imagem && (
            <div className="px-8 mb-8">
              <img
                src={noticia.imagem}
                alt={noticia.titulo}
                className="w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop";
                }}
              />
            </div>
          )}

          <div className="px-8 pb-8">
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              style={{
                lineHeight: "1.8",
                fontSize: "1.1rem",
              }}
            >
              <p>{noticia.descricao}</p>
            </div>
          </div>
        </article>

        {/* Notícias Relacionadas */}
        {noticiasRelacionadas.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Notícias Relacionadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {noticiasRelacionadas.map((noticiaRelacionada) => (
                <article
                  key={noticiaRelacionada._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => irParaNoticia(noticiaRelacionada._id)}
                >
                  <img
                    src={noticiaRelacionada.imagem}
                    alt={noticiaRelacionada.titulo}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop";
                    }}
                  />
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {noticiaRelacionada.categoria}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {noticiaRelacionada.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {noticiaRelacionada.subtitulo}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{noticiaRelacionada.autor}</span>
                      <span>
                        {new Date(
                          noticiaRelacionada.dataPublicacao
                        ).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
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
  );
}
