import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { MailTemplateModel } from 'impactdisciplescommon/src/models/admin/mail-templates.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EMailTemplatesService {
  table: string = 'mail_templates';

  constructor(public dao: FirebaseDAO<MailTemplateModel>) {}

  getAll(): Promise<MailTemplateModel[]>{
    return this.dao.getAll(this.table)
  }

  streamAll(): Observable<MailTemplateModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<MailTemplateModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<MailTemplateModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: MailTemplateModel): Promise<MailTemplateModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: MailTemplateModel): Promise<MailTemplateModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
