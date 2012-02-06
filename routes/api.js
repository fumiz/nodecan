// load connection and Schema
var db = require('../models/db.js');
var Bin = db.models.bin;

// /add
exports.add = function(req, res){
  var body = req.param('body');
  var syntax = req.param('syntax');

  var bin = new Bin();
  bin.body = body;
  bin.syntax = syntax;
  bin.save(function(err){
    res.contentType('application/json');
    res.send('/bin/' + bin._id);
  });
};


