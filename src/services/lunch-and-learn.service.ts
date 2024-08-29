import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { map, Observable } from 'rxjs';
import { LunchAndLearnModel } from '../models/domain/lunch-and-learn.model';
import { dateFromTimestamp } from '../utils/date-from-timestamp';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  table: string = 'lunch_and_learns';

  constructor(public dao: FirebaseDAO<LunchAndLearnModel>) {}

  getAll(): Promise<LunchAndLearnModel[]>{
    return this.dao.getAll(this.table).then(items => {
      items.forEach(item => {
        item.requestedDate = dateFromTimestamp(item.requestedDate);
        item.requestedEndDateTime = dateFromTimestamp(item.requestedEndDateTime);
        item.requestedStartDateTime = dateFromTimestamp(item.requestedStartDateTime);
      })

      return items;
    })
  }

  streamAll(): Observable<LunchAndLearnModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(events => {
        events.forEach(event => {
          event.requestedDate = dateFromTimestamp(event.requestedDate as Timestamp);
          event.requestedStartDateTime = dateFromTimestamp(event.requestedStartDateTime as Timestamp);
          event.requestedEndDateTime = dateFromTimestamp(event.requestedEndDateTime as Timestamp);
        });
        return events;
      })
    );
  }

  getAllByValue(field: string, value: any): Promise<LunchAndLearnModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<LunchAndLearnModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: LunchAndLearnModel): Promise<LunchAndLearnModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: LunchAndLearnModel): Promise<LunchAndLearnModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
