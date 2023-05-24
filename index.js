
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

app.get('/list', (request, response) => {
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
				files : data
			})
		})
      //
});

/**
 * II - Ver el contenido de un archivo Markdown traducido a HTML
 */


app.get('/content',(request,response) => {
	var name = request.query.name;
		fs.readFile(path.resolve(__dirname, 'files/' + name), 'utf8',
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
				text: md.render(data).replace(/\n/g, '<br>')
			})
		})
      //
});


app.post('/delete', (request, response) => {
	console.log(request);

	fs.unlink(path.resolve(__filename,'../files/' + request.body.title ),
		(err,data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			
			response.setHeader('Content-Type','application/json')
			response.end(JSON.stringify({
				confirm : 'True', 
			}))
		})

});


/**
 * III - Crear nuevos archivos MarkDown y almacenarlos en el servidor
 */

app.post('/create', (request, response) => {
	console.log(request.body);
	title = request.body.title
	text = request.body.text
	fs.writeFile(path.resolve(__dirname,'files/' + title + '.md'),
		text,'utf8',
		(err,data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			response.setHeader('Content-Type','application/json')
			response.end(JSON.stringify({
				title : title,
				text : text, 
			}))
	
		})
});


