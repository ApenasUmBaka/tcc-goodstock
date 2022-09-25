FROM node:17
WORKDIR /app

# Set the TimeZone
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; echo $TZ > /etc/timezone

# Copy the files
COPY . ./
RUN chown -R node .

# Install the libs
USER node
RUN yarn install

# Run the container
CMD yarn run start:dev