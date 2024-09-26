import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { CheckoutForm } from 'impactdisciplescommon/src/models/utils/cart.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalesService {
  table: string = 'sales';

  constructor(public dao: FirebaseDAO<CheckoutForm>) {}

  getAll(): Promise<CheckoutForm[]>{
    return this.dao.getAll(this.table).then(sales => {
      sales.forEach(sale => {
        sale.dateProcessed = dateFromTimestamp(sale.dateProcessed as Timestamp);
      });
      return sales;
    });
  }

  streamAll(): Observable<CheckoutForm[]>{
    return this.dao.streamAll(this.table).pipe(
      map(sales => {
        sales.forEach(sale => {
          sale.dateProcessed = dateFromTimestamp(sale.dateProcessed as Timestamp);
        });
        return sales;
      })
    );
  }

  getAllByValue(field: string, value: any): Promise<CheckoutForm[]>{
    return this.dao.getAllByValue(this.table, field, value).then(sales => {
      sales.forEach(sale => {
        sale.dateProcessed = dateFromTimestamp(sale.dateProcessed as Timestamp);
      });
      return sales;
    });;
  }

  getById(id: String): Promise<CheckoutForm>{
    return this.dao.getById(id, this.table).then(sale => {
      sale.dateProcessed = dateFromTimestamp(sale.dateProcessed as Timestamp);

      return sale;
    });
  }

  add(value: CheckoutForm): Promise<CheckoutForm>{
    return this.dao.add(value, this.table).then(sale => {
      sale.dateProcessed = dateFromTimestamp(sale.dateProcessed as Timestamp);

      return sale;
    });
  }

  update(id: string, value: CheckoutForm): Promise<CheckoutForm>{
    return this.dao.update(id, value, this.table).then(sale => {
      sale.dateProcessed = dateFromTimestamp(sale.dateProcessed as Timestamp);

      return sale;
    });
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}


