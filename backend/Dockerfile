FROM node:20.13.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# Usar o mesmo ENTRYPOINT
ENTRYPOINT ["./init.sh"]
