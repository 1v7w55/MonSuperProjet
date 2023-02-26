
FROM python:3.7-alpine

WORKDIR /app

RUN apk update && apk add postgresql-dev build-base
RUN apk add --no-cache \
    jpeg-dev \
    zlib-dev \
    libpng-dev
COPY ./requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY ./entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
