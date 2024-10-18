import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { CoachModel } from 'impactdisciplescommon/src/models/domain/coach.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CoachService extends BaseService<CoachModel>{
  constructor(public override dao: FirebaseDAO<CoachModel> ) {
    super(dao)
    this.table="coaches"
    this.fromFirestore = CoachService.fromFirestore
  }

  static readonly fromFirestore = (data): CoachModel => {
    data.fullname = data.firstName + " " + data.lastName

    return data;
  };
}
