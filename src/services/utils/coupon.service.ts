import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { CouponModel } from 'impactdisciplescommon/src/models/utils/coupon.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  table: string = 'coupons';

  constructor(public dao: FirebaseDAO<CouponModel>) {}

  getAll(): Promise<CouponModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<CouponModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<CouponModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<CouponModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: CouponModel): Promise<CouponModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: CouponModel): Promise<CouponModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
