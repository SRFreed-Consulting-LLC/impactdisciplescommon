import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { TagModel } from 'impactdisciplescommon/src/models/domain/tag.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BlogCategoriesService extends BaseService<TagModel> {
  constructor(public override dao: FirebaseDAO<TagModel>) {
    super(dao)
    this.table="blog_categories"
  }
}
