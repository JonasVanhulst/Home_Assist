import { io } from "socket.io-client";

// Verbinden met de Python Socket.IO-server
const socketClient = io("http://192.168.1.108:5000");

// Loggen wanneer de client verbinding maakt
socketClient.on("connect", () => {
  console.log("Verbonden met de server. Client ID:", socketClient.id);
});

// Loggen wanneer de client losgekoppeld is
socketClient.on("disconnect", (reason) => {
  console.log("Verbroken van de server. Reden:", reason);
});

// Luister naar het 'new_data' event van de server
socketClient.on("new_data", (data) => {
  console.log("Ontvangen nieuwe data van server:", data);
});
