import { Injectable } from "@angular/core";
import { Timestamp } from "@google-cloud/firestore";
import { LogMessage } from "../../models/utils/log-message.model";
import { FirebaseDAO } from '../../dao/firebase.dao';
import { Observable } from "rxjs";


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
          message.date = (message.date as Timestamp).toDate();
        }
      })
      return messages;
    });
  }

  streamAll(): Observable<LogMessage[]>{
    return this.dao.streamAll(this.table);
  }

  getById(id: String): Promise<LogMessage>{
    return this.dao.getById(id, this.table);
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
