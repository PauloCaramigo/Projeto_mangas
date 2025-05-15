import { setCookie, getCookie } from "./manageCookies.js";

const pageProfile = getCookie("pageProfile");

document.getElementById("aProfile").addEventListener("click", function (event) {
    event.preventDefault();

    fetch("../html/profileContent.html")
        .then(response => response.text())
        .then(async html => {
            const div = document.getElementById("content")
            div.innerHTML = html;

            const infoProfile = await import('./infoProfile.js');
            infoProfile.updateInfoProfile();

            setCookie("pageProfile", "profileInfo")
        })
        .catch(error => console.error('Error loading profile content:', error));
});

document.getElementById("aPerformance").addEventListener("click", function (event) {
    event.preventDefault();

    fetch("../html/performanceContent.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("content").innerHTML = html;

            setCookie("pageProfile", "performance")
        })
        .catch(error => console.error('Error loading performance:', error));
});

document.getElementById("aHistory").addEventListener("click", function (event) {
    event.preventDefault();

    fetch("../html/historyContent.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("content").innerHTML = html;

            setCookie("pageProfile", "history");
        })
        .catch(error => console.error('Error loading history:', error));
});

document.getElementById("aConfig").addEventListener("click", function (event) {
    event.preventDefault();

    fetch("../html/configContent.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("content").innerHTML = html;

            setCookie("pageProfile", "config");
        })
        .catch(error => console.error('Error loading config:', error))
});

document.getElementById("aHelp").addEventListener("click", function (event) {
    event.preventDefault();

    fetch("../html/helpContent.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("content").innerHTML = html;

            setCookie("pageProfile", "help");
        })
        .catch(error => console.error('Error loading help:', error))
});

if (pageProfile === "profileInfo") document.getElementById("aProfile").click();
else if (pageProfile === "performance") document.getElementById("aPerformance").click();
else if (pageProfile === "history") document.getElementById("aHistory").click();
else if (pageProfile === "config") document.getElementById("aConfig").click();
else if (pageProfile === "help") document.getElementById("aHelp").click();
else document.getElementById("aProfile").click();