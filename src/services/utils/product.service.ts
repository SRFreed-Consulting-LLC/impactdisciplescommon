import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { CouponModel } from 'impactdisciplescommon/src/models/utils/coupon.model';
import { ProductModel } from 'impactdisciplescommon/src/models/utils/product.model';
import { Observable } from 'rxjs';

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

  getById(id: String): Promise<ProductModel>{
    return this.dao.getById(id, this.table);
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
