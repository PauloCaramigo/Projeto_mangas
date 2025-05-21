import { getCookie } from "/script/manageCookies.js";

const token = getCookie('accessToken');
const email = getCookie('email');

if (token && email) {
    fetch('http://127.0.0.1:8000/validAccessToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accessToken: token,
            email: email
        })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/';
        } else {
            throw new Error('Erro ao validar o token de acesso');
        }
    })
}