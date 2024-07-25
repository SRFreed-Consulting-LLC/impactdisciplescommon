import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { LocationModel } from '../models/domain/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  table: string = 'locations';

  constructor(public dao: FirebaseDAO<LocationModel>) {}

  getAll(): Promise<LocationModel[]>{
    return this.dao.getAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<LocationModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<LocationModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: LocationModel): Promise<LocationModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: LocationModel): Promise<LocationModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}