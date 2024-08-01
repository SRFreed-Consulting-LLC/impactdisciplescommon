import { Timestamp } from "@google-cloud/firestore";

export class NotificationRegistrationModel {
  id: string;
  email: string;
  fcmId: string;
  dateRegistered: Timestamp;
  dateRemoved: Timestamp;
}
