// Crear servidor...
const express = require('express');
require('dotenv').config();
const app = express();

// Exponer backend
const cors = require('cors');
app.use(cors());

// Capturar cuerpo de peticiones...
app.use(express.urlencoded({ extended : false }));
app.use(express.json());

// Configurar conexión MongoDB...
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.4xgfq.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
const option = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(uri, option)
.then(() => console.log("Base de datos conectada..."))
.catch((error) => console.log("Error en la conexión a la base de datos" + error));

// Importar rutas...
const {product_routes} = require('./routes');
app.use('/api/v1/product', product_routes);

// Escuchar servidor...
app.listen(process.env.PORT, () => {
    console.log("Escuchando por el puerto "+process.env.PORT+"...")
});
