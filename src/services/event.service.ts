import { Injectable } from '@angular/core';
import { FirebaseDAO, WhereFilterOperandKeys } from '../dao/firebase.dao';
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

  getAll(): Promise<EventModel[]> {
    return this.dao.getAll(this.table).then(events => {

        events.forEach(event => {
          event.startDate = dateFromTimestamp(event.startDate as Timestamp);
          event.endDate = dateFromTimestamp(event.endDate as Timestamp);

          if(event.agendaItems){
            event.agendaItems.forEach(item => {
              item.startDate = dateFromTimestamp(item.startDate);
              item.endDate = dateFromTimestamp(item.endDate);
            });
          }
        });
        return events;
      });
  }

  streamAll(): Observable<EventModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(events => {
        events.forEach(event => {
          event.startDate = dateFromTimestamp(event.startDate as Timestamp);
          event.endDate = dateFromTimestamp(event.endDate as Timestamp);

          if(event.agendaItems){
            event.agendaItems.forEach(item => {
              item.startDate = dateFromTimestamp(item.startDate);
              item.endDate = dateFromTimestamp(item.endDate);
            });
          }
        });
        return events;
      })
    );
  }

  getAllByValue(field: string, value: any): Promise<EventModel[]> {
    return this.dao.getAllByValue(this.table, field, value).then(events => {
      events.forEach(event => {
        event.startDate = dateFromTimestamp(event.startDate as Timestamp);
        event.endDate = dateFromTimestamp(event.endDate as Timestamp);

        if(event.agendaItems){
          event.agendaItems.forEach(item => {
            item.startDate = dateFromTimestamp(item.startDate);
            item.endDate = dateFromTimestamp(item.endDate);
          });
        }
      });
      return events;
    });
  }

  queryAllByValue(field: string, opStr: WhereFilterOperandKeys, value: any): Promise<EventModel[]> {
    return this.dao.queryByValue(this.table, field, opStr, value).then(events => {
      events.forEach(event => {
        event.startDate = dateFromTimestamp(event.startDate as Timestamp);
        event.endDate = dateFromTimestamp(event.endDate as Timestamp);

        if(event.agendaItems){
          event.agendaItems.forEach(item => {
            item.startDate = dateFromTimestamp(item.startDate);
            item.endDate = dateFromTimestamp(item.endDate);
          });
        }
      });
      return events;
    });
  }

  streamAllByValue(field: string, value: any): Observable<EventModel[]> {
    return from(this.dao.getAllByValue(this.table, field, value)).pipe(
      map(events => {
        events.forEach(event => {
          event.startDate = dateFromTimestamp(event.startDate as Timestamp);
          event.endDate = dateFromTimestamp(event.endDate as Timestamp);

          if(event.agendaItems){
            event.agendaItems.forEach(item => {
              item.startDate = dateFromTimestamp(item.startDate);
              item.endDate = dateFromTimestamp(item.endDate);
            });
          }
        });
        return events;
      })
    );
  }

  getById(id: String): Promise<EventModel> {
    return this.dao.getById(id, this.table).then(event => {
        event.startDate = dateFromTimestamp(event.startDate as Timestamp);
        event.endDate = dateFromTimestamp(event.endDate as Timestamp);

        if(event.agendaItems){
          event.agendaItems.forEach(item => {
            item.startDate = dateFromTimestamp(item.startDate);
            item.endDate = dateFromTimestamp(item.endDate);
          });
        }

        return event;
      })
  }

  streamById(id: String): Observable<EventModel> {
    return from(this.dao.getById(id, this.table)).pipe(
      map(event => {
        event.startDate = dateFromTimestamp(event.startDate as Timestamp);
        event.endDate = dateFromTimestamp(event.endDate as Timestamp);

        if(event.agendaItems){
          event.agendaItems.forEach(item => {
            item.startDate = dateFromTimestamp(item.startDate);
            item.endDate = dateFromTimestamp(item.endDate);
          });
        }
        return event;
      })
    );
  }

  add(value: EventModel): Promise<EventModel> {
    return this.dao.add(value, this.table);
  }

  update(id: string, value: EventModel): Promise<EventModel> {
    return this.dao.update(id, value, this.table);
  }

  delete(id: string): Promise<void> {
    return this.dao.delete(id, this.table);
  }
}
