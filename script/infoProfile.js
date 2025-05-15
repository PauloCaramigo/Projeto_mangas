import { getCookie } from "./manageCookies.js";

const userId = getCookie('userId');

function updateInfoProfile() {
    fetch(`http://127.0.0.1:8000/usuarios/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                const profilePhoto = document.getElementById('profilePhoto');
                const userName = document.getElementById('userNameInput');
                const realName = document.getElementById('realNameInput');
                const userEmail = document.getElementById('emailInput');

                
                profilePhoto.src = data.imgProfile ? data.imgProfile : '../src/accountCircle.svg';
                userName.value = data.userName;
                realName.value = data.realName;
                userEmail.value = data.email;
            });  
        } else {
            throw new Error('Erro ao resgatar as informações do usuário.');
        }
    });
}

export { updateInfoProfile };