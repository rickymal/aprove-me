#!/bin/sh

# Rodar as migrações do Prisma
npx prisma migrate deploy

# Sincronizar o banco de dados com o esquema Prisma (se necessário)
npx prisma db push

# Função para copiar os templates
copy_templates() {
  echo "Copying Handlebars templates to dist directory"
  mkdir -p dist/email/templates
  cp -r ./src/email/templates/* ./dist/email/templates
  if [ $? -eq 0 ]; then
    echo "Templates copied successfully"
  else
    echo "Failed to copy templates"
    exit 1
  fi
}

# Verificação da variável de ambiente NODE_ENV
if [ -z "$NODE_ENV" ]; then
  echo "Error: NODE_ENV is not set. Please set it to 'production', 'development', or 'test'."
  exit 1
fi

case "$NODE_ENV" in
  production)
    echo "Running in production mode"
    npm run start
    ;;
  development)
    echo "Running in development mode"
    npm run start:dev
    ;;
  test)
    echo "Running in test mode"
    npm run test
    ;;
  *)
    echo "Error: Invalid NODE_ENV value. Please set it to 'production', 'development', or 'test'."
    exit 1
    ;;
esac
