/*
====================================================
; Title: service.js
; Author: Joshua Hughes
; Modified by: Joshua Hughes
; Date: 22 April 2020
; Description: Model for MongoDB service collection
====================================================
*/

const mongoose = require('mongoose');


let serviceSchema = mongoose.Schema({
    id: {type: String},
    title: {type: String},
    price: {type: Number}
});

module.exports = mongoose.model('Service', serviceSchema,'services');