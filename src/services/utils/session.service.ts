import { Injectable } from '@angular/core';
import { AppUser } from '../../models/admin/appuser.model';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() {}

  currentUser: AppUser | CustomerModel;

}
