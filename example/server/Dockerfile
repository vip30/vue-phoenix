FROM elixir:latest

WORKDIR /app
ADD . /app

# Install hex & rebar
RUN mix local.hex --force && \
    mix local.rebar --force && \
    mix hex.info

# Intall phoenix
ENV PHOENIX_VERSION=1.4.0
RUN mix archive.install hex phx_new $PHOENIX_VERSION --force