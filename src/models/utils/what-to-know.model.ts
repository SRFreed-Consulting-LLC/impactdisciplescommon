import { BaseModel } from "../base.model";

export class WhatToKnowModel extends BaseModel{
  title?: string;
  text?: string;
  day: number;
}
