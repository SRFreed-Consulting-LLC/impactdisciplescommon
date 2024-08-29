import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { WebConfigModel } from 'impactdisciplescommon/src/models/utils/web-config.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebConfigService {
  table: string = 'config';

  constructor(public dao: FirebaseDAO<WebConfigModel>) {}

  getAll(): Promise<WebConfigModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<WebConfigModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<WebConfigModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<WebConfigModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: WebConfigModel): Promise<WebConfigModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: WebConfigModel): Promise<WebConfigModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
