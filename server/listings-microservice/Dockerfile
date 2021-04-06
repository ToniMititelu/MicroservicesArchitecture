FROM python:3.8

ENV PYTHONIOENCODING UTF-8
ENV PYTHONUNBUFFERED 1

RUN pip install pipenv

WORKDIR /usr/app

COPY Pipfile Pipfile.lock ./

RUN pipenv install --deploy --system --dev

COPY ./listings /usr/app