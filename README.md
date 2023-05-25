<div align="center">
<table>
    <theader>
        <tr>
            <td><img src="https://github.com/rescobedoq/pw2/blob/main/epis.png?raw=true" alt="EPIS" style="width:50%; height:auto"/></td>
            <th>
                <span style="font-weight:bold;">UNIVERSIDAD NACIONAL DE SAN AGUSTIN</span><br />
                <span style="font-weight:bold;">FACULTAD DE INGENIERÍA DE PRODUCCIÓN Y SERVICIOS</span><br />
                <span style="font-weight:bold;">DEPARTAMENTO ACADÉMICO DE INGENIERÍA DE SISTEMAS E INFORMÁTICA</span><br />
                <span style="font-weight:bold;">ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS</span>
            </th>
            <td><img src="https://github.com/rescobedoq/pw2/blob/main/abet.png?raw=true" alt="ABET" style="width:50%; height:auto"/></td>
        </tr>
    </theader>
    <tbody>
        <tr><td colspan="3"><span style="font-weight:bold;">Formato</span>: Informe de Laboratorio</td></tr>
        <tr><td><span style="font-weight:bold;">Aprobación</span>:  2022/03/01</td><td><span style="font-weight:bold;">Código</span>: GUIA-PRLD-001</td><td><span style="font-weight:bold;">Página</span>: 1</td></tr>
    </tbody>
</table>
</div>

<div align="center">
<span style="font-weight:bold;">INFORME DE LABORATORIO</span><br />
</div>


<table>
<theader>
<tr><th colspan="6">INFORMACIÓN BÁSICA</th></tr>
</theader>
<tbody>
<tr><td>ASIGNATURA:</td><td colspan="5">Programación Web 2</td></tr>
<tr><td>TÍTULO DE LA PRÁCTICA:</td><td colspan="5">Ajax y NodeJS</td></tr>
<tr>
<td>NÚMERO DE LABORATORIO:</td><td>03</td><td>AÑO LECTIVO:</td><td>2023 A</td><td>NRO. SEMESTRE:</td><td>III</td>
</tr>
<tr>
<td>FECHA INICIO::</td><td>18-Mayo-2023</td><td>FECHA FIN:</td><td>24-Mayo-2023</td><td>DURACIÓN:</td> <td>07 Dias </td>
</tr>
<tr><td colspan="6">RECURSOS:
    <ul>
        <li><a href="https://www.w3schools.com/js">https://www.w3schools.com/js</a></li>
        <li><a href="www.w3schools.com/nodejs/nodejs_intro.asp">www.w3schools.com/nodejs/nodejs_intro.asp</a></li>
        <li><a href="https://nodejs.org/en/docs/guides/getting-started-guide/">https://nodejs.org/en/docs/guides/getting-started-guide/</a></li> 
        <li><a href="https://nodejs.dev/learn">https://nodejs.dev/learn</li>
        <li><a href="https://www.w3schools.com/js/js_api_fetch.asp">https://www.w3schools.com/js/js_api_fetch.asp</li>
        <li><a href="https://expressjs.com/es/">https://expressjs.com/es/</li>
        <li><a href="https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch">https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch</li>
        <li><a href="https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs/Introduction">https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs/Introduction</li>
    </ul>
</td>
</<tr>
<tr><td colspan="6">
DOCENTE: 
<li>Carlo Jose Luis Corrales Delgado</li>
<br>
INTEGRANTES:
<ul>
<li>Vladimir Arturo Sulla Quispe - vsullaq@unsa.edu.pe</li>
<li>GITHUB https://github.com/Vladimir2003-debug/PW2-LAB02 </li>
</ul>

</td>
</<tr>
</tdbody>
</table>

# Ejercicios Resueltos

## Ejercicio I

Listas los archivos Markdown disponibles

### Solucion

Primero en el html donde 

```html
    <!-- El button que ejecutara la accion -->
    <button onclick="list()" id="bList">View Files</button>
    <br>
    <!-- En este div se reemplazara el interior con la lista de archivos -->
    <div id="list"></div>
    <!-- Esta seccion es para el proximo ejercicio-->
    <div id="content"></div>
```

Luego esta la peticion del cliente


```javascript
function list() {
    // URL del servidor()
    const url = "http://localhost:3000/list";
    // Se hace un fetch(promise)
    fetch(url).then(
        response => response.json()
    ).then(
        data => {
          
            var list = document.querySelector("#list")
            var length = data.files.length;

            // En caso de retornar un arreglo vacio
            if(length == 0) {
                list.innerHTML = "<br><h3>No hay archivos en el servidor</h3>";
                return
            }
            // Bucle que lista los archivos poniendoles dos button: uno para ver y otro para eliminar(para facilitar el trabajo) 
            for (let index = 0; index < length; index++) {
                html += `
                <li>${data.files[index]}</li>
                <button onclick='viewContent("${data.files[index]}")'>VIEW</button>
                <button onclick='deleteFile("${data.files[index]}")'>DELETE</button>
                `;
            }
            html += `</ul>
            `;
            // Canbiamos el contenido de list por el html creado
            list.innerHTML = html;
        }
    );
}

```
En el servidor

