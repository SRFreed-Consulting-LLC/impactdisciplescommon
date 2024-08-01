import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../../dao/firebase.dao';
import { NotificationRegistrationModel } from 'impactdisciplescommon/src/models/admin/notification-registration.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationRegistrationService {
  table: string = 'notification_registrations';

  constructor(public dao: FirebaseDAO<NotificationRegistrationModel>) {}

  getAll(): Promise<NotificationRegistrationModel[]>{
    return this.dao.getAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<NotificationRegistrationModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<NotificationRegistrationModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: NotificationRegistrationModel): Promise<NotificationRegistrationModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: NotificationRegistrationModel): Promise<NotificationRegistrationModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
  }
}
