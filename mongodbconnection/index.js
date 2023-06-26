const mongoose = require('mongoose');

const uri = "mongodb+srv://Cartonero3o3:Friv1234@diccionario.7x6i71z.mongodb.net/Diccionario?retryWrites=true&w=majority"

function connect() {
	mongoose
		.connect(uri)
		.then(() => {
			console.log('Connected to the database ');
		})
		.catch((err) => {
			console.error(`Error connecting to the database. n${err}`);
		});
}

module.exports = {
	connect,
	mongoose,
	db: mongoose.connection.db
};
