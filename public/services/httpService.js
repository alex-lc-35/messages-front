const baseURL = window.env.API_URL;

export async function get(endpoint) {
    try {
        const response = await fetch(baseURL + endpoint);
        const res = await response.json();

        if (res.message) {
            showMessage(res.message, !res.success);
        }

        if (res.success) {
            return res.data;
        } else {
            console.warn('GET failed response:', res);
        }

    } catch (err) {
        console.error('GET request failed:', err);
        showMessage('❌ Erreur réseau', true);
    }

    return null;
}

export async function post(endpoint, data) {
    try {
        const response = await fetch(baseURL + endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const res = await response.json();

        if (res.message) {
            showMessage(res.message, !res.success);
        }

        if (res.success) {
            return res.data || true;
        } else {
            console.warn('POST failed response:', res);
        }

    } catch (err) {
        console.error('POST request failed:', err);
        showMessage('❌ Erreur réseau', true);
    }

    return null;
}

function showMessage(message, isError = false, duration = 4000) {
    console.log("showMessage", message)
    const el = document.getElementById('info');
    if (!el) return;

    el.innerText = message;
    el.style.color = isError ? 'red' : 'green';

    if (!isError && duration > 0) {
        setTimeout(() => {
            el.innerText = '';
        }, duration);
    }
}
