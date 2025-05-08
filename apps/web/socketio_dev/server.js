import { createServer } from "http";
import { Server } from "socket.io";

// HTTP-server aanmaken
const server = createServer();

// Socket.IO-server initialiseren
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Client verbonden:", socket.id);

  socket.on("new_data", (data) => {
    console.log("Ontvangen data:", data);
  });

  socket.on("disconnect", () => {
    console.log("Client ontkoppeld:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Socket.IO-server draait op poort 3000");
});
