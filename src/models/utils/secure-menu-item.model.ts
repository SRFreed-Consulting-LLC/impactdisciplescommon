import { Role } from "impactdisciplescommon/src/lists/roles.enum";

export class SecureMenuItem{
  id: number;
  text: string;
  icon: string;
  path: string;
  users: Role[]
}