```javascript

app.get('/list', (request, response) => {
	// Revisamos los archivos en files
    fs.readdir(path.resolve(__dirname, 'files'), 'utf8',
    // Se borro el err por temas de espacio
		(data) => {
			// Retorna la lista de archivos en un arreglo llamado files 
			response.json({
				files : data
			})
		})
      //
});

```
## Ejercio II

Ver el contenido de un archivo Markdown traducido a HTML
### Solucion 

En el html

```html
<!-- El html sera creado por el Ejercicio I--> 
```
En el cliente

```javascript

function viewContent(file) {
    // URL del servidor enviamos como parametro el nombre del archivo
    const url = "http://localhost:3000/content?name=" + file;

    fetch(url).then(
        response => response.json()
    ).then(
        data => {
            // Cambiamos el content con el texto del data
            document.querySelector("#content").innerHTML = data.text;
        }
    );
}

```
En el servidor

```javascript
app.get('/content',(request,response) => {
	// Extraemos el nombre del archivo de la peticion
	var name = request.query.name;

		// Con ese nombre buscamos en files el archivo y extraemos el contenido en el 
		fs.readFile(path.resolve(__dirname, 'files/' + name), 'utf8',
		data => {
			// Devolvemos el contenido transformando el contendio markdown en formato html
			response.json({
				text: md.render(data).replace(/\n/g, '<br>')
			})
		})
      //
});

```
## Ejercicio III

Crear nuevos archivos MarkDown y almacenarlos en el servidor
### Solucion

En el HTML

```html
    <!-- El button para mostrar el formulario-->
    <button onclick="createNewFile()" id="bCreate">crear Nuevo</button>
    <div id="formCreateFile">
    <!-- El formulario para ingresar los datos -->
    <form id="createNewFile" method="POST" hidden>
        <br>
        <label>TITULO</label>
        <br><br>
        <input id="title" type="text">
        <br><br>
        <label>CONTENIDO</label>
        <br><br>
        <textarea id="text" placeholder="texto del archivo"></textarea>
        <br><br>
        <input type="submit" value="Enviar" id="bCreateNewFile">
        <br>
    </form>
    </div>
    <!-- En esta seccion se ubicara el contenido del archivo creado pero en markdown -->
    <div id="contentNewFile"></div>
```

En el cliente

```javascript


```

En el servidor

```javascript

app.post('/create', (request, response) => {
	// Extraemos el titulo y el contenido de la peticion del cliente
	title = request.body.title
	text = request.body.text
	// Ubicamos donde queremos crear el nuevo archivo 
	fs.writeFile(path.resolve(__dirname,'files/' + title + '.md'),
		text,'utf8',
		data => {
            //
			// Devolvemos lo enviado para confirmar 
			response.setHeader('Content-Type','application/json')
			response.end(JSON.stringify({
				title : title,
				text : text, 
			}))
	
		})
});

```


# Cuestionario

- En el Ejemplo "Hola Mundo" con NodeJS. ¿Qué pasó con la línea: "Content type ….."?
    
    - Segun [1] El "Content-Type:application/json" sirve para indicar el tipo de respuesta que el servidor enviara.
    El content-type puede ser
        - "Content-Type:application/json"
        - "Content-Type:application/xml"
        - "Content-Type:application/x-javascript"

- En los ejercicios. ¿En qué lugar debería estar el archivo poema.txt?
    - De acuerdo con el ejercicio 
    ```javascript
    .
    .
    .

    app.get('/recitar', (request, response) => {
        // En esta seccion se indica que el poema esta dentro de un directorio llamado priv
        // la parte de path resolve nos ayuda con las rutas absolutas y relativas
        fs.readFile(path.resolve(__dirname, 'priv/poema.txt'), 'utf8',
            (err, data) => {
                if (err) {
                    console.error(err)
                    response.status(500).json({
                        error: 'message'
                    })
                    return
                }
                response.json({
                    text: data.replace(/\n/g, '<br>')
                })
            })
        //
    })
    .
    .
    .

    ```
- ¿Entiende la expresión regular en el código y se da cuenta de para qué es útil?
    - La expresion regular en el codigo indica que todos los saltos de linea("\n") deben de reemplazarse con el 
      "br" esto por qur al enviar el texto al servidor y al leer el archivo los saltos de linea son puestos como ejemplo de la siguiente manera: "text\ntext"
- Note que la respuesta del servidor está en formato JSON, ¿Habrá alguna forma de verla directamente?
    - Si, en la consola del cliente usando console.log se puede ver.
## Referencias

[1] https://www.ibm.com/docs/es/bpm/8.5.6?topic=apis-content-types
