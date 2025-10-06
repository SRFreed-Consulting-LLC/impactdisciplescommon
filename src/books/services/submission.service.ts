import { Injectable } from "@angular/core"
import { FormSubmissionModel } from "../models/form-submission.model"
import { BaseService } from "./base.service"
import { FirebaseDAO } from "./firebase.dao"

@Injectable({
  providedIn: 'root'
})
export class SubmissionService extends BaseService<FormSubmissionModel> {
  constructor(public override dao: FirebaseDAO<FormSubmissionModel>) {
    super(dao)
    this.table="submissions"
  }
}
