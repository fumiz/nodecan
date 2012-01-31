// db.js: mongoDB connection and Schema manager
var mongoose = require('mongoose'),
        conf = require('../conf.json');
// create connection
mongoose.connect(conf.db);

// load Bin Schema
var bin_module = require('./bin.js');
var bin_model = bin_module.model(mongoose);
mongoose.model('Bin', bin_model);

// export objects
exports.mongoose = mongoose;
exports.models = {};
exports.models.bin = mongoose.model('Bin');

