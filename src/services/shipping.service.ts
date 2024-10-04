import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { Observable } from 'rxjs';
import { ShippingModel } from '../models/domain/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  table: string = 'shipments';

  constructor(public dao: FirebaseDAO<ShippingModel>) {}

  getAll(): Promise<ShippingModel[]>{
    return this.dao.getAll(this.table);
  }

  streamAll(): Observable<ShippingModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<ShippingModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<ShippingModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: ShippingModel): Promise<ShippingModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: ShippingModel): Promise<ShippingModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
