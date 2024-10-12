import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import {  Observable } from 'rxjs';
import { EmailList } from '../models/utils/email-list.model';

@Injectable({
  providedIn: 'root'
})
export class EmailListService {
  table: string = 'email_lists';

  constructor(public dao: FirebaseDAO<EmailList>) {}

  getAll(): Promise<EmailList[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<EmailList[]>{
    return this.dao.streamAll(this.table)
  }

  getAllByValue(field: string, value: any): Promise<EmailList[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<EmailList>{
    return this.dao.getById(id, this.table);
  }

  add(value: EmailList): Promise<EmailList>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: EmailList): Promise<EmailList>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
