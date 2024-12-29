const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email:{type:String,required:true,unique:true},
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  
  imageUrl: { type: String },
  password: { type: String },
  
});

module.exports = mongoose.model('Member', MemberSchema);
