import { getCookie } from "./manageCookies.js";
import { logoutUser } from "./logout.js";

const menu = document.getElementById("menuAccount");
const dropdown = document.getElementById("dropdownMenuAccount");

const hamburguerMenuIcon = document.getElementById("hamburguerMenuIcon");
const hamburguerMenuIconSideMenu = document.getElementById("hamburguerMenuIconSideMenu");
const sideMenu = document.getElementById("sideMenu");

const login = document.getElementById('login');
const logout = document.getElementById('logout');

const userId = getCookie('userId');

menu.addEventListener("click", function (event) {
    dropdown.toggleAttribute("hidden");
});

hamburguerMenuIcon.addEventListener("click", function (event) {
    sideMenu.classList.remove("-translate-x-full");
});

document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.setAttribute("hidden", true);
    }

    if (!hamburguerMenuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
        sideMenu.classList.add("-translate-x-full");
    } else if (hamburguerMenuIconSideMenu.contains(event.target) ) {
        sideMenu.classList.add("-translate-x-full");
    }
});

login.addEventListener("click", function (event) {
    window.location.href = '../html/login.html';
});

logout.addEventListener("click", function (event) {
    logoutUser();
})

fetch(`http://127.0.0.1:8000/imgProfile/${userId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (response.ok) {
        response.json().then(data => {
            const imgProfileHeader = document.getElementById('imgProfileHeader');

            imgProfileHeader.src = data.imgProfile ? data.imgProfile : '../src/accountCircle.svg';
        });  
    } else {
        throw new Error('Erro ao resgatar as informações do usuário.');
    }
});

if (userId) {
    login.toggleAttribute("hidden")
    logout.toggleAttribute("hidden")
}