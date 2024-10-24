import { AppUser } from "impactdisciplescommon/src/models/admin/appuser.model";
import { CustomerModel } from "impactdisciplescommon/src/models/domain/utils/customer.model";

export class UserAuthenticated {
  static readonly type = '[AUTHENTICATION] User Authenticated';
  constructor(public user: AppUser | CustomerModel){}
}
