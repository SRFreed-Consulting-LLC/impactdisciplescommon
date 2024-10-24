import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { WebConfigModel } from 'impactdisciplescommon/src/models/utils/web-config.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class WebConfigService extends BaseService<WebConfigModel>{
  constructor(public override dao: FirebaseDAO<WebConfigModel>) {
    super(dao)
    this.table="config"
    this.fromFirestore = WebConfigService.fromFirestore
  }

  static readonly fromFirestore = (data): WebConfigModel => {
    data.taxImportDate = dateFromTimestamp(data.taxImportDate as Timestamp)

    return data;
  };
}
