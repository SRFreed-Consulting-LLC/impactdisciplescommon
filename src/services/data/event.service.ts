import { Injectable } from '@angular/core';
import { Timestamp } from '@google-cloud/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService<EventModel>{
  constructor(public override dao: FirebaseDAO<EventModel> ) {
    super(dao)
    this.table="events"
    this.fromFirestore = EventService.fromFirestore
  }

  static readonly fromFirestore = (data): EventModel => {
    data.startDate = dateFromTimestamp(data.startDate as Timestamp);
    data.endDate = dateFromTimestamp(data.endDate as Timestamp);

    if(data.agendaItems){
      data.agendaItems.forEach(item => {
        item.startDate = dateFromTimestamp(item.startDate);
        item.endDate = dateFromTimestamp(item.endDate);
      });
    }

    return data;
  }
}
