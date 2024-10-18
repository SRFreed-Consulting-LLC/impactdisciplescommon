import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { TestimonialModel } from 'impactdisciplescommon/src/models/domain/testimonial.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService extends BaseService<TestimonialModel> {
  constructor(public override dao: FirebaseDAO<TestimonialModel>) {
    super(dao)
    this.table="testimonials"
    this.fromFirestore = TestimonialService.fromFirestore
  }

  static readonly fromFirestore = (data): TestimonialModel => {
    data.date = dateFromTimestamp(data.date as Timestamp)

    return data;
  };
}
