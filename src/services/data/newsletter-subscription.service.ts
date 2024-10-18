import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { NewsletterSubscriptionModel } from 'impactdisciplescommon/src/models/domain/newsletter-subscription.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterSubscriptionService extends BaseService<NewsletterSubscriptionModel> {
  constructor(public override dao: FirebaseDAO<NewsletterSubscriptionModel> ) {
    super(dao)
    this.table="newsletter_subscriptions"
    this.fromFirestore = NewsletterSubscriptionService.fromFirestore
  }

  static readonly fromFirestore = (data): NewsletterSubscriptionModel => {
    data.date = dateFromTimestamp(data.date as Timestamp)

    return data;
  };
}
