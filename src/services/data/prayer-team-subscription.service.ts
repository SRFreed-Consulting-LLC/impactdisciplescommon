import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { PrayerTeamSubscriptionModel } from 'impactdisciplescommon/src/models/domain/prayer-team-subscription.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PrayerTeamSubscriptionService extends BaseService<PrayerTeamSubscriptionModel> {
  constructor(public override dao: FirebaseDAO<PrayerTeamSubscriptionModel> ) {
    super(dao)
    this.table="prayer_team_subscriptions"
    this.fromFirestore = PrayerTeamSubscriptionService.fromFirestore
  }

  static readonly fromFirestore = (data): PrayerTeamSubscriptionModel => {
    data.date = dateFromTimestamp(data.date as Timestamp)

    return data;
  };
}
