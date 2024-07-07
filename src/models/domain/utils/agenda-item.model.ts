import { BaseModel } from "../../base.model";

export class AgendaItem extends BaseModel{
  text: string;

  startDate: Date;

  endDate: Date;

  allDay?: boolean;
}
