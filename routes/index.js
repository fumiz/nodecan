// load connection and Schema
var db = require('../models/db.js');
var Bin = db.models.bin;

// load syntax highlighting defs
var syntax_defs = require('../syntax_conf.js');

// /index
exports.index = function(req, res){
  res.render('index', {
      title: 'Nodecan',
      syntax: syntax_defs.defs
    });
};

// /add
exports.add = function(req, res){
  var body = req.param('body');
  var syntax = req.param('syntax');

  var bin = new Bin();
  bin.body = body;
  bin.syntax = syntax;
  bin.save(function(err){
    res.redirect('/bin/' + bin._id);
  });
};

// /bin/:id
exports.bin = function(req, res){
  var id = req.param('id');
  Bin.findById(id, function(err, bin){
    if (err === null) {
      var scripts = ['/syntax/scripts/shCore.js',
                    '/syntax/scripts/shAutoloader.js',
                    '/syntax/scripts/shBrushXml.js'];
      scripts.push(syntax_defs.get_script(bin.syntax));

      res.render('bin', {
          title: 'bin',
          body: bin.body,
          syntax: bin.syntax,
          scripts: scripts,
          styles: ['/syntax/styles/shCore.css',
                   '/syntax/styles/shThemeDefault.css']
        }
      );
    } else {
      res.render('bin', {
          title: 'Document Not Found',
          body: 'please check url',
          syntax: 'text'
      });
    }
  });
};

