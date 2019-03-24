var express = require('express');
var router = express.Router();
var conf=require('../config/config');

/* GET home page. */
router.get('/', function(req, res,cb) {
console.log(conf);
    cb();

});

module.exports = router;
