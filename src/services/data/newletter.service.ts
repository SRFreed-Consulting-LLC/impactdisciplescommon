import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { NewsletterModel } from 'impactdisciplescommon/src/models/domain/newsletter.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService extends BaseService<NewsletterModel>{
  constructor(public override dao: FirebaseDAO<NewsletterModel> ) {
    super(dao)
    this.table="newsletters"
  }
}
