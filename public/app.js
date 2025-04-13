/*public/app.js*/
import { get, post } from './services/httpService.js';

window.addEventListener('DOMContentLoaded', async () => {
    const messages = await get('messages.php');
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
        const newMessage = await post('messages.php', { type, content });
        appendMessage(newMessage)
    });
});

function appendMessage(item) {
    const container = document.getElementById('messages');
    if (!container) return;

    const div = document.createElement('div');
    div.textContent = `${item.id} - ${item.content}`;
    container.appendChild(div);
}
