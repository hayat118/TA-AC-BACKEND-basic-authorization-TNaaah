var express = require('express');
var router = express.Router();

var User=require('../models/user');

var auth=require('../middleware/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.render('index', { title: 'Express', user: req.user });
});

module.exports = router;
