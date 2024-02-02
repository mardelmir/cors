const characterInfo = document.getElementById('characterInfo')
const found = document.getElementById('found')
const characterName = document.getElementById('characterName')

const allCharacters = () => {
    characterName.value = ''
    characterInfo.innerHTML = ''
    found.innerHTML = '<span class="warning">¡¡Atención!! puede tardar unos segundos en cargar</span>'

    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(data => printCharacter(data))
        .catch(error => { console.error(`Error: ${error}`) })
}

const getCharacterInfo = () => {
    const characterValue = document.getElementById('characterName').value

    if (characterValue.length === 0) {
        characterInfo.innerHTML = 'El cuadro de búsqueda está vacío, introduce un nombre para buscar'
        found.innerHTML = ''
    } else {
        const name = characterValue.trim()
        fetch(`http://localhost:3000/characters/${name}`)
            .then(response => response.json())
            .then(data => {
                data.error
                    ? ((found.innerHTML = ""), (characterInfo.innerHTML = `<h2>Error 404: Personaje no encontrado</h2>`))
                    : (printCharacter(data), (found.innerHTML = `Número de personajes encontrados: <span>${data.length}</span>`))
            })
            .catch(error => characterInfo.innerHTML = `<p>Imposible acceder al personaje</p>`)
    }
}

const printCharacter = (data) => {
    characterInfo.innerHTML = ''
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
    found.innerHTML = ''
}