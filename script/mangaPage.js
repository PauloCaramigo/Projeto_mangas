import { getCookie } from "/script/manageCookies.js";

const likeButton = document.getElementById("likeButton");
const dislikeButton = document.getElementById("deslikeButton");

const url = window.location.href.split("/");
var mangaId = url[url.length - 1];

mangaId = mangaId.replace(/%20/g, " ");

fetch(`http://127.0.0.1:8000/manga/${mangaId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
.then(response => {
    if (response.ok) {
        response.json().then(data => {
            document.getElementById("mangaImage").src = data[0].mangaImage;
            document.getElementById("mangaName").innerHTML = data[0].mangaName;
            document.getElementById("resumeManga").innerHTML = data[0].resumeManga;
            document.getElementById("mangaGenre").innerHTML = data[0].genre;
            document.getElementById("mangaName").innerHTML = data[0].mangaName;
        });  
    } else {
        throw new Error('Erro ao resgatar as informações do manga');
    }
});

fetch(`http://127.0.0.1:8000/qntLikeManga`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            idManga: mangaId,
            likeType: 1
    })
}).then(response => {
    response.json().then(data => {
        const likeCountEl = document.getElementById("like");

        likeCountEl.innerHTML = data.qnt;
    })
});

fetch(`http://127.0.0.1:8000/qntLikeManga`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            idManga: mangaId,
            likeType: 0
    })
}).then(response => {
    response.json().then(data => {
        const likeCountEl = document.getElementById("deslike");

        likeCountEl.innerHTML = data.qnt;
    })
});

likeButton.addEventListener("click", async function () {
    const now = new Date();
    const localTime = new Date(now.getTime() + (-3 * 60 * 60 * 1000));
    const dateTime = localTime.toISOString().slice(0, 19).replace('T', ' ');

    const teste = await verifyLike(mangaId, getCookie("userId"), false);
    if (teste) { await removeLike(false); }

    addLike(dateTime, true);
});

dislikeButton.addEventListener("click", async function () {
    const now = new Date();
    const localTime = new Date(now.getTime() + (-3 * 60 * 60 * 1000));
    const dateTime = localTime.toISOString().slice(0, 19).replace('T', ' ');

    const teste = await verifyLike(mangaId, getCookie("userId"), true);
    if (teste) { await removeLike(true); }

    addLike(dateTime, false);
});


function addLike(dateTime, likeType) {
    fetch('http://127.0.0.1:8000/likeManga', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idManga: mangaId,
            codigoUsuario: getCookie('userId'),
            dateLike: dateTime,
            like: likeType,
        })
    })
    .then(response => {
        if (response.ok) {
            response.json().then(async data => {
                if (data.alreadyLiked) {
                    await removeLike(likeType);
                }
                window.location.reload();
            })
        } else {
            throw new Error('Erro ao dar o like/deslike no manga');
        }
    });

    return like;
}

async function verifyLike(idUser, idManga, likeType) {
    return new Promise(resolve => {
        fetch('http://127.0.0.1:8000/verifyLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idManga: idManga,
                codigoUsuario: idUser,
                likeType: likeType
            })
        })
        .then(response => {
            response.json().then(async data => {
                if (data.likeId != "") {
                    await removeLike(likeType);
                    resolve(true);
                }
                resolve(false);
            })
        });
    })
}

function removeLike(likeType) {
    return new Promise(resolve => {
        fetch('http://127.0.0.1:8000/removeLikeManga', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idManga: mangaId,
                codigoUsuario: getCookie('userId'),
                like: likeType,
            })
        })
        .then(response => {
            if (response.ok) {
                resolve(true);
            } else {
                throw new Error('Erro ao remover o like/deslike no manga');
            }
        });
    })
}