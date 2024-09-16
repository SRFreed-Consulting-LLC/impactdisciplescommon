import { Injectable } from '@angular/core';
import { FirebaseDAO, WhereFilterOperandKeys } from '../dao/firebase.dao';
import { Timestamp } from '@google-cloud/firestore';
import { dateFromTimestamp } from '../utils/date-from-timestamp';
import { from, map, Observable } from 'rxjs';
import { EventRegistrationModel } from '../models/domain/event-registration.model';

@Injectable({
  providedIn: 'root'
})
export class EventRegistrationService {
  table: string = 'event-registrations';

  constructor(public dao: FirebaseDAO<EventRegistrationModel>) {}

  getAll(): Promise<EventRegistrationModel[]> {
    return this.dao.getAll(this.table).then(events => {

        events.forEach(event => {
          event.registrationDate = dateFromTimestamp(event.registrationDate as Timestamp);
        });
        return events;
      });
  }

  streamAll(): Observable<EventRegistrationModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(events => {
        events.forEach(event => {
          event.registrationDate = dateFromTimestamp(event.registrationDate as Timestamp);
        });
        return events;
      })
    );
  }

  getAllByValue(field: string, value: any): Promise<EventRegistrationModel[]> {
    return this.dao.getAllByValue(this.table, field, value).then(events => {
      events.forEach(event => {
        event.registrationDate = dateFromTimestamp(event.registrationDate as Timestamp);
      });
      return events;
    });
  }

  streamAllByValue(field: string, value: any): Observable<EventRegistrationModel[]> {
    return this.dao.streamByValue(this.table, value, field).pipe(
      map(events => {
        events.forEach(event => {
          event.registrationDate = dateFromTimestamp(event.registrationDate as Timestamp);
        });
        return events;
      })
    );
  }

  queryAllByValue(field: string, opStr: WhereFilterOperandKeys, value: any): Promise<EventRegistrationModel[]> {
    return this.dao.queryByValue(this.table, field, opStr, value).then(events => {
      events.forEach(event => {
        events.forEach(event => {
          event.registrationDate = dateFromTimestamp(event.registrationDate as Timestamp);
        });
      });
      return events;
    });
  }

  queryStreamAllByValue(field: string, opStr: WhereFilterOperandKeys, value: any): Observable<EventRegistrationModel[]> {
    return this.dao.quertStreamByValue(this.table, value, opStr, field).pipe(
      map(events => {
        events.forEach(event => {
          event.registrationDate = dateFromTimestamp(event.registrationDate as Timestamp);
        });
        return events;
      })
    );
  }

  getById(id: String): Promise<EventRegistrationModel> {
    return this.dao.getById(id, this.table).then(event => {
        event.registrationDate = dateFromTimestamp(event.registrationDate as Timestamp);
        return event;
      })
  }

  streamById(id: String): Observable<EventRegistrationModel> {
    return from(this.dao.getById(id, this.table)).pipe(
      map(event => {
        event.registrationDate = dateFromTimestamp(event.registrationDate as Timestamp);
        return event;
      })
    );
  }

  add(value: EventRegistrationModel): Promise<EventRegistrationModel> {
    return this.dao.add(value, this.table);
  }

  update(id: string, value: EventRegistrationModel): Promise<EventRegistrationModel> {
    return this.dao.update(id, value, this.table);
  }

  delete(id: string): Promise<void> {
    return this.dao.delete(id, this.table);
  }
}
