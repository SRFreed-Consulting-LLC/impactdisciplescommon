import { Injectable } from '@angular/core';
import { FirebaseDAO, QueryParam } from 'impactdisciplescommon/src/dao/firebase.dao';
import { CouponModel } from 'impactdisciplescommon/src/models/utils/coupon.model';
import { ProductModel } from 'impactdisciplescommon/src/models/utils/product.model';
import { from, Observable, Timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  table: string = 'products';

  constructor(public dao: FirebaseDAO<ProductModel>) {}

  getAll(): Promise<ProductModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<ProductModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<ProductModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  streamAllByValue(field: string, value: any): Observable<ProductModel[]>{
    return this.dao.streamByValue(this.table, value, field);
  }

  streamAllByValues(queries: QueryParam[]): Observable<ProductModel[]>{
    return this.dao.queryAllStreamByMultiValue(this.table, queries);
  }

  getById(id: String): Promise<ProductModel>{
    return this.dao.getById(id, this.table);
  }

  streamById(id: String): Observable<ProductModel>{
    return from(this.dao.getById(id, this.table));
  }

  add(value: ProductModel): Promise<ProductModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: ProductModel): Promise<ProductModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
