FROM node:18-alpine AS base
WORKDIR /usr/src/app

# Copia os arquivos de dependência (não precisa mais do "backend/")
COPY package.json ./
COPY package-lock.json ./

# Instala as dependências de produção
RUN npm install --only=production

# Copia o restante do código
COPY . .

EXPOSE 5001

CMD [ "node", "./src/bin/www" ]