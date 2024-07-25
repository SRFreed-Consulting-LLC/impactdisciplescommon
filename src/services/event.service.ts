import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { EventModel } from '../models/domain/event.model';
import { Timestamp } from '@google-cloud/firestore';
import { dateFromTimestamp } from '../utils/date-from-timestamp';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  table: string = 'events';

  constructor(public dao: FirebaseDAO<EventModel>) {}

  getAll(): Observable<EventModel[]> {
    return from(this.dao.getAll(this.table)).pipe(
      map(events => {
        events.forEach(event => {
          event.startDate = dateFromTimestamp(event.startDate as Timestamp);
          event.endDate = dateFromTimestamp(event.endDate as Timestamp);

          event.agendaItems.forEach(item => {
            item.startDate = dateFromTimestamp(item.startDate);
            item.endDate = dateFromTimestamp(item.endDate);
          });
        });
        return events;
      })
    );
  }

  getAllByValue(field: string, value: any): Observable<EventModel[]> {
    return from(this.dao.getAllByValue(this.table, field, value)).pipe(
      map(events => {
        events.forEach(event => {
          event.startDate = dateFromTimestamp(event.startDate as Timestamp);
          event.endDate = dateFromTimestamp(event.endDate as Timestamp);
        });
        return events;
      })
    );
  }

  getById(id: String): Observable<EventModel> {
    return from(this.dao.getById(id, this.table)).pipe(
      map(event => {
        event.startDate = dateFromTimestamp(event.startDate as Timestamp);
        event.endDate = dateFromTimestamp(event.endDate as Timestamp);
        return event;
      })
    );
  }

  add(value: EventModel): Observable<EventModel> {
    return from(this.dao.add(value, this.table));
  }

  update(id: string, value: EventModel): Observable<EventModel> {
    return from(this.dao.update(id, value, this.table));
  }

  delete(id: string): Observable<void> {
    return from(this.dao.delete(id, this.table));
  }
}
