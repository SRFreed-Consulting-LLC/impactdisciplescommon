import { Injectable } from '@angular/core';
import { FirebaseDAO, WhereFilterOperandKeys, QueryParam } from 'impactdisciplescommon/src/dao/firebase.dao';
import { BaseModel } from 'impactdisciplescommon/src/models/base.model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends BaseModel> {
  public table: string = '';
  public fromFirestore;

  constructor(public dao: FirebaseDAO<T>) {}

  getAll(): Promise<T[]>{
    return this.dao.getAll(this.table, this.fromFirestore)
  }

  getAllByValue(field: string, value: any): Promise<T[]>{
    return this.dao.getAllByValue(this.table, field, value, this.fromFirestore);
  }

  queryAllByValue(field: string, opStr: WhereFilterOperandKeys, value: any): Promise<T[]>{
    return this.dao.queryByValue(this.table, field, opStr, value, this.fromFirestore);
  }

  queryAllByMultiValue(table: string, queries: QueryParam[]): Promise<T[]>{
    return this.dao.queryAllByMultiValue(this.table, queries, this.fromFirestore)
  }

  getById(id: String): Promise<T>{
    return this.dao.getById(id, this.table, this.fromFirestore);
  }

  streamAll(): Observable<T[]>{
    return this.dao.streamAll(this.table, this.fromFirestore)
  }

  streamAllByValue(field: string, value: any): Observable<T[]>{
    return this.dao.streamByValue(this.table, value, field, this.fromFirestore)
  }

  streamById(id: String): Observable<T>{
    return from(this.dao.getById(id, this.table, this.fromFirestore));
  }

  queryStreamByValue(value: any, opStr: WhereFilterOperandKeys, field: string): Observable<T[]>{
    return this.dao.queryStreamByValue(this.table, value, opStr, field, this.fromFirestore);
  }

  queryAllStreamByMultiValue(queries: QueryParam[]): Observable<T[]>{
    return this.dao.queryAllStreamByMultiValue(this.table, queries, this.fromFirestore);
  }

  add(value: T): Promise<T>{
    return this.dao.add(value, this.table, this.fromFirestore);
  }

  update(id: string, value: T): Promise<T>{
    return this.dao.update(id, value, this.table, this.fromFirestore);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
