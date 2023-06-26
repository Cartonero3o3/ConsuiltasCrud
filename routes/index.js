const express = require('express');
const router = express.Router();
const { mongoose, db } = require('../mongodbconnection');

const {
	todasLasPalabras,
	nuevasPalabras,
	eliminarPalabras,
	countDePalabras,
	buscarColecciones,
	buscadorDeTodasLasPalabras,
} = require('../services/index');

router.get('/', async (req, res) => {
    const result = await buscadorDeTodasLasPalabras(req, res);
    res.json(result);
});


//aki tengo todas las palabras guardadas con la funcion de que se dio, que esta guardada en services/index
router.get('/palabras', async (req, res) => {
	todasLasPalabras(req, res);
});
//esto agrega una nueva palabra a la coleccion de palabras
router.post('/nueva-palabra', async (req, res) => {
	nuevasPalabras(req, res);
});
//estos 2 me eliminan palabras segun lo que le pease al body/raw
router.delete('/eliminar-palabra', async (req, res) => {
	eliminarPalabras(req, res);
});
//es un buscador de palabras localhost:3000/buscar-malas-palabra?search=mo esto es lo que le paso por params y funciona con query
router.get('/countDePalabras', async (req, res) => {
	countDePalabras(req, res);
});
// Ruta para obtener una lista de las colecciones
router.get('/collections', async (req, res) => {
	buscarColecciones(req, res);
});

router.get('/crear', async (req, res) => {
	res.render('crear');
});

router.get('/eliminar', async (req, res) => {
	res.render('eliminar');
});

router.get("/eliminar/:nombre", (req, res) => {
	const articleId = req.params.nombre;
});

router.post("/eliminar-palabra", eliminarPalabras);


module.exports = router;
