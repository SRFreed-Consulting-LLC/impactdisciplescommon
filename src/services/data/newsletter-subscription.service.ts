import { WhereFilterOperandKeys } from './../../dao/firebase.dao';
import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO, QueryParam } from 'impactdisciplescommon/src/dao/firebase.dao';
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

  createNewsLetterSubscription(firstName: string, lastName: string, email: string){
    let qp: QueryParam[] = [
      new QueryParam('email', WhereFilterOperandKeys.equal, email),
      new QueryParam('lastName', WhereFilterOperandKeys.equal, lastName),
      new QueryParam('firstName', WhereFilterOperandKeys.equal, firstName)
    ];

    return this.queryAllByMultiValue(qp).then(item => {
      if(!item || item.length == 0){
        let subscriber: NewsletterSubscriptionModel = {...new NewsletterSubscriptionModel()};
        subscriber.firstName = firstName;
        subscriber.lastName = lastName;
        subscriber.email = email;
        subscriber.date = Timestamp.now();
        return this.add(subscriber);
      }

      return Promise.resolve(null);
    })

  }
}
