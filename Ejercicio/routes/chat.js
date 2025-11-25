var express = require('express');
var router = express.Router();

function auth(req, res, next) {
  if (req.session.user) next();
    else res.redirect('/login');
}

router.get('/', auth, function(req, res, next) {
    res.render("chat", { usuario: req.session.user });
});

module.exports = router;