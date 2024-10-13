import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { EMailModel } from 'impactdisciplescommon/src/models/admin/mail.model';
import { CustomerEmailModel } from 'impactdisciplescommon/src/models/domain/customer-email.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerEmailService {
  table: string = 'customer_emails';

  constructor(public dao: FirebaseDAO<CustomerEmailModel>) {}

  getAll(): Promise<CustomerEmailModel[]>{
    return this.dao.getAll(this.table).then(messages =>{
      messages.forEach(message => {
        message.date = dateFromTimestamp(message.date as Timestamp);
      })

      return messages;
    })
  }

  streamAll(): Observable<CustomerEmailModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(messages => {
        messages.forEach(message => {
          message.date = dateFromTimestamp(message.date as Timestamp);
        });
        return messages;
      })
    );;
  }

  getAllByValue(field: string, value: any): Promise<CustomerEmailModel[]>{
    return this.dao.getAllByValue(this.table, field, value).then(messages =>{
      messages.forEach(testimonial => {
        testimonial.date = dateFromTimestamp(testimonial.date as Timestamp);
      })

      return messages;
    });
  }

  getById(id: String): Promise<CustomerEmailModel>{
    return this.dao.getById(id, this.table).then(message => {
      message.date = dateFromTimestamp(message.date as Timestamp);

      return message;
    });
  }

  add(value: CustomerEmailModel): Promise<CustomerEmailModel>{
    return this.dao.add(value, this.table).then(message => {
      message.date = dateFromTimestamp(message.date as Timestamp);

      return message;
    });
  }

  update(id: string, value: CustomerEmailModel): Promise<CustomerEmailModel>{
    return this.dao.update(id, value, this.table).then(message => {
      message.date = dateFromTimestamp(message.date as Timestamp);

      return message;
    });
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
