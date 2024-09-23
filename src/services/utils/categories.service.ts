import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { TagModel } from 'impactdisciplescommon/src/models/domain/tag.model';
import { CategoryModel } from 'impactdisciplescommon/src/models/utils/categories.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  table: string = 'product_categories';

  constructor(public dao: FirebaseDAO<TagModel>) {}

  getAll(): Promise<TagModel[]>{
    return this.dao.getAll(this.table)
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
