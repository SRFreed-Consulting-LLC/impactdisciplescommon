import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { EmailList } from 'impactdisciplescommon/src/models/utils/email-list.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EmailListService extends BaseService<EmailList>{
  constructor(public override dao: FirebaseDAO<EmailList> ) {
    super(dao)
    this.table="email_lists"
  }
}
