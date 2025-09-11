import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FirebaseDAO } from './firebase.dao';
import { LessonLanguageModel } from '../models/lesson-language.model';

@Injectable({
  providedIn: 'root'
})
export class LessonLanguageService extends BaseService<LessonLanguageModel>{
  constructor(public override dao: FirebaseDAO<LessonLanguageModel>) {
    super(dao)
    this.table="lessons-languages"
  }
}
