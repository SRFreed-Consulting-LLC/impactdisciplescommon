import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { Observable } from 'rxjs';
import { TagModel } from '../models/domain/tag.model';

@Injectable({
  providedIn: 'root'
})
export class ProductTagsService {
  table: string = 'product_tags';

  constructor(public dao: FirebaseDAO<TagModel>) {}

  getAll(): Promise<TagModel[]>{
    return this.dao.getAll(this.table);
  }

  streamAll(): Observable<TagModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<TagModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<TagModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: TagModel): Promise<TagModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: TagModel): Promise<TagModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
