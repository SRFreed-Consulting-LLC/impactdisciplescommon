import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { BaseService } from './base.service';
import { HomePagePopupModel } from 'impactdisciplescommon/src/models/domain/home-page-popup.model';

@Injectable({
  providedIn: 'root'
})
export class HomePagePopUpService extends BaseService<HomePagePopupModel> {
  constructor(public override dao: FirebaseDAO<HomePagePopupModel>) {
    super(dao)
    this.table="home_page_popups"
  }
}
