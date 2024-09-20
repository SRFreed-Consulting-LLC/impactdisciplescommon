import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { Observable } from 'rxjs';
import { CheckoutForm } from 'src/app/shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  table: string = 'sales';

  constructor(public dao: FirebaseDAO<CheckoutForm>) {}

  getAll(): Promise<CheckoutForm[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<CheckoutForm[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<CheckoutForm[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<CheckoutForm>{
    return this.dao.getById(id, this.table);
  }

  add(value: CheckoutForm): Promise<CheckoutForm>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: CheckoutForm): Promise<CheckoutForm>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
