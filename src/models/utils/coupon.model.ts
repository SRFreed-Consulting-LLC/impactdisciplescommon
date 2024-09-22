import { BaseModel } from "../base.model"

export class CouponModel extends BaseModel {
  code: string;
  isActive: boolean = false;
  isAffilliate: boolean = false;
  affilliateName: string;
  affiliatePaypalAccount: string;
  percentOff: number | null;
  dollarsOff: number | null;
  tags: string[];
}
