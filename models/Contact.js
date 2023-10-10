const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  user: String,
  email: String,
  message: String
});

const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;