import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { map, Observable } from 'rxjs';
import { PrayerTeamSubscriptionModel } from '../models/domain/prayer-team-subscription.model';
import { Timestamp } from 'firebase/firestore';
import { dateFromTimestamp } from '../utils/date-from-timestamp';

@Injectable({
  providedIn: 'root'
})
export class PrayerTeamSubscriptionService {
  table: string = 'prayer_team_subscriptions';

  constructor(public dao: FirebaseDAO<PrayerTeamSubscriptionModel>) {}

  getAll(): Promise<PrayerTeamSubscriptionModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<PrayerTeamSubscriptionModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(events => {
        events.forEach(event => {
          event.date = dateFromTimestamp(event.date as Timestamp);
        });
        return events;
      })
    );;
  }

  getAllByValue(field: string, value: any): Promise<PrayerTeamSubscriptionModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<PrayerTeamSubscriptionModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: PrayerTeamSubscriptionModel): Promise<PrayerTeamSubscriptionModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: PrayerTeamSubscriptionModel): Promise<PrayerTeamSubscriptionModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
