import { Injectable } from '@angular/core';
import { AppUser } from '../../models/admin/appuser.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() {}

  currentUser: AppUser;

}
