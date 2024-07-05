const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

////////////////Registrar////////////////
const usuarios = require('./api/usuarios.js');
const ordenes = require('./api/ordenes.js');
const marcas = require('./api/marcas.js');
const modelos = require('./api/modelos.js');

/////////////////////////////////////////

const app = express();
const port = 3080;

app.use(cors());
app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.json({ limit: '50mb' }));

//////////////////USE////////////////////
app.use('/api/usuarios',usuarios);
app.use('/api/ordenes',ordenes);
app.use('/api/marcas',marcas);
app.use('/api/modelos',modelos);

/////////////////////////////////////////

//Indicar los dominios permitidso
const whiteList = ['http://localhost:5173/']
app.use(cors(whiteList))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
