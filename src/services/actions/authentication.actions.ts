import { AppUser } from "impactdisciplescommon/src/models/admin/appuser.model";

export class UserAuthenticated {
  static readonly type = '[AUTHENTICATION] User Authenticated';
  constructor(public user: AppUser){}
}