import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { Observable } from 'rxjs';
import { BlogTagModel } from '../models/domain/blog-tag.model';

@Injectable({
  providedIn: 'root'
})
export class BlogTagsService {
  table: string = 'blog_tags';

  constructor(public dao: FirebaseDAO<BlogTagModel>) {}

  getAll(): Promise<BlogTagModel[]>{
    return this.dao.getAll(this.table);
  }

  streamAll(): Observable<BlogTagModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<BlogTagModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<BlogTagModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: BlogTagModel): Promise<BlogTagModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: BlogTagModel): Promise<BlogTagModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
