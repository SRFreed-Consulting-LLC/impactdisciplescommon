import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { CustomerEmailModel } from 'impactdisciplescommon/src/models/domain/customer-email.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerEmailService extends BaseService<CustomerEmailModel> {
  constructor(public override dao: FirebaseDAO<CustomerEmailModel>) {
    super(dao)
    this.table="customer_emails"
    this.fromFirestore = CustomerEmailService.fromFirestore
  }

  static readonly fromFirestore = (data): CustomerEmailModel => {
    data.date = dateFromTimestamp(data.date as Timestamp)

    return data;
  };
}
