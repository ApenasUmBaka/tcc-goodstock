# Basics
FROM node:19
WORKDIR /app

# Set the datetime.
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; echo $TZ > /etc/timezone; date

# Update repos.
RUN apt-get update; apt-get upgrade -y;

# Install libs.
COPY package.json .
RUN yarn

# Change to user
COPY . ./
RUN chown -R node .
USER node

# Run
CMD yarn run start:prod
# CMD yarn run start:dev