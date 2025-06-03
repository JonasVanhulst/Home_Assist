// socket.js
import { io } from "socket.io-client";

const socket = io("http://192.168.1.108:5000");

// Verbinden
socket.on("connect", () => {
  console.log("Verbonden met de server. Client ID:", socket.id);
});

// Verbroken
socket.on("disconnect", (reason) => {
  console.log("Verbroken van de server. Reden:", reason);
});

export default socket;
