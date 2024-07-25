import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { OrganizationModel } from '../models/domain/organization.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  table: string = 'organizations';

  constructor(public dao: FirebaseDAO<OrganizationModel>) {}

  getAll(): Promise<OrganizationModel[]>{
    return this.dao.getAll(this.table);
  }

  streamAll(): Observable<OrganizationModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<OrganizationModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<OrganizationModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: OrganizationModel): Promise<OrganizationModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: OrganizationModel): Promise<OrganizationModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
