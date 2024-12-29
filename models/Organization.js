const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  password:{type:String,required:true}
});

module.exports = mongoose.model('Organization', organizationSchema);
