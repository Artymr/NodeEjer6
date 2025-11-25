var express = require('express');
var router = express.Router();

// Middleware para verificar sesión
function auth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

/* GET página restringida */
router.get('/', auth, function(req, res) {
  res.render('restringida', { title: 'Página Restringida', user: req.session.user });
});

/* GET logout */
router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
