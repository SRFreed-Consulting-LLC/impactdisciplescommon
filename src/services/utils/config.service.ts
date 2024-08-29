import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { ConfigModel } from 'impactdisciplescommon/src/models/utils/config.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  table: string = 'config';

  constructor(public dao: FirebaseDAO<ConfigModel>) {}

  getAll(): Promise<ConfigModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<ConfigModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<ConfigModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<ConfigModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: ConfigModel): Promise<ConfigModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: ConfigModel): Promise<ConfigModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
