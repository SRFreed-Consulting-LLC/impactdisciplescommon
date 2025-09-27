import { Injectable } from '@angular/core';
import { ImpactUser } from 'impactdisciplescommon/src/books/models/impact-user.model';
import { BaseService } from './base.service';
import { FirebaseDAO } from './firebase.dao';

@Injectable({
  providedIn: 'root'
})
export class ImpactUserService extends BaseService<ImpactUser>{
  constructor(public override dao: FirebaseDAO<ImpactUser>) {
    super(dao)
    this.table="impact-users"
  }
}
