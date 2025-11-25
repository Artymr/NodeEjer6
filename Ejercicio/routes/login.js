var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login'});
});

/* POST login */
router.post('/', function(req, res, next) {
  const { username, password } = req.body;
  if (!username) return res.render('login', { title: 'Login', error: 'Username is required' });

  req.session.user = { username };
  res.redirect('/restringida');
});
  

module.exports = router;
