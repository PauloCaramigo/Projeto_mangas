fetch(`http://127.0.0.1:8000/latestMangas`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (response.ok) {
        response.json().then(data => {
            const recentMangasContainer = document.getElementById('recentMangas');

            data.slice(0, 9).forEach(manga => {
                const mangaElement = document.createElement('div');
                mangaElement.classList.add('flex', 'p-4', 'rounded-lg', 'shadow-md', 'mt-4');
                mangaElement.innerHTML = `
                    <img src="${manga.mangaImage}" alt="${manga.mangaName}" class="mr-4 w-32">
                    <div>
                        <h2 class="text-xl font-bold mb-4">${manga.mangaName}</h2>
                        <p class="line-clamp-4">${manga.resumeManga}</p>
                    </div>
                `;
                recentMangasContainer.appendChild(mangaElement);
            });
        });  
    } else {
        throw new Error('Erro ao resgatar as informações do usuário.');
    }
});