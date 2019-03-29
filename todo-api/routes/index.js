var express = require('express');
var router = express.Router();
var conf=require('../config/config');

/* GET home page. */
router.get('/', function(req, res,cb) {
res.send("You're not getting anywhere, boyo");
});

module.exports = router;
