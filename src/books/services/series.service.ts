import { Injectable } from '@angular/core';
import { SeriesModel } from '../models/series.model';
import { BaseService } from './base.service';
import { FirebaseDAO } from './firebase.dao';


@Injectable({
  providedIn: 'root'
})
export class SeriesService extends BaseService<SeriesModel>{
  constructor(public override dao: FirebaseDAO<SeriesModel>) {
    super(dao)
    this.table="series"
  }
}
