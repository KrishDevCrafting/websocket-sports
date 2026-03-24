import { WebSocketServer } from "ws";
const wss = new WebSocketServer({
  port: 8080,
});

wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData, message, ip });
    wss.clients.forEach((client) => {
      if (client.readyState === 1) client.send(`Server Broadcast: ${message}`);
    });
  });
});
