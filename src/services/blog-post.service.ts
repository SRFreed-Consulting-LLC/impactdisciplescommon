import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { from, map, Observable } from 'rxjs';
import { BlogPostModel } from '../models/domain/blog-post.model';
import { dateFromTimestamp } from '../utils/date-from-timestamp';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  table: string = 'blog_posts';

  constructor(public dao: FirebaseDAO<BlogPostModel>) {}

  getAll(): Promise<BlogPostModel[]>{
    return this.dao.getAll(this.table).then(items => {
      items.forEach(item => {
        item.date = dateFromTimestamp(item.date);
      })

      return items;
    })
  }

  streamAll(): Observable<BlogPostModel[]>{
    return this.dao.streamAll(this.table).pipe(
      map(events => {
        events.forEach(event => {
          event.date = dateFromTimestamp(event.date as Timestamp);
        });
        return events;
      })
    );
  }

  getAllByValue(field: string, value: any): Promise<BlogPostModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  streamAllByValue(field: string, value: any): Observable<BlogPostModel[]>{
    return this.dao.streamByValue(this.table, value, field).pipe(
      map(blogs => {
        blogs.forEach(blog => {
          blog.date = dateFromTimestamp(blog.date as Timestamp);
        });
        return blogs;
      })
    );
  }

  getById(id: String): Promise<BlogPostModel>{
    return this.dao.getById(id, this.table);
  }

  streamById(id: String): Observable<BlogPostModel>{
    return from(this.dao.getById(id, this.table));
  }

  add(value: BlogPostModel): Promise<BlogPostModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: BlogPostModel): Promise<BlogPostModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
