defmodule EventWeb.Router do
  use EventWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", EventWeb do
    pipe_through(:api)
    get("/", PageController, :index)
  end

  scope "/api", EventWeb do
    pipe_through(:api)
  end
end
