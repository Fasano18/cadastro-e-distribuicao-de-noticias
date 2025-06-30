# 🚀 Guia de CI/CD com GitHub Actions + Vercel

Este guia explica como configurar o deploy automático na Vercel usando GitHub Actions.

## 📋 Pré-requisitos

1. **Conta no GitHub** com o repositório do projeto
2. **Conta no Vercel** (gratuita)
3. **Backend deployado** (Render, Railway, Heroku, etc.)

## 🔧 Configuração Inicial

### 1. **Configurar Vercel**

```bash
# Instalar Vercel CLI (opcional, para configuração inicial)
npm install -g vercel

# Fazer login
vercel login

# Configurar projeto (primeira vez)
vercel
```

### 2. **Configurar GitHub Secrets**

No seu repositório GitHub, vá em **Settings > Secrets and variables > Actions** e adicione:

- `VERCEL_TOKEN`: Token do Vercel (gerado em https://vercel.com/account/tokens)
- `VERCEL_ORG_ID`: ID da organização (encontrado em https://vercel.com/account)
- `VERCEL_PROJECT_ID`: ID do projeto (encontrado nas configurações do projeto no Vercel)
- `NEXT_PUBLIC_API_URL`: URL do seu backend (ex: https://seu-backend.onrender.com)

### 3. **Configurar Variáveis de Ambiente no Vercel**

No dashboard do Vercel, vá em **Settings > Environment Variables** e adicione:

- `NEXT_PUBLIC_API_URL`: URL do seu backend

## 🔄 Como Funciona o CI/CD

### **GitHub Actions Workflow**

O workflow `.github/workflows/deploy.yml` executa automaticamente:

1. **Test & Build**: 
   - Instala dependências
   - Roda linting
   - Faz type checking
   - Faz build do projeto

2. **Deploy**: 
   - Deploy automático na Vercel (apenas na branch main/master)

### **Triggers Automáticos**

- **Push para main/master**: Deploy automático para produção
- **Pull Request**: Apenas testes e build (sem deploy)
- **Merge na main**: Deploy automático para produção

## 🚀 Fluxo de Trabalho

### **Desenvolvimento**

1. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. Faça suas alterações e commit:
   ```bash
   git add .
   git commit -m "Adiciona nova funcionalidade"
   ```

3. Push para o GitHub:
   ```bash
   git push origin feature/nova-funcionalidade
   ```

4. Crie um Pull Request para main/master

### **Deploy Automático**

- **Pull Request**: GitHub Actions roda testes e build
- **Merge na main**: Deploy automático na Vercel
- **Push direto na main**: Deploy automático na Vercel

## 📊 Monitoramento

### **GitHub Actions**
- Acesse https://github.com/seu-usuario/seu-repo/actions
- Monitore execução dos workflows
- Veja logs de erro e sucesso

### **Vercel Dashboard**
- Acesse https://vercel.com/dashboard
- Veja deploys, logs, analytics
- Configure domínios customizados

## 🔧 Troubleshooting

### **Problemas Comuns**

1. **Build falha no GitHub Actions**
   - Verifique logs no GitHub Actions
   - Teste build local: `npm run build`
   - Verifique se todas as dependências estão no package.json

2. **Deploy não acontece**
   - Verifique se está na branch main/master
   - Confirme se os secrets estão configurados
   - Verifique se o Vercel token é válido

3. **Variáveis de ambiente**
   - Verifique se estão configuradas no Vercel
   - Confirme se o backend está acessível
   - Teste a URL da API localmente

### **Logs Úteis**

```bash
# Ver logs do Vercel (se tiver CLI instalado)
vercel logs

# Ver logs de um deploy específico
vercel logs [deploy-id]
```

## 🔒 Segurança

- Nunca commite arquivos `.env`
- Use secrets do GitHub para dados sensíveis
- Configure CORS no backend adequadamente
- Mantenha tokens do Vercel seguros

## 📈 Próximos Passos

1. **Configurar domínio customizado**
2. **Implementar testes automatizados**
3. **Configurar monitoramento de performance**
4. **Implementar rollback automático**
5. **Configurar notificações (Slack, Discord, etc.)**

## 🆘 Suporte

- [Documentação Vercel](https://vercel.com/docs)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Next.js Deploy](https://nextjs.org/docs/deployment)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git) 