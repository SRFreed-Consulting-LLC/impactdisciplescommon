import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { BaseService } from './base.service';
import { HomePagePopupModel } from 'impactdisciplescommon/src/models/domain/home-page-popup.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomePagePopUpService extends BaseService<HomePagePopupModel> {
  constructor(public override dao: FirebaseDAO<HomePagePopupModel>) {
    super(dao)
    this.table="home_page_popups"
    this.fromFirestore = HomePagePopUpService.fromFirestore;
  }

  static readonly fromFirestore = (data): HomePagePopupModel => {
    data.fromDate = dateFromTimestamp(data.fromDate as Timestamp);
    data.toDate = dateFromTimestamp(data.toDate as Timestamp);

    return data;
  }
}
