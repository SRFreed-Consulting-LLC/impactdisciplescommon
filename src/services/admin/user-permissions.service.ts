import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../../dao/firebase.dao';
import { UserPermission } from '../../models/admin/user-permission.model';
import { IMPACT_APPLICATIONS } from '../../lists/impact_applications.enum';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {
  private readonly agentCollectionPath = 'agents';
  private readonly associationCollectionPath = 'user-permissions';

  constructor(public dao: FirebaseDAO<UserPermission>) {

  }

  public getAll(agentId: string): Promise<UserPermission[]> {
    return this.dao.getAll('user_permissions');
  }

  public getAllByValue(field: string, value: any): Promise<UserPermission[]> {
    return this.dao.getAllByValue('user_permissions', field, value);
  }

  public create(data: UserPermission) {
    return this.dao.add(data, 'user_permissions');
  }

  public update(id: string, data: UserPermission) {
    return this.dao.update(id, data, 'user_permissions');
  }

  public delete(id: string) {
    return this.dao.delete(id, 'user_permissions');
  }

  isUserPermittedinCRM(dbId: string): Promise<boolean>{
    return this.getAll(dbId).then(permissions => {
      let p = permissions.filter(permission => permission.application == IMPACT_APPLICATIONS.CRM_APP)

      if(p.length == 1 && p[0].isEnabled){
        return true;
      } else {
        return false;
      }
    })
  }

  isUserPermittedinAdminApp(dbId: string): Promise<boolean>{
    return this.getAll(dbId).then(permissions => {
      let p = permissions.filter(permission => permission.application == IMPACT_APPLICATIONS.ADMIN_APP)

      if(p.length == 1 && p[0].isEnabled){
        return true;
      } else {
        return false;
      }
    })
  }

  private getCollectionPath(agentId: string) {
    return [this.agentCollectionPath, agentId, this.associationCollectionPath].join('/');
  }
}
