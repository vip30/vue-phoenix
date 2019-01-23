defmodule EventWeb.RoomChannel do
  use EventWeb, :channel

  def join("room:lobby", _payload, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    # get messages 10 - 1000
    broadcast(socket, "shout", %{
      text: "Hi there from phoenix"
    })

    {:noreply, socket}
  end
end
