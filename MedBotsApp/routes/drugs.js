var express = require('express');
var router = express.Router();
var util     = require("util");
var mongoose = require('mongoose');
var drugSearch = require('../drugSearch');

/* GET drugs listing. */
router.get('/', function(req, res, next) {
 	drugSearch.find(function(err, drugs) {
 		if(err)
 			return next(err);
 		res.json(drugs);
  });
});

/* GET drugs by id */
router.get('/:id', function(req, res, next) {
	util.debug('Request : ' , req)
 	drugSearch.find({id: req.params.id}, function(err, drug) {
 		if(err)
 			return next(err);
 		res.json(drug);
  });
});

/* GET drugs by indication search string */
router.get('/indications/:ind', function(req, res, next) {
	util.debug('req param  >>>>  ' + req.params.ind)
 	drugSearch.findIndications({indications: req.params.ind}, function(err, drug) {
 		if(err) {
			util.debug('ERROR !!! ')
			return next(err);
		}
		util.debug(" RESULT !!" + drug)
 		res.json(drug);
  });
});

/* GET drugs by indication search string */
router.get('/sideeffects/:effect', function(req, res, next) {
	util.debug('req param  >>>>   ' + req.params.effect)
 	drugSearch.findSideEffects({sideEffects: req.params.effect}, function(err, drug) {
 		if(err) {
			util.debug('ERROR !!! ')
			return next(err);
		}
		util.debug(" RESULT !!" + drug)
 		res.json(drug);
  });
});

module.exports = router;
