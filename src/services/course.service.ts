import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { CourseModel } from '../models/domain/course.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  table: string = 'courses';

  constructor(public dao: FirebaseDAO<CourseModel>) {}

  getAll(): Promise<CourseModel[]>{
    return this.dao.getAll(this.table);
  }

  streamAll(): Observable<CourseModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<CourseModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<CourseModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: CourseModel): Promise<CourseModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: CourseModel): Promise<CourseModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
