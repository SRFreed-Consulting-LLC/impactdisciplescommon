import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { map, Observable } from 'rxjs';
import { dateFromTimestamp } from '../utils/date-from-timestamp';
import { Timestamp } from 'firebase/firestore';
import { ConsultationSurveyModel } from '../models/domain/consultation-survey.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationSurveyService {
  table: string = 'consultation_surveys';

  constructor(public dao: FirebaseDAO<ConsultationSurveyModel>) {}

  getAll(): Promise<ConsultationSurveyModel[]>{
    return this.dao.getAll(this.table).then(items => {
      items.forEach(item => {
        item.date = dateFromTimestamp(item.date);
      })

      return items;
    })
  }

  streamAll(): Observable<ConsultationSurveyModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(events => {
        events.forEach(event => {
          event.date = dateFromTimestamp(event.date as Timestamp);
        });
        return events;
      })
    );
  }

  getAllByValue(field: string, value: any): Promise<ConsultationSurveyModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<ConsultationSurveyModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: ConsultationSurveyModel): Promise<ConsultationSurveyModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: ConsultationSurveyModel): Promise<ConsultationSurveyModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
