import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { MailModel } from 'impactdisciplescommon/src/models/admin/mail.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EMailService {
  table: string = 'mail';

  constructor(public dao: FirebaseDAO<MailModel>) {}

  getAll(): Promise<MailModel[]>{
    return this.dao.getAll(this.table).then(messages =>{
      messages.forEach(message => {
        message.date = dateFromTimestamp(message.date as Timestamp);
      })

      return messages;
    })
  }

  streamAll(): Observable<MailModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(messages => {
        messages.forEach(message => {
          message.date = dateFromTimestamp(message.date as Timestamp);
        });
        return messages;
      })
    );;
  }

  getAllByValue(field: string, value: any): Promise<MailModel[]>{
    return this.dao.getAllByValue(this.table, field, value).then(messages =>{
      messages.forEach(testimonial => {
        testimonial.date = dateFromTimestamp(testimonial.date as Timestamp);
      })

      return messages;
    });
  }

  getById(id: String): Promise<MailModel>{
    return this.dao.getById(id, this.table).then(message => {
      message.date = dateFromTimestamp(message.date as Timestamp);

      return message;
    });
  }

  add(value: MailModel): Promise<MailModel>{
    return this.dao.add(value, this.table).then(message => {
      message.date = dateFromTimestamp(message.date as Timestamp);

      return message;
    });
  }

  update(id: string, value: MailModel): Promise<MailModel>{
    return this.dao.update(id, value, this.table).then(message => {
      message.date = dateFromTimestamp(message.date as Timestamp);

      return message;
    });
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
