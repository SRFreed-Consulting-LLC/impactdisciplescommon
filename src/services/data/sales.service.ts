import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { CheckoutForm } from 'impactdisciplescommon/src/models/utils/cart.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService extends BaseService<CheckoutForm>{
  constructor(public override dao: FirebaseDAO<CheckoutForm>) {
    super(dao)
    this.table="sales"
    this.fromFirestore = SalesService.fromFirestore
  }

  static readonly fromFirestore = (data): CheckoutForm => {
    data.dateProcessed = dateFromTimestamp(data.dateProcessed as Timestamp)

    return data;
  };
}
