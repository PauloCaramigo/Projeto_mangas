import { getCookie, removeCookie } from "./manageCookies.js";

function logoutUser() {
    const userId = getCookie('userId');
    const accessToken = getCookie('accessToken');

    fetch(`http://127.0.0.1:8000/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            accessToken: accessToken
        })
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                removeCookie("userId");
                removeCookie("email");
                removeCookie("accessToken");

                window.location.reload()
            });  
        } else {
            throw new Error('Erro ao resgatar as informações do usuário.');
        }
    });
}

export { logoutUser };