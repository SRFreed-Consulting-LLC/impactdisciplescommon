import { Injectable } from '@angular/core';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerModel>{
  constructor(public override dao: FirebaseDAO<CustomerModel>) {
    super(dao)
    this.table="customers"
  }
}
