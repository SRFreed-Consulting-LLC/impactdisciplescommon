import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { EventModel } from '../models/domain/event.model';
import { Timestamp } from '@google-cloud/firestore';
import { dateFromTimestamp } from '../utils/date-from-timestamp';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  table: string = 'events';

  constructor(public dao: FirebaseDAO<EventModel>) {}

  getAll(): Promise<EventModel[]>{
    return this.dao.getAll(this.table).then(events => {
      events.forEach(event => {
        event.startDate = dateFromTimestamp(event.startDate as Timestamp);
        event.endDate = dateFromTimestamp(event.endDate as Timestamp);
      })
      return events;
    });
  }

  getAllByValue(field: string, value: any): Promise<EventModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<EventModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: EventModel): Promise<EventModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: EventModel): Promise<EventModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
