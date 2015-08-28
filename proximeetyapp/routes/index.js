var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'proximeety' });
});

module.exports = router;

console.log('/routes/index.js started.');
