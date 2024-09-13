import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { CoachModel } from '../models/domain/coach.model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  table: string = 'coaches';

  constructor(public dao: FirebaseDAO<CoachModel>) {}

  getAll(): Promise<CoachModel[]>{
    return this.dao.getAll(this.table).then(coaches => {
      coaches.forEach(coach => {
        coach.fullname = coach.firstName + " " + coach.lastName;
      })

      return coaches;
    });
  }

  streamAll(): Observable<CoachModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<CoachModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<CoachModel>{
    return this.dao.getById(id, this.table);
  }

  streamById(id: String): Observable<CoachModel>{
    return from(this.dao.getById(id, this.table));
  }

  add(value: CoachModel): Promise<CoachModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: CoachModel): Promise<CoachModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
