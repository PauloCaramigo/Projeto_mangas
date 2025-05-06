function createUser(event) {
    // Evita que a página recarregue ao enviar o formulário.
    event.preventDefault();

    if (document.getElementById("accountPassword").value !== document.getElementById("confirmPassword").value) {
        // Alterar posteriormente para que apareça um texto em vermelho informando o erro.
        alert("As senhas não coincidem. Tente novamente.");
        return;
    }

    password = document.getElementById("accountPassword").value;

    // Regex para validar a senha (mínimo 8 caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número).
    const az = /[a-z]/;
    const AZ = /[A-Z]/;
    const num = /[0-9]/;
    const special = /[\*\!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_\{\|\}~]/;
    const minLength = /.{8,}/;

    if (az.test(password) === false) { 
        alert("A senha deve ter pelo menos uma letra minuscula.");
        return 
    }
    if (AZ.test(password) === false) { 
        alert("A senha deve ter pelo menos uma letra maiscula.");
        return 
    }
    if (num.test(password) === false) { 
        alert("A senha deve ter pelo menos um caractere numérico.");
        return 
    }
    if (special.test(password) === false) { 
        alert("A senha deve ter pelo menos um caractere especial.");
        return 
    }
    if (minLength.test(password) === false) {
        alert("A senha deve ter pelo menos 8 caracteres.");
        return 
    }

    fetch('http://127.0.0.1:8000/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            realName: document.getElementById('realName').value,
            userName: document.getElementById("userName").value,
            email: document.getElementById('email').value,
            accountPassword: document.getElementById('accountPassword').value
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao criar usuário');
        }
    });
}