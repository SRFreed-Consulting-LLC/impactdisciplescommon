import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { LocationModel } from 'impactdisciplescommon/src/models/domain/location.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService<LocationModel>{
  constructor(public override dao: FirebaseDAO<LocationModel> ) {
    super(dao)
    this.table="locations"
  }
}
