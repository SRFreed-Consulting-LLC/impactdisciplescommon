import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { AffilliateSaleModel } from 'impactdisciplescommon/src/models/utils/affilliate-sale.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffilliateSalesService {
  table: string = 'affilliate_sales';

  constructor(public dao: FirebaseDAO<AffilliateSaleModel>) {}

  getAll(): Promise<AffilliateSaleModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<AffilliateSaleModel[]>{
    return this.dao.streamAll(this.table);
  }

  streamAllByValue(field: string, value: any): Observable<AffilliateSaleModel[]>{
    return this.dao.streamByValue(this.table, value, field);
  }

  getAllByValue(field: string, value: any): Promise<AffilliateSaleModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<AffilliateSaleModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: AffilliateSaleModel): Promise<AffilliateSaleModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: AffilliateSaleModel): Promise<AffilliateSaleModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
