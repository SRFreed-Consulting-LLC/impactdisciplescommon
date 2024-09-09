import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { map, Observable } from 'rxjs';
import { dateFromTimestamp } from '../utils/date-from-timestamp';
import { Timestamp } from 'firebase/firestore';
import { ConsultationRequestModel } from '../models/domain/consultation-request.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationRequestService {
  table: string = 'consultation_requests';

  constructor(public dao: FirebaseDAO<ConsultationRequestModel>) {}

  getAll(): Promise<ConsultationRequestModel[]>{
    return this.dao.getAll(this.table).then(items => {
      items.forEach(item => {
        item.date = dateFromTimestamp(item.date);
      })

      return items;
    })
  }

  streamAll(): Observable<ConsultationRequestModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(events => {
        events.forEach(event => {
          event.date = dateFromTimestamp(event.date as Timestamp);
        });
        return events;
      })
    );
  }

  getAllByValue(field: string, value: any): Promise<ConsultationRequestModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<ConsultationRequestModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: ConsultationRequestModel): Promise<ConsultationRequestModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: ConsultationRequestModel): Promise<ConsultationRequestModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
