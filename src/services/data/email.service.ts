import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { EMailModel, MessageModel, TemplateModel } from 'impactdisciplescommon/src/models/admin/mail.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EMailService extends BaseService<EMailModel>{
  constructor(public override dao: FirebaseDAO<EMailModel>) {
    super(dao)
    this.table="mail"
    this.fromFirestore = EMailService.fromFirestore
  }

  static readonly fromFirestore = (data): EMailModel => {
    data.date = dateFromTimestamp(data.date as Timestamp)

    return data;
  };

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
