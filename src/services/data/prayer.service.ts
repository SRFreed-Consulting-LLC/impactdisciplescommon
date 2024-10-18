import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { PrayerModel } from 'impactdisciplescommon/src/models/domain/prayer.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PrayerService extends BaseService<PrayerModel>{
  constructor(public override dao: FirebaseDAO<PrayerModel> ) {
    super(dao)
    this.table="prayers"
  }
}
