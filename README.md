# 📰 Cadastro e Distribuição de Notícias
  
Sistema web para **cadastro e distribuição de notícias**, com interface moderna e responsiva, desenvolvido para a matéria AS65A - Certificadora De Competência Identitária. O projeto implementa uma API RESTful robusta com funcionalidades de segurança avançadas e um frontend dinâmico construído com Next.js.
  
---
  
## ⭐ Features Destacadas
  
- **Arquitetura HATEOAS**: A API utiliza o conceito de HATEOAS (Hypermedia as the Engine of Application State), enriquecendo as respostas com links dinâmicos que guiam o cliente sobre as próximas ações possíveis.
- **Segurança Avançada**:
    - **Autenticação JWT**: Gerenciamento de sessão seguro com JSON Web Tokens.
    - **Revogação de Token**: Mecanismo de blacklist para invalidar tokens no momento do logout, garantindo que não possam ser reutilizados.
    - **Proteção contra Brute-Force**: Limitação de tentativas de login por IP para prevenir ataques de força bruta, com bloqueio temporário após exceder o limite.
- **Interface Moderna**: Frontend construído com Next.js e TailwindCSS, oferecendo uma experiência de usuário rápida, responsiva e intuitiva.
  
---
  
## 👥 Usuários do Sistema
  
- **Administradores**: Realizam o login para cadastrar, editar e excluir notícias.
- **Usuários Finais**: Acessam a plataforma para ler, buscar e filtrar as notícias disponíveis.
  
---
  
## ✅ Funcionalidades
  
- **RF01**: Cadastro seguro de usuários administradores.
- **RF02**: Autenticação e Logout com JWT, incluindo revogação de token e proteção contra brute-force.
- **RF03**: Gerenciamento completo (CRUD) de notícias em um painel administrativo.
- **RF04**: Listagem pública e paginada das notícias, ordenadas por data de publicação.
- **RF05**: Página de detalhes para cada notícia, com conteúdo completo e notícias relacionadas.
- **RF06**: Sistema de busca por palavra-chave e filtros por tema, título e autor.
- **RF07**: Interface totalmente responsiva, adaptada para desktops, tablets e smartphones.
- **RF08 (Não-Funcional)**: Respostas da API seguindo o padrão HATEOAS para guiar as interações do cliente.
- **RF09 (Não-Funcional)**: Segurança reforçada contra ataques de força bruta no endpoint de login.
  
---
  
## 💻 Tecnologias Utilizadas

As versões exatas de todas as bibliotecas estão detalhadas nos arquivos `package.json` nas pastas `backend` e `frontend`.
  
### 🧠 Linguagem
- **JavaScript (ES6+)**
  
### 🖥️ Frontend
- **React.js**
- **Next.js**
- **TailwindCSS**
- **Lucide-React** (para ícones)
  
### ⚙️ Backend
- **Node.js**
- **Express.js**
- **Mongoose** (para modelagem de dados)
- **JWT (jsonwebtoken)** e **bcrypt** (para autenticação e segurança)
- **Dotenv** (para gerenciamento de variáveis de ambiente)
  
### 🗃️ Banco de Dados
- **MongoDB**
  
---
  
## 🚀 Como Executar o Projeto
  
