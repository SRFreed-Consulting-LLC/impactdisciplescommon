import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  table: string = 'customers';

  constructor(public dao: FirebaseDAO<CustomerModel>) {}

  getAll(): Promise<CustomerModel[]>{
    return this.dao.getAll(this.table);
  }

  streamAll(): Observable<CustomerModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<CustomerModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<CustomerModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: CustomerModel): Promise<CustomerModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: CustomerModel): Promise<CustomerModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
