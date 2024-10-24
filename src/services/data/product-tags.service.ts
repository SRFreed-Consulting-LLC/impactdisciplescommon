import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { TagModel } from 'impactdisciplescommon/src/models/domain/tag.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTagsService extends BaseService<TagModel>{
  constructor(public override dao: FirebaseDAO<TagModel> ) {
    super(dao)
    this.table="product_tags"
  }
}
