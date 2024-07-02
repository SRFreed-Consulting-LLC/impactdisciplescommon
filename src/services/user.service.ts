import { Injectable } from '@angular/core';
import { AppUser } from '../models/admin/appuser.model';
import { FirebaseDAO } from '../dao/firebase.dao';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  table: string = 'users';

  constructor(public dao: FirebaseDAO<AppUser>) {}

  getAll(): Promise<AppUser[]>{
    return this.dao.getAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<AppUser[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<AppUser>{
    return this.dao.getById(id, this.table);
  }

  add(value: AppUser): Promise<AppUser>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: AppUser): Promise<AppUser>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
