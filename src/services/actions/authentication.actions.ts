import { ImpactUser } from "impactdisciplescommon/src/books/models/impact-user.model";
import { AppUser } from "impactdisciplescommon/src/models/admin/appuser.model";
import { EventRegistrationModel } from "impactdisciplescommon/src/models/domain/event-registration.model";
import { CustomerModel } from "impactdisciplescommon/src/models/domain/utils/customer.model";

export class UserAuthenticated {
  static readonly type = '[AUTHENTICATION] User Authenticated';
  constructor(public user: AppUser | CustomerModel | ImpactUser | EventRegistrationModel){}
}
