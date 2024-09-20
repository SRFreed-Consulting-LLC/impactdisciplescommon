import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { SeriesModel } from 'impactdisciplescommon/src/models/utils/series.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  table: string = 'series';

  constructor(public dao: FirebaseDAO<SeriesModel>) {}

  getAll(): Promise<SeriesModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<SeriesModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<SeriesModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<SeriesModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: SeriesModel): Promise<SeriesModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: SeriesModel): Promise<SeriesModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
