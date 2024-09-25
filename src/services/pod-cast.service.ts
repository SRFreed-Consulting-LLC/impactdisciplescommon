import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { map, Observable } from 'rxjs';
import { PodCastModel } from '../models/domain/pod-cast-model';
import { dateFromTimestamp } from '../utils/date-from-timestamp';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PodCastService {
  table: string = 'pod_casts';

  constructor(public dao: FirebaseDAO<PodCastModel>) {}

  getAll(): Promise<PodCastModel[]>{
    return this.dao.getAll(this.table).then(items => {
      items.forEach(item => {
        item.date = dateFromTimestamp(item.date);
      })

      return items;
    })
  }

  streamAll(): Observable<PodCastModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(events => {
        events.forEach(event => {
          event.date = dateFromTimestamp(event.date as Timestamp);
        });
        return events;
      })
    );
  }

  getAllByValue(field: string, value: any): Promise<PodCastModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  streamAllByValue(field: string, value: any): Observable<PodCastModel[]>{
    return this.dao.streamByValue(this.table, value, field).pipe(
      map(podcasts => {
        podcasts.forEach(podcast => {
          podcast.date = dateFromTimestamp(podcast.date as Timestamp);
        });
        return podcasts;
      })
    );
  }

  getById(id: String): Promise<PodCastModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: PodCastModel): Promise<PodCastModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: PodCastModel): Promise<PodCastModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
