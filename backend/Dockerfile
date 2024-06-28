FROM node:20.13.1

WORKDIR /app

# Copie apenas os arquivos necessários primeiro
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Em seguida, copie o restante dos arquivos
COPY . .

EXPOSE 3000
