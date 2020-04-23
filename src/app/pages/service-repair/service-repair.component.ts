 /*
====================================================
; Title: service-repair.component.ts
; Author: Professor Krasso
; Modified by: Karie Funk
; Date: 21 April 2020
; Description: Service Repair Component TS Page
====================================================
*/

import { Component, OnInit } from '@angular/core';
import { InvoiceSummaryDialogComponent } from '../../dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-service-repair',
    templateUrl: './service-repair.component.html',
    styleUrls: ['./service-repair.component.css']
}) 
export class ServiceRepairComponent implements OnInit {
    form: FormGroup;
    username: string;

    services = [
        {title: 'Password Reset', price: 39.99, id: '101'},
        {title: 'Spyware Removal', price: 99.99, id: '102'},
        {title: 'RAM Upgrade', price: 129.99, id: '103'},
        {title: 'Software Installation', price: 49.99, id: '104'},
        {title: 'PC Tune-up', price: 99.99, id: '105'},
        {title: 'Keyboard Cleaning', price: 45.00, id: '106'},
        {title: 'Disk Clean-up', price: 149.99, id: '107'}
    ];

    constructor(private http: HttpClient, private cookieService: CookieService, private fb: FormBuilder,
    private dialog: MatDialog, private router: Router) {
        //get the username
        this.username = this.cookieService.get('sessionuser');
    }  

    ngOnInit() {
        this.form = this.fb.group({
            parts: [null, Validators.compose([Validators.required])],
            labor: [null, Validators.compose([Validators.required])],
            alternator: [null, null]
        });
    }

    //function to check input and evaluate if character is a number or a decimal place. 
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 45 || charCode > 57)) {
          return false;
        }
        return true;
    }

    
    submit(form) {
        console.log(form);
        const selectedServiceIds = [];
        for (const [key, value] of Object.entries(form.checkGroup)) {
            if (value) {
                selectedServiceIds.push({
                    id: key
                });
            }
        }

        const lineItems = [];

        //Build the invoice object
        for (const savedService of this.services) {
            for (const selectedService of selectedServiceIds) {
                if (savedService.id === selectedService.id) {
                    lineItems.push({
                        title: savedService.title,
                        price: savedService.price
                    });
                }
            }
        }

        console.log(lineItems);
        const partsAmount = parseFloat(form.parts);
        const laborAmount = form.labor * 50;
        const lineItemTotal = lineItems.reduce((prev, cur) => prev + cur.price, 0);
        const total = partsAmount + laborAmount + lineItemTotal;

        const invoice = {
            lineItems: lineItems,
            partsAmount: partsAmount.toFixed(2),
            laborAmount: laborAmount.toFixed(2),
            lineItemTotal: lineItemTotal.toFixed(2),
            total: total.toFixed(2),
            username: this.username,
            orderDate: new Date()
        };
        console.log(invoice);

        const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
            data: {
                invoice: invoice
            },
            disableClose: true,
            width: '800px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'confirm') {
                console.log('Invoice saved');

                this.http.post('/api/invoices/' + invoice.username, {
                    lineItems: invoice.lineItems,
                    partsAmount: invoice.partsAmount,
                    laborAmount: invoice.laborAmount,
                    lineItemTotal: invoice.lineItemTotal,
                    total: invoice.total,
                    orderDate: invoice.orderDate
                }) .subscribe(res => {
                    this.router.navigate(['/'])
                }, err => {
                    console.log(err);
                });
            }

        });
    }
}
