/**
 *  I - Listas los archivos Markdown disponibles
 */
function listar() {
  const url = "http://localhost:3000/listar";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
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
    });
}

/**
 * II - Ver el contenido de un archivo Markdown traducido a HTML
 */

function verContenido(file) {
  const url = "http://localhost:3000/contenido?nombre=" + file;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#contenido").innerHTML = data.text;
    });
}


/**
 * III - Crear nuevos archivos MarkDown y almacenarlos en el servidor
 */

function enviar() {
  const titulo = document.getElementById("title").value;
  const texto = document.getElementById("text").value;

  const url = "http://localhost:3000/";
  const data = {
    title: titulo,
    text: texto,
  };

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(url, request)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
