
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const bp = require('body-parser')
const MarkdownIt = require('markdown-it'),
	md = new MarkdownIt();

app.use(express.static('pub'));
app.use(bp.json())
app.use(bp.urlencoded({
	extended: true
}))



app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000")
});

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'))
});


/**
 *  I - Listas los archivos Markdown disponibles
 */

app.get('/listar', (request, response) => {
	fs.readdir(path.resolve(__dirname, 'files'), 'utf8',
		(err, data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			console.log(data)
			response.json({
				text: data
			})
		})
      //
});

/**
 * II - Ver el contenido de un archivo Markdown traducido a HTML
 */


app.get('/contenido',(request,response) => {
	var nombre = request.query.nombre;
		fs.readFile(path.resolve(__dirname, 'files/' + nombre), 'utf8',
		(err, data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			
			response.json({
				text: md.render(data).replace(/\n/g, '<br>')
			})
		})
      //
});

/**
 * III - Crear nuevos archivos MarkDown y almacenarlos en el servidor
 */

app.post('/', (request, response) => {
	console.log(request.body);
	fs.writeFile(path.resolve(__dirname,'files/' + request.body.title + '.txt'),request.body.text,'utf8',
		(err,data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
	})
	}
);