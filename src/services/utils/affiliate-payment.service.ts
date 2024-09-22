import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { AffilliatePaymentModel } from 'impactdisciplescommon/src/models/utils/affilliate-payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffilliatePaymentsService {
  table: string = 'affilliate_payments';

  constructor(public dao: FirebaseDAO<AffilliatePaymentModel>) {}

  getAll(): Promise<AffilliatePaymentModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<AffilliatePaymentModel[]>{
    return this.dao.streamAll(this.table);
  }

  streamAllByValue(field: string, value: any): Observable<AffilliatePaymentModel[]>{
    return this.dao.streamByValue(this.table, value, field);
  }

  getAllByValue(field: string, value: any): Promise<AffilliatePaymentModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<AffilliatePaymentModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: AffilliatePaymentModel): Promise<AffilliatePaymentModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: AffilliatePaymentModel): Promise<AffilliatePaymentModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }

  pay(affiliatePaypalAccount: string, amount: number): Promise<any>{
    return Promise.resolve('asdsaerwerwer');
  }
}
