import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { AffilliatePaymentModel } from 'impactdisciplescommon/src/models/utils/affilliate-payment.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AffilliatePaymentsService extends BaseService<AffilliatePaymentModel>{
  constructor(public override dao: FirebaseDAO<AffilliatePaymentModel>) {
    super(dao)
    this.table="affilliate_payments"
  }

  pay(affiliatePaypalAccount: string, amount: number): Promise<any>{
    return Promise.resolve('asdsaerwerwer');
  }
}
