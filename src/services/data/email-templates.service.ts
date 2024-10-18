import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { MailTemplateModel } from 'impactdisciplescommon/src/models/admin/mail.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EMailTemplatesService extends BaseService<MailTemplateModel> {
  constructor(public override dao: FirebaseDAO<MailTemplateModel>) {
    super(dao)
    this.table="mail_templates"
  }
}
