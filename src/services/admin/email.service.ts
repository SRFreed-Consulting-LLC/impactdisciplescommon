import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { EMailModel, MessageModel, TemplateModel } from 'impactdisciplescommon/src/models/admin/mail.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EMailService {
  table: string = 'mail';

  constructor(public dao: FirebaseDAO<EMailModel>) {}

  getAll(): Promise<EMailModel[]>{
    return this.dao.getAll(this.table).then(messages =>{
      messages.forEach(message => {
        message.date = dateFromTimestamp(message.date as Timestamp);
      })

      return messages;
    })
  }

  streamAll(): Observable<EMailModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(messages => {
        messages.forEach(message => {
          message.date = dateFromTimestamp(message.date as Timestamp);
        });
        return messages;
      })
    );;
  }

  getAllByValue(field: string, value: any): Promise<EMailModel[]>{
    return this.dao.getAllByValue(this.table, field, value).then(messages =>{
      messages.forEach(testimonial => {
        testimonial.date = dateFromTimestamp(testimonial.date as Timestamp);
      })

      return messages;
    });
  }

  getById(id: String): Promise<EMailModel>{
    return this.dao.getById(id, this.table).then(message => {
      message.date = dateFromTimestamp(message.date as Timestamp);

      return message;
    });
  }

  add(value: EMailModel): Promise<EMailModel>{
    return this.dao.add(value, this.table).then(message => {
      message.date = dateFromTimestamp(message.date as Timestamp);

      return message;
    });
  }

  update(id: string, value: EMailModel): Promise<EMailModel>{
    return this.dao.update(id, value, this.table).then(message => {
      message.date = dateFromTimestamp(message.date as Timestamp);

      return message;
    });
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }

  sendHtmlEmail(to:string, subject: string, html: string){
    let mail = {... new EMailModel()}
    mail.to = to;
    mail.date = Timestamp.now();

    let mailMessage: MessageModel = {... new MessageModel()};

    mailMessage.subject = subject;
    mailMessage.html = html;

    mail.message = mailMessage;

    this.add(mail);
  }

  sendTextEmail(to:string, subject: string, text: string){
    let mail = {... new EMailModel()}
    mail.to = to;
    mail.date = Timestamp.now();

    let mailMessage: MessageModel = {... new MessageModel()};
    mailMessage.subject = subject;
    mailMessage.text = text;

    mail.message = mailMessage;

    this.add(mail);
  }

  sendTemplateEmail(to:string, templateId: string, model: any){
    let mail = {... new EMailModel()}
    mail.to = to;
    mail.date = Timestamp.now();

    let mailTemplate = {... new TemplateModel()};
    mailTemplate.name = templateId;
    mailTemplate.data = model;

    mail.template = mailTemplate;

    this.add(mail);
  }
}
