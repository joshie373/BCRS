const mongoose = require('mongoose'); // requires mongoose

let securityQuestionSchema = mongoose.Schema({ // creates a new mongoose schema
    text:       {type:String}, // creates a string field called text
    isDisabled: {type:Boolean, default:false} // creates a boolean field called isDisabled and sets it to false as a default
});

module.exports=mongoose.model('SecurityQuestion', securityQuestionSchema,'security-questions'); // exports the module
