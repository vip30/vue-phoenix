defmodule EventWeb.RoomChannel do
  use EventWeb, :channel

  def join("room:lobby", _payload, socket) do
    {:ok, socket}
  end

  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

end
