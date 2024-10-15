import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseDAO, QueryParam } from 'impactdisciplescommon/src/dao/firebase.dao';
import { TestimonialModel } from 'impactdisciplescommon/src/models/domain/testimonial.model';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  table: string = 'testimonials';

  constructor(public dao: FirebaseDAO<TestimonialModel>) {}

  getAll(): Promise<TestimonialModel[]>{
    return this.dao.getAll(this.table).then(testimonials =>{
      testimonials.forEach(testimonial => {
        testimonial.date = dateFromTimestamp(testimonial.date as Timestamp);
      })

      return testimonials;
    })
  }

  streamAll(): Observable<TestimonialModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(testimonials => {
        testimonials.forEach(testimonial => {
          testimonial.date = dateFromTimestamp(testimonial.date as Timestamp);
        });
        return testimonials;
      })
    );;
  }

  getAllByValue(field: string, value: any): Promise<TestimonialModel[]>{
    return this.dao.getAllByValue(this.table, field, value).then(testimonials =>{
      testimonials.forEach(testimonial => {
        testimonial.date = dateFromTimestamp(testimonial.date as Timestamp);
      })

      return testimonials;
    });
  }

  queryAllStreamByMultiValue(queries: QueryParam[]): Observable<TestimonialModel[]>{
    return this.dao.queryAllStreamByMultiValue(this.table, queries).pipe(
      map(testimonials => {
        testimonials.forEach(testimonial => {
          testimonial.date = dateFromTimestamp(testimonial.date as Timestamp);
        });
        return testimonials;
      })
    );
  }

  getById(id: String): Promise<TestimonialModel>{
    return this.dao.getById(id, this.table).then(testimonial => {
      testimonial.date = dateFromTimestamp(testimonial.date as Timestamp);

      return testimonial;
    });
  }

  add(value: TestimonialModel): Promise<TestimonialModel>{
    return this.dao.add(value, this.table).then(testimonial => {
      testimonial.date = dateFromTimestamp(testimonial.date as Timestamp);

      return testimonial;
    });
  }

  update(id: string, value: TestimonialModel): Promise<TestimonialModel>{
    return this.dao.update(id, value, this.table).then(testimonial => {
      testimonial.date = dateFromTimestamp(testimonial.date as Timestamp);

      return testimonial;
    });
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
