import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { Observable } from 'rxjs';
import { NewsletterModel } from '../models/domain/newsletter.model';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  table: string = 'newsletters';

  constructor(public dao: FirebaseDAO<NewsletterModel>) {}

  getAll(): Promise<NewsletterModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<NewsletterModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<NewsletterModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<NewsletterModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: NewsletterModel): Promise<NewsletterModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: NewsletterModel): Promise<NewsletterModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
