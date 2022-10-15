FROM node:17
WORKDIR /app

# Set envs
ENV TZ=America/Sao_Paulo
ENV CERTSUBJ=/C=BR/ST=SP/L=Osasco/O=GoodStock/OU=IT Department/CN=saikiserver.servegame.com

# Set the TimeZone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; echo $TZ > /etc/timezone

# Update apt
RUN apt-get update;
RUN apt-get upgrade -y;

# Create the certs.
RUN mkdir certs;
RUN openssl genrsa -out certs/key.pem;
RUN openssl req -new -key certs/key.pem -out certs/csr.pem -subj ${CERTSUBJ};
RUN openssl x509 -req -days 365 -in certs/csr.pem -signkey certs/key.pem -out certs/cert.pem;

# Copy the files
COPY . ./
RUN chown -R node .

# Install the libs
USER node
RUN yarn install

# Run the container
CMD yarn run start:prod