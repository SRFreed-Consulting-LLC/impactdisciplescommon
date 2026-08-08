import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { BaseService } from './base.service';
import { AnnouncementModel } from 'impactdisciplescommon/src/models/domain/announcement.model.ts';

@Injectable({
  providedIn: 'root'
})
export class EventAnnouncementService extends BaseService<AnnouncementModel>{
  constructor(public override dao: FirebaseDAO<AnnouncementModel> ) {
    super(dao)
    this.table="event-announcements"
    this.fromFirestore = EventAnnouncementService.fromFirestore
  }

  static readonly fromFirestore = (data): AnnouncementModel => {
    data.date = dateFromTimestamp(data.date as Timestamp)

    return data;
  };
}
