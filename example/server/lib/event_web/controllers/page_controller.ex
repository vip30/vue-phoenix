defmodule EventWeb.PageController do
  use EventWeb, :controller
  require Logger

  def index(conn, _params) do
    conn
    |> put_resp_content_type("text/plain")
    |> send_resp(200, "Welcome to the web server")
  end
end
