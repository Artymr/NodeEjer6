var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', error: null });
});

/* POST login */
router.post('/', function(req, res, next) {
  const { username, password } = req.body;

  // Aquí iría la lógica de autenticación
  if (username === 'usuario' && password === 'contraseña') {
    req.session.user = username;
    res.redirect('/restringida');
  } else {
    res.render('login', { title: 'Login', error: 'El usuario y la contraseña son literalmente "usuario" y "contraseña"' });
  }
});

module.exports = router;
