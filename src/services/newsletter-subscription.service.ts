import { NewsletterSubscriptionModel } from './../models/domain/newsletter-subscription.model';
import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterSubscriptionService {
  table: string = 'newsletter_subscriptions';

  constructor(public dao: FirebaseDAO<NewsletterSubscriptionModel>) {}

  getAll(): Promise<NewsletterSubscriptionModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<NewsletterSubscriptionModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<NewsletterSubscriptionModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<NewsletterSubscriptionModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: NewsletterSubscriptionModel): Promise<NewsletterSubscriptionModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: NewsletterSubscriptionModel): Promise<NewsletterSubscriptionModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
