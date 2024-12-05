import { AgendaItem } from './../../models/domain/utils/agenda-item.model';
import { Injectable } from '@angular/core';
import { Timestamp } from '@google-cloud/firestore';
import { FirebaseDAO, WhereFilterOperandKeys } from 'impactdisciplescommon/src/dao/firebase.dao';
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

  async registerForTrainingSession(email: string, courseId: string): Promise<EventRegistrationModel> {
    let retval = await this.queryAllByValue('email', WhereFilterOperandKeys.equal, email);

    if(retval && retval.length == 1){
      if(!retval[0].trainingSessions){
        retval[0].trainingSessions = [];
      }

      retval[0].trainingSessions.push(courseId);

      this.update(retval[0].id, retval[0]);

      return retval[0];
    }

    return null;
  }

  async unregisterForTrainingSession(email: string, courseId: string): Promise<EventRegistrationModel> {
    let retval = await this.queryAllByValue('email', WhereFilterOperandKeys.equal, email);

    if(retval && retval.length == 1){
      retval[0].trainingSessions = retval[0].trainingSessions.filter(session => session != courseId);

      this.update(retval[0].id, retval[0]);

      return retval[0];
    }

    return null;
  }
}