### Pré-requisitos
- [Node.js](https://nodejs.org/ ) (versão 18 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community ) (servidor local ou um cluster na nuvem como o MongoDB Atlas)
- [Git](https://git-scm.com/downloads) (`2.40` ou superior)
- Um gerenciador de pacotes como `npm` ou `yarn`.

## 🗄️ Configuração do Banco de Dados

O sistema requer uma base de dados MongoDB. Recomendamos o uso do **MongoDB Atlas**, que oferece um plano gratuito (free tier).

**Roteiro para configurar o MongoDB Atlas:**
1.  **Crie uma Conta:** Acesse [mongodb.com/atlas/register](https://www.mongodb.com/atlas/register) e crie uma conta gratuita.
2.  **Crie um Cluster Gratuito:** Siga as instruções para criar um novo projeto e um cluster compartilhado (Shared) gratuito (tier `M0`).
3.  **Configure o Acesso:**
    * Na aba **Database Access**, crie um usuário para o banco de dados (ex: `user: "noticias_user"`, `password: "sua_senha_segura"`). Guarde essas credenciais.
    * Na aba **Network Access**, adicione seu endereço de IP à lista de acesso clicando em "Add IP Address". Para um ambiente de teste, você pode permitir acesso de qualquer lugar (0.0.0.0/0), mas isso não é recomendado para produção.
4.  **Obtenha a String de Conexão:**
    * Vá para a visão geral do seu cluster e clique em **Connect**.
    * Selecione **Drivers**.
    * Copie a **Connection String** fornecida. Ela será algo como `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`.
    * **Substitua `<username>` e `<password>`** pelas credenciais que você criou no passo 3. Você também pode definir um nome para o seu banco de dados na string, antes do `?`, como: `mongodb.net/meu_banco_de_noticias?retryWrites=true...`.
    * Esta string completa é a sua `MONGO_URI`.

---
  
### 1. Configuração do projeto
  
**Passo 1: Abra o terminal  (Geralmente o atalho é ```Ctrl + '```)**
  
**Passo 2: Execute o seguinte comando:**
```bash
npm run install:all
```
**Passo 3: Configure as variáveis de ambiente do backend (.env)**
```
MONGO_URI=mongodb+srv://user:password@seu_cluster...
JWT_SECRET=seu_segredo_jwt_super_secreto
```
**Passo 4: Inicie o projeto**
```bash
npm start
```
**OU**
```bash
npm run dev
```
## 📝 API Endpoints
  
A API segue os princípios RESTful.
  
| Método | Rota               | Descrição                                         | Requer Autenticação (Admin) |
| :----- | :----------------- | :------------------------------------------------ | :-------------------------: |
| `POST` | `/auth/register`   | Registra um novo usuário.                         |             Não             |
| `POST` | `/auth/login`      | Autentica um usuário e retorna um token JWT.      |             Não             |
| `POST` | `/auth/logout`     | Desloga o usuário e invalida o token JWT.         |             Sim             |
| `POST` | `/news`            | Cria uma nova notícia.                            |             Sim             |
| `GET`  | `/news`            | Lista todas as notícias com paginação e filtros.  |             Não             |
| `GET`  | `/news/:id`        | Obtém os detalhes de uma notícia específica.      |             Não             |
| `PUT`  | `/news/:id`        | Atualiza uma notícia existente.                   |             Sim             |
| `DELETE`| `/news/:id`       | Exclui uma notícia.                               |             Sim             |
  
---
  
## 👨‍💻 Equipe e Divisão de Tarefas
  
- **Membro 1 (André)**: Backend (rotas, models, controllers, serviços, segurança) e HATEOAS
- **Membro 2 (Larissa)**: Frontend - Páginas públicas (home, detalhes da notícia)
- **Membro 3 (Emanuele)**: Frontend - Painel administrativo (criar e editar notícia)
- **Membro 4 (Leonardo)**: Integração frontend-backend + Lógica de autenticação
- **Todos**: Testes, revisão de código, deploy e documentação.
  
---

### Objetivo do Sistema
Centralizar o cadastro e a distribuição de notícias por meio de uma plataforma web robusta e segura, oferecendo uma interface de leitura agradável para os usuários e ferramentas de gerenciamento para administradores.

### Funcionalidades Desenvolvidas
- **Gerenciamento de Notícias (Admin):** Criação, Leitura, Atualização e Exclusão (CRUD) de notícias.
- **Visualização de Notícias (Público):** Listagem paginada, página de detalhes da notícia, e visualização de notícias relacionadas.
- **Busca e Filtro:** Pesquisa por palavras-chave em títulos e conteúdos.
- **Autenticação:** Sistema de registro, login e logout seguro com JWT e proteção contra brute-force.

### Conta de Acesso Padrão
Para facilitar os testes, uma conta de administrador padrão é **criada automaticamente** na primeira vez que o servidor backend é iniciado. Utilize as seguintes credenciais para acessar todas as funcionalidades administrativas:

-   **Username:** `admin`
-   **Email:** `admin@gmail.com`
-   **Senha:** `admin`

### Roteiro de Testes (Casos de Uso)

**1. Teste como Usuário Anônimo (sem login):**
- Acesse a home page: `http://localhost:3000`.
- Verifique se a lista de notícias é exibida corretamente.
- Teste a funcionalidade de paginação na parte inferior da página.
- Clique em qualquer notícia para navegar até a sua página de detalhes.
- Verifique se os botões "Editar" e "Excluir" **não** estão visíveis.

**2. Teste de Autenticação:**
- Na home page, clique em "Iniciar Sessão".
- Faça **login** utilizando a conta de administrador padrão (`username: admin`, `email: admin@gmail.com`, `senha: admin`).
- Após o login, você deve ser redirecionado ou a interface deve indicar que você está conectado.
- Navegue para a página de detalhes de uma notícia e verifique se os botões "Editar" e "Excluir" agora estão visíveis.
- Teste a função de **logout** e verifique se o acesso de administrador foi revogado (os botões de admin devem sumir).

**3. Teste como Administrador (com login):**
- Faça login com a conta `admin`.
- Clique no botão "Nova Notícia".
- Preencha todos os campos do formulário e **crie uma nova notícia**. Verifique se ela aparece na lista da home page.
- Na página de detalhes da notícia que você acabou de criar, clique em **Editar**.
- Altere o título ou a descrição e salve. Verifique se a notícia foi atualizada corretamente.
- Por fim, na mesma página de detalhes, clique em **Excluir**. Confirme a ação e verifique se a notícia foi removida permanentemente.
---
  
## ✅ Status do Projeto
  
Concluído.
  
---
  
## 📬 Contato
  
Caso tenha dúvidas ou sugestões, entre em contato com a equipe do projeto.
  