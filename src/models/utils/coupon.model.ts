import { BaseModel } from "../base.model"
import { TagModel } from "../domain/tag.model"

export class CouponModel extends BaseModel {
  code: string
  isActive: boolean
  percentOff: number | null
  dollarsOff: number | null
  tags: string[];
}
