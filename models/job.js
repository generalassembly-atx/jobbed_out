var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  employer: { type: String, required: true },
  hyperlink: { type: String, required: true },
  description: String
});

jobSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('jobs', jobSchema);
