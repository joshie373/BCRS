// ============================================
// ; Title:          role.js
// ; Author:         Tyler Librandi
// ; Date:           22 April 2020
// ; Description:    Role schema
// ;===========================================

const mongoose = require('mongoose');

let roleSchema = mongoose.Schema ({
  text: {type: String, unique: true, dropDups: true}
});

module.exports = mongoose.model('Role', roleSchema,'roles');
