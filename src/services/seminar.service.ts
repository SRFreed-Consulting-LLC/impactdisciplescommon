import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { map, Observable } from 'rxjs';
import { SeminarModel } from '../models/domain/seminar.model';
import { dateFromTimestamp } from '../utils/date-from-timestamp';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  table: string = 'seminars';

  constructor(public dao: FirebaseDAO<SeminarModel>) {}

  getAll(): Promise<SeminarModel[]>{
    return this.dao.getAll(this.table).then(items => {
      items.forEach(item => {
        item.requestedSeminarDate = dateFromTimestamp(item.requestedSeminarDate);
        item.requestedEndDateTime = dateFromTimestamp(item.requestedEndDateTime);
        item.requestedStartDateTime = dateFromTimestamp(item.requestedStartDateTime);
      })

      return items;
    })
  }

  streamAll(): Observable<SeminarModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(events => {
        events.forEach(event => {
          event.requestedSeminarDate = dateFromTimestamp(event.requestedSeminarDate as Timestamp);
          event.requestedStartDateTime = dateFromTimestamp(event.requestedStartDateTime as Timestamp);
          event.requestedEndDateTime = dateFromTimestamp(event.requestedEndDateTime as Timestamp);
        });
        return events;
      })
    );  }

  getAllByValue(field: string, value: any): Promise<SeminarModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<SeminarModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: SeminarModel): Promise<SeminarModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: SeminarModel): Promise<SeminarModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
