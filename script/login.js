import { setCookie } from './manageCookies.js';

const form = document.getElementById('loginForm');
form.addEventListener('submit', loginUser);

function loginUser(event) {
    // Evita que a página recarregue ao enviar o formulário.
    event.preventDefault();

    fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            accountPassword: document.getElementById('accountPassword').value
        })
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                setCookie('accessToken', data.token, 30);
                setCookie('email', data.email, 30);
                window.location.href = '../html/mainPage.html';
            });  
        } else {
            throw new Error('Erro ao logar com o usuário informado');
        }
    });
}

