FROM node:19
WORKDIR /app

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; echo $TZ > /etc/timezone
RUN date 

COPY . ./
RUN chown -R node .
RUN yarn

USER node

CMD yarn run start:prod
# CMD yarn run start:dev