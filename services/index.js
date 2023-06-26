const express = require('express');
const { mongoose, db } = require('../mongodbconnection');

async function buscadorDeTodasLasPalabras(req, res) {
	try {
		const DiccionarioDB = mongoose.connection.db;
		const body = req.body;
		const collectionPalabras = await DiccionarioDB.collection('palabras');
		
		const palabras = await collectionPalabras.find().toArray();
		
		return palabras;
	} catch (err) {
		console.error(err);
		res.status(400).send('Error en el servidor');
	}
}

async function todasLasPalabras(req, res) {
	try {
		const DiccionarioDB = mongoose.connection.db;
		const body = req.body;
		const collectionPalabras = await DiccionarioDB.collection('palabras');
		
		if (body.categoria === null || body.categoria.length === 0) {
			const palabras = await collectionPalabras.find().toArray();
			res.json({ palabras })
		}else{
			const buscadorDePalabra = await collectionPalabras.find({categoria: {$in: body.categoria}}).toArray();
			res.json({ buscadorDePalabra });
		}
	} catch (err) {
		console.error(err);
		res.status(400).send('Error en el servidor');
	}
}

async function nuevasPalabras(req, res) {
	try {
		const DiccionarioDB = mongoose.connection.db;
		const collectionPalabras = await DiccionarioDB.collection('palabras');
		const body = req.body;
		const buscadorDePalabra = await collectionPalabras.findOne({ palabra: { $regex: body.palabra } });

		if (buscadorDePalabra === null) {
			const result = await collectionPalabras.insertOne({ palabra: body.palabra, definicion: body.definicion, categoria: body.categoria });
			res.redirect("/")
		} else {
			res.redirect("/")
		}
	} catch (err) {
		console.error(err);
		res.status(400).send('Error en el servidor');
	}
}


async function eliminarPalabras(req, res) {
	try {
		const DiccionarioDB = mongoose.connection.db;
		const collectionPalabras = await DiccionarioDB.collection('palabras');
		const body = req.body;
		const buscoPalabra = await collectionPalabras.findOne({ palabra: { $regex: body.palabra } });

		if (buscoPalabra === null) {
			res.status(400).send('Te has equivocado al poner la palabra o la palabra no existe');
			res.redirect("/")
			return;
		} else {
			const result = await collectionPalabras.deleteOne({ palabra: body.palabra });
			res.redirect("/")
		}
	} catch (err) {
		console.error(err);
		res.status(400).send('Error en el servidor');
	}
}

async function countDePalabras(req, res) {
	try {
		const DiccionarioDB = mongoose.connection.db;
		const collectionPalabras = await DiccionarioDB.collection('palabras');
		const buscoPalabra = await collectionPalabras.find().toArray();
		const countDePalabras = buscoPalabra.length;
		res.json({ totalDePalabras: countDePalabras });
	} catch (err) {
		console.error(err);
		res.status(400).send('Error en el servidor');
	}
}


async function buscarColecciones(req, res) {
	try {
		const DiccionarioDB = mongoose.connection.db;
		const collections = await DiccionarioDB.listCollections().toArray();
		res.json(collections);
	} catch (err) {
		console.error(err);
		res.status(400).send('Error en el servidor');
	}
}


module.exports = {
	todasLasPalabras,
	nuevasPalabras,
	eliminarPalabras,
	countDePalabras,
	buscarColecciones,
	buscadorDeTodasLasPalabras,
};
