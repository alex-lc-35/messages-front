/*public/app.js*/
import { get, post } from './services/httpService.js';

console.log("GO !!!!!")

const socket = io("http://messages.me", {
    path: "/socket/socket.io",
    transports: ["websocket"], // forcer uniquement websocket (pas polling)
});

socket.on("connect", () => {
    console.log("🟢 Connecté au serveur WebSocket");
});

socket.on("chat message", async (msg) => {
    console.log("💬 Message reçu :", msg);
    const message = await get('/messages.php?id=' + msg.id);
    appendMessage(message)
    console.log("💬 Message reçu :", message);
});

window.addEventListener('DOMContentLoaded', async () => {
    const messages = await get('/messages.php');
    const container = document.getElementById('messages');

    if (Array.isArray(messages)) {
        messages.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.id} - ${item.content}`;
            container.appendChild(div);
        });
    }

    document.getElementById('message-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const type = document.getElementById('type').value;
        const content = document.getElementById('content').value;
        await post('messages.php', { type, content });
    });
});

function appendMessage(item) {
    const container = document.getElementById('messages');
    if (!container) return;

    const div = document.createElement('div');
    div.textContent = `${item.id} - ${item.content}`;
    container.appendChild(div);
}
