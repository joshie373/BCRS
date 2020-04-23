/*
====================================================
; Title: invoice.js
; Author: Professor Krasso
; Modified by: Karie Funk
; Date: 20 April 2020
; Description: Model for MongoDB Invoice collection
====================================================
*/

const mongoose = require('mongoose');

let lineItemSchema = mongoose.Schema({
    title: {type: String},
    price: {type: Number}
});

let invoiceSchema = mongoose.Schema({
    lineItems: [lineItemSchema],
    partsAmount: {type: Number},
    laborAmount: {type: Number},
    lineItemTotal: {type: Number},
    total: {type: Number},
    username: {type: String},
    orderDate: {type: Date}
});

module.exports = mongoose.model('Invoice', invoiceSchema,'invoices');