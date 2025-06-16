import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';

// Dados fictícios de uma notícia completa
const noticiaCompleta = {
  id: 1,
  titulo: "Nova tecnologia revoluciona o mercado brasileiro",
  subtitulo: "Startup brasileira desenvolve solução inovadora que promete transformar a forma como empresas gerenciam seus dados",
  conteudo: `
    <p>Uma startup brasileira baseada em São Paulo acaba de lançar uma solução tecnológica que promete revolucionar a forma como empresas de médio e grande porte gerenciam seus dados corporativos. A tecnologia, desenvolvida ao longo de três anos, utiliza inteligência artificial para automatizar processos que antes demandavam horas de trabalho manual.</p>

    <p>Segundo o CEO da empresa, João Silva, a solução já foi testada em mais de 50 empresas brasileiras, apresentando uma redução média de 70% no tempo gasto com análise de dados. "Nossa missão é democratizar o acesso a ferramentas de análise avançada, permitindo que empresas de todos os tamanhos possam tomar decisões baseadas em dados de forma rápida e eficiente", explica Silva.</p>

    <h3>Impacto no Mercado</h3>
    
    <p>A tecnologia desenvolvida pela startup tem potencial para impactar diversos setores da economia brasileira. Entre os principais beneficiados estão:</p>
    
    <ul>
      <li>Setor financeiro: otimização de análises de risco e crédito</li>
      <li>Varejo: melhoria na gestão de estoque e previsão de demanda</li>
      <li>Saúde: análise mais eficiente de dados de pacientes</li>
      <li>Educação: personalização do ensino baseada em performance</li>
    </ul>

    <p>Especialistas do setor consideram que essa inovação pode posicionar o Brasil como referência em soluções de análise de dados na América Latina. "É impressionante ver como uma empresa brasileira conseguiu desenvolver uma tecnologia que compete diretamente com soluções internacionais", comenta Maria Santos, analista de tecnologia.</p>

    <h3>Próximos Passos</h3>
    
    <p>A empresa planeja expandir suas operações para outros países da América Latina ainda em 2025. Com um investimento de R$ 15 milhões recebido recentemente, a startup pretende triplicar sua equipe e investir pesadamente em pesquisa e desenvolvimento.</p>

    <p>"Nosso objetivo é estar presente em pelo menos 10 países até o final de 2026", revela o CEO. A empresa também está desenvolvendo uma versão da solução voltada para pequenas empresas, que deve ser lançada no segundo semestre deste ano.</p>
  `,
  imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
  autor: "Carlos Mendes",
  dataPublicacao: "2025-06-13T10:30:00Z",
  dataAtualizacao: "2025-06-13T14:15:00Z",
  categoria: "Tecnologia",
  tags: ["Startup", "Inteligência Artificial", "Inovação", "Brasil"],
  tempoLeitura: "5 min"
};

// Notícias relacionadas
const noticiasRelacionadas = [
  {
    id: 2,
    titulo: "Investimentos em startups brasileiras crescem 45%",
    imagem: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop",
    dataPublicacao: "2025-06-12"
  },
  {
    id: 3,
    titulo: "IA na educação: universidades adotam novas tecnologias",
    imagem: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    dataPublicacao: "2025-06-11"
  },
  {
    id: 4,
    titulo: "Mercado de dados cresce 30% no Brasil",
    imagem: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    dataPublicacao: "2025-06-10"
  }
];

export default function DetalhesNoticia() {
  const [noticia, setNoticia] = useState(noticiaCompleta);
  const router = useRouter();

  const formatarData = (data) => {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const voltarPagina = () => {
    router.back();
  };

  const compartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: noticia.titulo,
        text: noticia.subtitulo,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const irParaNoticia = (id) => {
    router.push(`/noticia/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={voltarPagina}
              className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Voltar</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Portal de Notícias</h1>
            <button 
              onClick={compartilhar}
              className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Share2 size={16} />
              <span>Compartilhar</span>
            </button>
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
                <span className="text-gray-500 text-sm">
                  {noticia.tempoLeitura} de leitura
                </span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar size={16} className="mr-1" />
                {formatarData(noticia.dataPublicacao)}
              </div>
            </div>

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
                    {noticia.autor.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{noticia.autor}</p>
                  <p className="text-sm text-gray-500">Jornalista</p>
                </div>
              </div>
              {noticia.dataAtualizacao && (
                <p className="text-sm text-gray-500">
                  Atualizado em {formatarData(noticia.dataAtualizacao)}
                </p>
              )}
            </div>
          </div>

          <div className="px-8 mb-8">
            <img 
              src={noticia.imagem} 
              alt={noticia.titulo}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div className="px-8 pb-8">
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
              style={{
                lineHeight: '1.8',
                fontSize: '1.1rem'
              }}
            />

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Tag size={16} className="text-gray-500" />
                <span className="text-gray-600 font-medium">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {noticia.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Notícias Relacionadas */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Notícias Relacionadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {noticiasRelacionadas.map((noticia) => (
              <article 
                key={noticia.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => irParaNoticia(noticia.id)}
              >
                <img 
                  src={noticia.imagem} 
                  alt={noticia.titulo}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {noticia.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
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
  );
}
