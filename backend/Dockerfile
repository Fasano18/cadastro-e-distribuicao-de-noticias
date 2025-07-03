# 1. Estágio de Build
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# Copia os arquivos de dependência do backend
COPY backend/package.json ./backend/package.json
COPY backend/package-lock.json ./backend/package-lock.json

# Instala as dependências de produção do backend
RUN cd backend && npm install --only=production

# Copia o restante do código do backend
COPY backend/ ./backend/

# Define o diretório de trabalho final
WORKDIR /usr/src/app/backend

# A porta que a aplicação vai escutar. Railway usa a variável PORT, mas é bom expor.
# O seu start script "nodemon -e js ./src/bin/www" indica que o servidor deve rodar na porta que o ambiente definir.
EXPOSE 5001 

# Comando para iniciar o servidor
# Usamos 'node' em vez de 'nodemon' para produção
CMD [ "node", "./src/bin/www" ]