import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FirebaseDAO } from './firebase.dao';
import { LanguageModel } from '../models/language.model';


@Injectable({
  providedIn: 'root'
})
export class LanguageService extends BaseService<LanguageModel>{
  constructor(public override dao: FirebaseDAO<LanguageModel>) {
    super(dao)
    this.table="languages"
  }
}
