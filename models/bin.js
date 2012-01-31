// bin.js: Bin model for Pastebin specific entry
exports.model = function(mongoose){
  var Schema = mongoose.Schema;
  var Bin = new Schema({
      body: String,
      syntax: String
    });
  Bin.path('syntax').get(function(v){
    return (v) ? v : 'text';
  });
  return Bin;
};

