FROM node:17
WORKDIR /app

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; echo $TZ > /etc/timezone
RUN date 

COPY . ./
RUN yarn

RUN chown -R node .
USER node

CMD yarn run start:prod
# CMD yarn run start:dev