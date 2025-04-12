window.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('http://sandbox.projet-4.me/api.php');
    const json = await res.json();

    const container = document.getElementById('messages');

    if (json.success && Array.isArray(json.data)) {
        json.data.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.id} - ${item.content}`;
            container.appendChild(div);
        });
    } else {
        container.textContent = 'Erreur lors du chargement des messages.';
    }
});
