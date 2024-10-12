import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { Observable } from 'rxjs';
import { PrayerModel } from '../models/domain/prayer.model';

@Injectable({
  providedIn: 'root'
})
export class PrayerService {
  table: string = 'prayers';

  constructor(public dao: FirebaseDAO<PrayerModel>) {}

  getAll(): Promise<PrayerModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<PrayerModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<PrayerModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<PrayerModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: PrayerModel): Promise<PrayerModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: PrayerModel): Promise<PrayerModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
