const characterInfo = document.getElementById('characterInfo')

const allCharacters = () => {
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(data => printCharacter(data))
        .catch(error => { console.error(`Error: ${error}`) })
}

const getCharacterInfo = () => {
    const nameInput = document.getElementById('characterName')
    const name = nameInput.value.trim()
    console.log(name)

    fetch(`http://localhost:3000/characters/${name}`)
        .then(response => response.json())
        .then(data => printCharacter(data))
        .catch(error => characterInfo.innerHTML = `<p>Imposible acceder al personaje</p>`)
}

const printCharacter = (data) => {
    data.forEach(character => {
        const template = `
        <li class="card">
            <img src="${character.img}" alt="${character.name}" />
            <p><span>Nombre:</span> ${character.name}</p>
            <p><span>Estado:</span> ${character.status}</p>
            <p><span>Especie:</span> ${character.species}</p>
            <p><span>Género:</span> ${character.gender}</p>
            <p><span>Origen:</span> <a href="${character.origin.url}" target="_blank">${character.origin.name}</a></p>
        </li>`
        characterInfo.innerHTML += template
    })
}

allCharacters()