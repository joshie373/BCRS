const mongoose = require('mongoose');

let securityQuestions = mongoose.Schema({
    questionId: {type:String},
    answer: {type:String}
});

let userSchema = mongoose.Schema({
    username:       {type:String,unique: true, dropDups:true},
    password:       {type:String,required:true},
    firstname:      {type:String},
    lastname:       {type:String},
    phoneNumber:    {type:String},
    address:        {type:String},
    email:          {type:String},
    isDisabled:     {type:Boolean,default:false},
    role:           {type:String,default: 'Standard'},
    securityQuestions: [securityQuestions],
    date_created:   {type: Date,default: new Date()},
    date_modified:  {type: Date}
});

// module.exports=mongoose.model('User', userSchema);
module.exports=mongoose.model('User',userSchema,'users');
