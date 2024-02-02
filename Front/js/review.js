const name = document.getElementById('characterName').value
const container = document.getElementById('characterInfo')
const apiUrl = `http://localhost:4001/characters/${name}`

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data) {
            container.innerHTML = `
            ${data.map(character => `
            <div>
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p>Species: ${character.species}</p>
                <p>Gender: ${character.gender}</p>
                <p>Status: ${character.status}</p>
                <p>Origin: ${character.origin.name}</p>
            </div>
            `).join('')}
            `
        } else {
            container.innerHTML = 'personaje no encontrado'
        }
    })
