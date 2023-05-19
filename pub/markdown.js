/**
 *  I - Listas los archivos Markdown disponibles
 */
function listar() {
    const url = "http://localhost:3000/listar";
    fetch(url).then(
        response => response.json()
    ).then(
        data => {
            var html = "<ul>";
            var length = data.text.length;
            for (let index = 0; index < length; index++) {
                html += `<li>${data.text[index]}</li>
                <button onclick='verContenido("${data.text[index]}")'>ver</button>
                `;
            }

            html += `</ul>
            <div id="contenido"></div>
            `;
            document.querySelector("#lista").innerHTML = html;
        }
    );
}

/**
 * II - Ver el contenido de un archivo Markdown traducido a HTML
 */

function verContenido(file) {
    const url = "http://localhost:3000/contenido?nombre=" + file;

    fetch(url).then(
        response => response.json())
    .then(
        data => {
            document.querySelector("#contenido").innerHTML = data.text;
        }
    );
}


/**
 * III - Crear nuevos archivos MarkDown y almacenarlos en el servidor
 */
function createNew() {
    document.querySelector("#createNewFile").hidden = false;
}

function enviar(titulo,texto) {
    console.log(titulo+texto)
    const url = "http://localhost:3000/";
    const data = {
        title: titulo,
        text: texto,
    };
    console.log(data)

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    console.log(request)
    fetch(url, request).then(
        response => response.json())
    .then(
        data => {
            
        }
    );
    
    var content = `
        <h4>${titulo}</h4>
        <p>${texto}</p>
    `;

    document.getElementById("content").innerHTML = content;
}

document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('#title')
    const text = document.querySelector('#text')
    document.querySelector('#createNewFile').onsubmit = () => {
        enviar(title.value,text.value)
        return false;
    }
})