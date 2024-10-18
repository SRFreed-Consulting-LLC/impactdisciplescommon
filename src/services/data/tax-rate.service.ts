import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { TaxRate } from 'impactdisciplescommon/src/models/utils/tax-rate.model';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class TaxRateService extends BaseService<TaxRate>{
  constructor(public override dao: FirebaseDAO<TaxRate>) {
    super(dao)
    this.table="tax_rates"
  }
}


