import { BaseModel } from "../base.model";
import { Address } from "./utils/address.model";

export class LocationModel extends BaseModel {
  name: string;
  address: Address;
}
