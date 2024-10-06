import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { TaxRate } from 'impactdisciplescommon/src/models/utils/tax-rate.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaxRateService {
  table: string = 'tax_rates';

  constructor(public dao: FirebaseDAO<TaxRate>) {}

  getAll(): Promise<TaxRate[]>{
    return this.dao.getAll(this.table);
  }

  streamAll(): Observable<TaxRate[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<TaxRate[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<TaxRate>{
    return this.dao.getById(id, this.table);
  }

  add(value: TaxRate): Promise<TaxRate>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: TaxRate): Promise<TaxRate>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}


