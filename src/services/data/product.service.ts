import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { ProductModel } from 'impactdisciplescommon/src/models/utils/product.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<ProductModel>{
  constructor(public override dao: FirebaseDAO<ProductModel> ) {
    super(dao)
    this.table="products"
  }
}
