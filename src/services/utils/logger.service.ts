import { Injectable } from "@angular/core";
import { LogMessage } from "../../models/utils/log-message.model";
import { FirebaseDAO } from '../../dao/firebase.dao';
import { from, map, Observable } from "rxjs";
import { Timestamp } from "firebase/firestore";
import { dateFromTimestamp } from "impactdisciplescommon/src/utils/date-from-timestamp";


@Injectable({
  providedIn: "root",
})
export class LoggerService {
  table: string = 'log-messages';

  constructor(public dao: FirebaseDAO<LogMessage>) {
  }

  getAll(): Promise<LogMessage[]>{
    return this.dao.getAll('log-messages').then(messages => {
      messages.forEach(message => {
        if(message.date){
          message.date = dateFromTimestamp(message.date as Timestamp);
        }
      })
      return messages;
    });
  }

  streamAll(): Observable<LogMessage[]>{
    return this.dao.streamAll(this.table).pipe(
      map(messages => {
        messages.forEach(message => {
          if(message.date){
            message.date = dateFromTimestamp(message.date as Timestamp);
          }
        });
        return messages;
      })
    );
  }

  getById(id: String): Promise<LogMessage>{
    return this.dao.getById(id, this.table);
  }

  streamAllByValue(field: string, value: any): Observable<LogMessage[]> {
    return from(this.dao.getAllByValue(this.table, field, value)).pipe(
      map(messages => {
        messages.forEach(message => {
          if(message.date){
            message.date = dateFromTimestamp(message.date as Timestamp);
          }
        });
        return messages;
      })
    );
  }

  add(value: LogMessage): Promise<LogMessage>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: LogMessage): Promise<LogMessage>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
