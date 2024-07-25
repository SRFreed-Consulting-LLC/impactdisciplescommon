import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { TrainingSessionModel } from '../models/domain/training-session.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  table: string = 'training-sessions';

  constructor(public dao: FirebaseDAO<TrainingSessionModel>) {}

  getAll(): Promise<TrainingSessionModel[]>{
    return this.dao.getAll(this.table);
  }

  streamAll(): Observable<TrainingSessionModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<TrainingSessionModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<TrainingSessionModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: TrainingSessionModel): Promise<TrainingSessionModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: TrainingSessionModel): Promise<TrainingSessionModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
