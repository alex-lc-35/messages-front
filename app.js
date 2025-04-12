window.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('http://projet4.traefik.me/api.php');
    const json = await res.json();

    const container = document.getElementById('messages');

    if (json.success && Array.isArray(json.data)) {
        json.data.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.id} - ${item.message}`;
            container.appendChild(div);
        });
    } else {
        container.textContent = 'Erreur lors du chargement des messages.';
    }
});
