import { BaseModel } from "../base.model"

export class CouponModel extends BaseModel {
  code: string
  isActive: boolean
  percentOff: number | null
  dollarsOff: number | null
  tags: string[];
}
