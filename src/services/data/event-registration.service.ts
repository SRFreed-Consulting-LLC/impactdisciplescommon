import { Injectable } from '@angular/core';
import { Timestamp } from '@google-cloud/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EventRegistrationService extends BaseService<EventRegistrationModel>{
  constructor(public override dao: FirebaseDAO<EventRegistrationModel> ) {
    super(dao)
    this.table="event-registrations"
    this.fromFirestore = EventRegistrationService.fromFirestore
  }

  static readonly fromFirestore = (data): EventRegistrationModel => {
    data.registrationDate = dateFromTimestamp(data.registrationDate as Timestamp)

    return data;
  };
}
