import { BaseModel } from "../../base.model";

export class AgendaItem extends BaseModel{
  text: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isCourse?: boolean;
  isSingleSessionCourse?: boolean;
}
