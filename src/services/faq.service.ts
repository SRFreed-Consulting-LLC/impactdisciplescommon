import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { CourseModel } from '../models/domain/course.model';
import { Observable } from 'rxjs';
import { FAQModel } from '../models/utils/faq.model';

@Injectable({
  providedIn: 'root'
})
export class FAQService {
  table: string = 'faq';

  constructor(public dao: FirebaseDAO<FAQModel>) {}

  getAll(): Promise<FAQModel[]>{
    return this.dao.getAll(this.table);
  }

  streamAll(): Observable<FAQModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<FAQModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<FAQModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: FAQModel): Promise<FAQModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: FAQModel): Promise<FAQModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
