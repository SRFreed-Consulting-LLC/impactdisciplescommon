import { BaseModel } from "../base.model"

export class MailTemplateModel extends BaseModel {
  name: string
  subject: string;
  html: string;
}
