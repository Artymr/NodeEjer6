var express = require('express');
var router = express.Router();

function auth(req, res, next) {
  if (req.session.user) next();
    else res.redirect('/login');
}

router.get('/', auth, function(req, res) {
    res.render("chat", { user: req.session.user });
});

module.exports = router;