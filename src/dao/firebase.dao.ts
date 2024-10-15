import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryConstraint, updateDoc } from 'firebase/firestore';
import { BaseModel } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDAO<T extends BaseModel> {

  constructor(public fs: Firestore ) {}

  getAll(table: string): Promise<T[]>{
    return getDocs(collection(this.fs, '/' + table)).then(docs => {
      let retval: T[] = [];

      docs.forEach(doc => {
        let val: T = doc.data() as T;
        val.id = doc.id;
        retval.push(val);
      })

      return retval;
    });
  }

  getAllByValue(table: string, field: string, value: any): Promise<T[]>{
    const q = query(collection(this.fs, '/' + table), where(field, "==", value));

    return getDocs(q).then(docs => {
      let retval: T[] = [];

      docs.forEach(doc => {
        let val: T = doc.data() as T;
        val.id = doc.id;
        retval.push(val);
      })

      return retval;
    });
  }

  queryByValue(table: string, field: string, opStr: WhereFilterOperandKeys, value: any): Promise<T[]>{
    const q = query(collection(this.fs, '/' + table), where(field, opStr, value));

    return getDocs(q).then(docs => {
      let retval: T[] = [];

      docs.forEach(doc => {
        let val: T = doc.data() as T;
        val.id = doc.id;
        retval.push(val);
      })

      return retval;
    });
  }

  getById(id: String, table: string): Promise<T>{
    let docRef = doc(this.fs, '/' + table + '/' + id);
    return getDoc(docRef).then(doc => {
      let val: T = doc.data() as T;
      if(val){
        val.id = doc?.id;
      }
      return val;
    });
  }

  localeCompareOptions = {
    numeric: true,
    sensitivity: Intl.NumberFormat,
    ignorePunctuation: true,
  };

  add(value: T, table: string): Promise<T>{
    return addDoc(collection(this.fs, '/' + table), value).then(doc => {
      return this.getById(doc.id, table);
    });
  }

  async update(id: string, value: T, table: string): Promise<T>{
    let docRef = doc(this.fs, '/' + table + '/' + id);

    await setDoc(docRef, value);

    return this.getById(id, table);
  }

  async updateField(id: string, table: string, field: string, value: string): Promise<T>{
    let docRef = doc(this.fs, '/' + table + '/' + id);

    let data: any = {}
    data[field] = value;

    await updateDoc(docRef, data);

    return this.getById(id, table);
  }

  delete(id: string, table: string){
    let docRef = doc(this.fs, '/' + table + '/' + id);
    return deleteDoc(docRef);
  }

  streamAll(table: string): Observable<T[]>{
    return collectionData(collection(this.fs, '/' + table), {idField: 'id'}).pipe(
      map(dd => {
        let retval: T[] = [];
        dd.forEach(d => {
          retval.push(d as T);
        })
        return retval;
      })
    );
  }

  streamById(table: string, id: any, field?: string): Observable<T[]>{
    const q = query(collection(this.fs, '/' + table), where(field? field : "id", "==", id));
    return collectionData(q, {idField: 'id'}).pipe(
      map(dd => {
        let retval: T[] = [];
        dd.forEach(d => {
          retval.push(d as T);
        })
        return retval;
      })
    );
  }

  streamByValue(table: string, value: any, field: string): Observable<T[]>{
    const q = query(collection(this.fs, '/' + table), where(field, "==", value));
    return collectionData(q, {idField: 'id'}).pipe(
      map(dd => {
        let retval: T[] = [];
        dd.forEach(d => {
          retval.push(d as T);
        })
        return retval;
      })
    );
  }

  queryStreamByValue(table: string, value: any, opStr: WhereFilterOperandKeys, field: string): Observable<T[]>{
    const q = query(collection(this.fs, '/' + table), where(field, opStr, value));
    return collectionData(q, {idField: 'id'}).pipe(
      map(dd => {
        let retval: T[] = [];
        dd.forEach(d => {
          retval.push(d as T);
        })
        return retval;
      })
    );
  }

  queryAllStreamByMultiValue(table: string, queries: QueryParam[]): Observable<T[]>{
    const queryConstraints: QueryConstraint[] = queries.map((query) =>
      where(query.field, query.operation, query.value),
    );

    const q = query(collection(this.fs, '/' + table), ...queryConstraints);
    return collectionData(q, {idField: 'id'}).pipe(
      map(dd => {
        let retval: T[] = [];
        dd.forEach(d => {
          retval.push(d as T);
        })
        return retval;
      })
    );
  }

  queryAllByMultiValue(table: string, queries: QueryParam[]): Promise<T[]>{
    const queryConstraints: QueryConstraint[] = queries.map((query) =>
      where(query.field, query.operation, query.value),
    );

    const q = query(collection(this.fs, '/' + table), ...queryConstraints);

    return getDocs(q).then(docs => {
      let retval: T[] = [];

      docs.forEach(doc => {
        let val: T = doc.data() as T;
        val.id = doc.id;
        retval.push(val);
      })

      return retval;
    });
  }

  public async createInSubcollection(value: T, table: string, record_id: string, subcollection: string): Promise<T> {
    const ref = collection(this.fs, table, record_id, subcollection)

    const snap = await addDoc(ref, value);

    return this.getById(table, snap.id);
  }

  public async getAllFromSubCollection(table: string, record_id: string, subcollection: string): Promise<T[]> {
    const ref = collection(this.fs, table, record_id, subcollection)

    const snap = await getDocs(ref);

    const docsData = snap.docs.map((item) => (item.exists() ? item.data() as T : null));

    return docsData;
  }
}


export enum WhereFilterOperandKeys {
  less = '<',
  lessOrEqual = '<=',
  equal = '==',
  notEqual = '!=',
  more = '>',
  moreOrEqual = '>=',
  arrayContains = 'array-contains',
  in = 'in',
  arrayContainsAny = 'array-contains-any',
  notIn = 'not-in',
}

export class QueryParam {
  constructor(field: string, operation: WhereFilterOperandKeys, value: any) {
    this.field = field;
    this.operation = operation;
    this.value = value;
  }
  field: string;
  value: any;
  operation: WhereFilterOperandKeys;
}
