import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { FAQModel } from 'impactdisciplescommon/src/models/utils/faq.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FAQService extends BaseService<FAQModel>{
  constructor(public override dao: FirebaseDAO<FAQModel> ) {
    super(dao)
    this.table="faq"
  }
}
