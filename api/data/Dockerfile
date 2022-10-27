FROM python:3.10
WORKDIR /app

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; echo $TZ > /etc/timezone
RUN date 

RUN useradd user

COPY . ./
RUN chown -R user .
RUN pip3 install -r requirements.txt

USER user

CMD python3 -u src/main.py