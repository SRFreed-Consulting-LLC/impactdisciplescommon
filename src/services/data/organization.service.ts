import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { OrganizationModel } from 'impactdisciplescommon/src/models/domain/organization.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends BaseService<OrganizationModel>{
  constructor(public override dao: FirebaseDAO<OrganizationModel> ) {
    super(dao)
    this.table="organizations"
  }
}
