import { Injectable } from '@angular/core';
import { AppUser } from '../../models/admin/appuser.model';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';
import { EventRegistrationModel } from 'impactdisciplescommon/src/models/domain/event-registration.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private authService: AuthService) {}

  currentUser: AppUser | CustomerModel | EventRegistrationModel;

  private currentEventId: string;

  setCurrentEventId(eventId: string){
    this.currentEventId = eventId
  }

  async getCurrentEventId(){
    let retval = this.currentEventId;

    if(!retval){
      retval = (await this.authService.getUserAsPromise() as EventRegistrationModel).eventId
    }

    return retval;
  }

}
