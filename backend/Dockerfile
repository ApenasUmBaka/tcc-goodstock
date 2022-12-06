# Basics
FROM node:19
WORKDIR /app

# Set the timezone
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; echo $TZ > /etc/timezone

# Update apt
RUN apt-get update; apt-get upgrade -y;

# Create the certs.
ENV CERTSUBJ=/C=BR/ST=SP/L=Osasco/O=GoodStock/OU=IT Department/CN=saikiserver.servegame.com

RUN mkdir certs;
RUN openssl genrsa -out certs/key.pem;
RUN openssl req -new -key certs/key.pem -out certs/csr.pem -subj ${CERTSUBJ};
RUN openssl x509 -req -days 365 -in certs/csr.pem -signkey certs/key.pem -out certs/cert.pem;

# Install libs.
COPY package.json tsconfig.json ./
RUN yarn
RUN chown -R node .

# Change to user
COPY . ./
RUN chown -R node src
USER node

# Run
CMD yarn run start:prod
# CMD yarn run start:dev