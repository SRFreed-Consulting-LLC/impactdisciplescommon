import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { BaseService } from './base.service';
import { WhatToKnowModel } from 'impactdisciplescommon/src/models/utils/what-to-know.model';

@Injectable({
  providedIn: 'root'
})
export class WhatToKnowService extends BaseService<WhatToKnowModel>{
  constructor(public override dao: FirebaseDAO<WhatToKnowModel> ) {
    super(dao)
    this.table="what_to_knows"
  }
}
