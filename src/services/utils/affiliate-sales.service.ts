import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { AffilliateSalesModel } from 'impactdisciplescommon/src/models/utils/affilliate-sales.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffilliateSalesService {
  table: string = 'affilliate_sales';

  constructor(public dao: FirebaseDAO<AffilliateSalesModel>) {}

  getAll(): Promise<AffilliateSalesModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<AffilliateSalesModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<AffilliateSalesModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<AffilliateSalesModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: AffilliateSalesModel): Promise<AffilliateSalesModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: AffilliateSalesModel): Promise<AffilliateSalesModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
