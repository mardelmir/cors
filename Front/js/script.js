const characterInfo = document.getElementById('characterInfo')

const allCharacters = () => {
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(data => {
            console.log(data)

            data.forEach(character => {
                const template = `
                <li class="card">
                    <img src="${character.img}" alt="${character.name}" />
                    <p>Nombre: ${character.name}</p>
                    <p>Estado: ${character.status}</p>
                    <p>Especie: ${character.species}</p>
                    <p>Género: ${character.gender}</p>
                    <p>Origen: <a href="${character.origin.url}" target="_blank">${character.origin.name}</a></p>
                </li>`
                characterInfo.innerHTML += template
            }) 
        })
        .catch(error => { console.error(`Error: ${error}`) })
}


const getCharacterInfo = () => {
    const characterNameInput = document.getElementById('characterName')
    const characterName = characterNameInput.value.toLowerCase() // evita errores

    fetch(`http://localhost:3000/characters/${characterName}`)
        .then(response => response.json())

        .catch(error => characterInfo.innerHTML = `<p>Imposible acceder al personaje</p>`)
}

allCharacters()