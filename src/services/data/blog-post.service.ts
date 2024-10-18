import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../../dao/firebase.dao';
import { BlogPostModel } from '../../models/domain/blog-post.model';
import { BaseService } from './base.service';
import { dateFromTimestamp } from '../../utils/date-from-timestamp';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService extends BaseService<BlogPostModel>{
  constructor(public override dao: FirebaseDAO<BlogPostModel> ) {
    super(dao)
    this.table="blog_posts"
    this.fromFirestore = BlogPostService.fromFirestore
  }

  static readonly fromFirestore = (data): BlogPostModel => {
    data.date = dateFromTimestamp(data.date as Timestamp)

    return data;
  };
}
