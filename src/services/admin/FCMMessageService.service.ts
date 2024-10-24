import { Injectable } from "@angular/core";
import { Messaging, getToken, onMessage } from "@angular/fire/messaging";
import { Timestamp } from "firebase/firestore";
import { AppUser } from "impactdisciplescommon/src/models/admin/appuser.model";
import { NotificationRegistrationModel } from "impactdisciplescommon/src/models/admin/notification-registration.model";
import { NotificationRegistrationService } from "impactdisciplescommon/src/services/admin/notification-registration.service";
import { AuthService } from "impactdisciplescommon/src/services/utils/auth.service";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FcmMessageService {
  constructor(private messaging: Messaging, private toastrService: ToastrService,
    private authService: AuthService, private notificationRegistrationService: NotificationRegistrationService){}

  checkNotificationsSetup(){
    if(Notification.permission != 'granted'){
      this.validateAndRegisterUser()
    } else {
      this.setupNotificationListener();
    }
  }

  setupNotificationListener(){
    console.log("registering "  + environment.domain);

    //navigator.serviceWorker.register("firebase-messaging-sw.js", { type: 'module', scope: environment.domain}).then((serviceWorkerRegistration) => {
      navigator.serviceWorker.getRegistration().then(registration =>{
        let val =  {
          vapidKey: 'BA7LQNkyXTlmgpoC_YX2okUq2LkSXb_6HogSTje_vWteRH9LSVWbHnBwYx-WJ1PO6ryyg0xB_v3B2PGBFN0namY',
          serviceWorkerRegistration: registration,
        };

        getToken(this.messaging, val).then(async (x) => {
          console.log('my fcm token', x);
          localStorage.setItem('fcmtoken', x);
        });
      })


    //}).catch(err => console.error(err));

    onMessage(this.messaging, (msg) => {
      this.toastrService.show(msg.notification.title, msg.notification.body);
      console.log("My Firebase Cloud Message", msg);
    });
  }

  validateAndRegisterUser(){
    Notification.requestPermission().then((notificationPermissions: NotificationPermission) => {
      if (notificationPermissions === "granted") {
        console.log("Granted");

        this.setupNotificationListener();
      }
      if (notificationPermissions === "denied") {
        console.log("Denied");
      }
    });
  }

  async persistTokentoDB(user: AppUser){
    if(user){
      let registrations: NotificationRegistrationModel[] = await this.notificationRegistrationService.getAllByValue('email', user.email);

      let found = registrations[0];

      if(found){
        found.fcmId = localStorage.getItem('fcmtoken');

        found.dateRegistered = Timestamp.now();

        this.notificationRegistrationService.update(found.id, found).then(reg => console.log("updated reg for " + reg.email));
      } else {
        found = new NotificationRegistrationModel();

        found.email = this.authService.user.email;
        found.fcmId = found.fcmId = localStorage.getItem('fcmtoken');
        found.dateRegistered = Timestamp.now();

        this.notificationRegistrationService.add({...found}).then(reg => console.log("added reg for " + reg.email));;
      }
    }
  }
}

