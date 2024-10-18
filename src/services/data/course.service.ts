import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { CourseModel } from 'impactdisciplescommon/src/models/domain/course.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService<CourseModel>{
  constructor(public override dao: FirebaseDAO<CourseModel> ) {
    super(dao)
    this.table="courses"
  }
}
