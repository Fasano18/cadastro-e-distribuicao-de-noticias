import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import dotenv from "dotenv";

dotenv.config();

export default function CriarNoticia() {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    tema: "",
    titulo: "",
    subtitulo: "",
    descricao: "",
    autor: "",
    categoria: "",
    cidade: "",
    estado: "",
    pais: "Brasil",
    imagem: "",
  });

  const mostrarErroPopup = (mensagem) => {
    setErrorMessage(mensagem);
    setShowErrorPopup(true);
  };

  const fecharErroPopup = () => {
    setShowErrorPopup(false);
    setErrorMessage("");
  };

  const validarUrlImagem = (url) => {
    if (!url || url.trim() === "") return "";

    if (url.includes("google.com/url") || url.includes("redirect")) {
      return "";
    }

    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
    if (!urlPattern.test(url)) {
      try {
        new URL(url);
        return url;
      } catch {
        return "";
      }
    }

    return url;
  };

  const categorias = [
    "Tecnologia",
    "Economia",
    "Política",
    "Saúde",
    "Educação",
    "Esportes",
    "Cultura",
    "Ciência",
    "Meio Ambiente",
    "Internacional",
    "Geral",
  ];

  const temas = [
    "Tecnologia",
    "Economia",
    "Política",
    "Saúde",
    "Educação",
    "Esportes",
    "Cultura",
    "Ciência",
    "Meio Ambiente",
    "Internacional",
    "Negócios",
    "Sociedade",
  ];

  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    const camposObrigatorios = [
      "tema",
      "titulo",
      "subtitulo",
      "descricao",
      "autor",
      "categoria",
      "cidade",
      "estado",
    ];
    for (let campo of camposObrigatorios) {
      if (!formData[campo].trim()) {
        setMensagem({
          tipo: "erro",
          texto: `O campo ${
            campo.charAt(0).toUpperCase() + campo.slice(1)
          } é obrigatório.`,
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);
    setMensagem({ tipo: "", texto: "" });

    try {
      const imagemValidada = validarUrlImagem(formData.imagem);
      const imagemFinal =
        imagemValidada ||
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop";

      const dadosEnvio = {
        tema: formData.tema,
        titulo: formData.titulo,
        subtitulo: formData.subtitulo,
        descricao: formData.descricao,
        autor: formData.autor,
        categoria: formData.categoria,
        local: {
          cidade: formData.cidade,
          estado: formData.estado,
          pais: formData.pais,
        },
        dataPublicacao: new Date().toISOString(),
        imagem: imagemFinal,
      };

      console.log("Dados sendo enviados:", dadosEnvio);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(dadosEnvio),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro da API:", errorText);
        throw new Error(`Erro na API: ${response.status} - ${errorText}`);
      }

      const resultado = await response.json();
      console.log("Notícia criada com sucesso:", resultado);

      setMensagem({
        tipo: "sucesso",
        texto: "Notícia criada com sucesso!",
      });

      setFormData({
        tema: "",
        titulo: "",
        subtitulo: "",
        descricao: "",
        autor: "",
        categoria: "",
        cidade: "",
        estado: "",
        pais: "Brasil",
        imagem: "",
      });

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      console.error("Erro completo:", error);

      let mensagemErro = "Erro desconhecido";
      if (error.message.includes("Failed to fetch")) {
        mensagemErro =
          "Erro de conexão: Verifique se a API está rodando em ${process.env.NEXT_PUBLIC_API_URL}";
      } else if (error.message.includes("NetworkError")) {
        mensagemErro = "Erro de rede: Não foi possível conectar com a API";
      } else {
        mensagemErro = error.message;
      }

      mostrarErroPopup(`Erro ao criar notícia: ${mensagemErro}`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Head>
        <title>Criar Nova Notícia - Portal de Notícias</title>
        <meta name="description" content="Criar uma nova notícia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {showErrorPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Erro ao Enviar
                    </h3>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-700 break-words">
                    {errorMessage}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={fecharErroPopup}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <header className="bg-yellow-400 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="relative w-full">
              <div className="flex justify-center items-center">
                <h1 className="text-3xl font-bold text-gray-800 text-center">
                  Criar Nova Notícia
                </h1>
              </div>
              <Link href="/">
                <button className="absolute top-1/2 left-0 transform -translate-y-1/2 text-gray-800 hover:text-gray-600 font-medium flex items-center gap-2">
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Voltar ao Portal
                </button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {mensagem.texto && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                mensagem.tipo === "sucesso"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {mensagem.texto}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="tema"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tema <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tema"
                    name="tema"
                    value={formData.tema}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option value="">Selecione um tema</option>
                    {temas.map((tema) => (
                      <option key={tema} value={tema}>
                        {tema}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="categoria"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Categoria <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="titulo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  required
                  placeholder="Digite o título da notícia"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="subtitulo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subtítulo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subtitulo"
                  name="subtitulo"
                  value={formData.subtitulo}
                  onChange={handleInputChange}
                  required
                  placeholder="Digite o subtítulo da notícia"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="descricao"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Descrição <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Digite o conteúdo completo da notícia"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-vertical"
                />
              </div>

              <div>
                <label
                  htmlFor="autor"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Autor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="autor"
                  name="autor"
                  value={formData.autor}
                  onChange={handleInputChange}
                  required
                  placeholder="Nome do autor da notícia"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Localização
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="cidade"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Cidade <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: São Paulo"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="estado"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Estado <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="">Selecione</option>
                      {estados.map((estado) => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="pais"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      País
                    </label>
                    <input
                      type="text"
                      id="pais"
                      name="pais"
                      value={formData.pais}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-gray-100"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="imagem"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  URL da Imagem (opcional)
                </label>
                <input
                  type="url"
                  id="imagem"
                  name="imagem"
                  value={formData.imagem}
                  onChange={handleInputChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use URLs diretas de imagem (ex: .jpg, .png). URLs de
                  redirecionamento serão ignoradas.
                </p>
              </div>

              {formData.imagem && validarUrlImagem(formData.imagem) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview da Imagem
                  </label>
                  <img
                    src={validarUrlImagem(formData.imagem)}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}

              {formData.imagem && !validarUrlImagem(formData.imagem) && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ URL da imagem inválida ou de redirecionamento. Uma imagem
                    padrão será usada.
                  </p>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={enviando}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                    enviando
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                  }`}
                >
                  {enviando ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                      Enviando...
                    </div>
                  ) : (
                    "Criar Notícia"
                  )}
                </button>
                <Link href="/">
                  <button
                    type="button"
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </main>

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
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
