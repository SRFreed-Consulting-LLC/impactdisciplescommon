import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { AffilliateSaleModel } from 'impactdisciplescommon/src/models/utils/affilliate-sale.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AffilliateSalesService extends BaseService<AffilliateSaleModel>{
  constructor(public override dao: FirebaseDAO<AffilliateSaleModel>) {
    super(dao)
    this.table="affilliate_sales"
  }
}
