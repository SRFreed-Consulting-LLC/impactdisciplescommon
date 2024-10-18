import { Injectable } from "@angular/core";
import { LogMessage } from "../../models/utils/log-message.model";
import { FirebaseDAO } from '../../dao/firebase.dao';
import { Timestamp } from "firebase/firestore";
import { dateFromTimestamp } from "impactdisciplescommon/src/utils/date-from-timestamp";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class LoggerService extends BaseService<LogMessage> {
  constructor(public override dao: FirebaseDAO<LogMessage>) {
    super(dao)
    this.table="log-messages"
    this.fromFirestore = LoggerService.fromFirestore
  }

  static readonly fromFirestore = (data): LogMessage => {
    data.date = dateFromTimestamp(data.date as Timestamp)

    return data;
  };
}
