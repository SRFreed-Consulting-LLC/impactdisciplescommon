import { BaseModel } from "../base.model"

export class CouponModel extends BaseModel {
  text: string
  isActive: boolean
  percentOff: number | null
  dollarsOff: number | null
}
