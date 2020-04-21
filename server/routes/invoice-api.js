/*
====================================================
; Title: invoice-api.js
; Author: Professor Krasso
; Modified by: Karie Funk
; Date: 20 April 2020
; Description: API for Invoice 
====================================================
*/

const express = require('express');
const Invoice = require('../db-models/invoice');

const router = express.Router();

/* Create Invoice */

router.post('/:username', function (req, res, next) {
    //get the username
    const username = req.params.username;

    //create an invoice object literal for saving to MongoDB
    let invoice = {
        lineItems: req.body.lineItems,
        partsAmount: req.body.laborAmount,
        laborAmount: req.body.laborAmount,
        lineItemTotal: req.body.lineItemTotal,
        total: req.body.total,
        username: username,
        orderDate: req.body.orderDate
    };

    console.log(invoice);

    //create a new invoice document
    Invoice.create(invoice, function (err, newInvoice) {
        //If error, return the message
        if (err) {
            console.log(err);
            return next (err);
        }  else {
           console.log(newInvoice);

           // return the results to the client
           res.json(newInvoice);
        }
    })
});

/* FindPurchasesByService*/

router.get('/purchases-graph', function (req, res, next) {
    //query to return a count of purchases by Service
    Invoice.aggregate([
        //unwind the array of line lineItems
        {"$unwind": "$lineItems"},

        //group on _id, title, and FindPurchaseByService
        {
            "$group": {
                "_id": {
                    "title": "$lineItems.title",
                    "price": "$lineItems.price"
                },
                //get a count of the group lineItems
                "count": {"$sum": 1},
            }
        },
        {"$sort": {"_id.title": 1}},
    ], function (err, purchasesGraph) {
        //if error, return the error message
        if (err) {
            console.log(err);
            return next(err);
        }  else {
            console.log('--PurchaseGraph data structure --');
            console.log(purchasesGraph);

            //return the purchases graph to the client
            res.json(purchasesGraph);
        }
    })
});

module.exports = router;