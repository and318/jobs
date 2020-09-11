var express = require('express');

var userController = require('../controllers/users');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  var result = await userController.user_get(req,res,next);
    res.render('index', { result });
  
});

module.exports = router;



