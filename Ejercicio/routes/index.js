var express = require('express');
var router = express.Router();

// Lista de ejemplo
const elementos = [
  { tipo: 'imagen', url: '/images/imagen1.jpg'},
  { tipo: 'imagen', url: '/images/imagen2.jpg'},
  { tipo: 'texto', contenido: 'Mucho texto' },
  { tipo: 'texto', contenido: 'Poco texto' }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Página Inicial', elementos });
});

module.exports = router;
