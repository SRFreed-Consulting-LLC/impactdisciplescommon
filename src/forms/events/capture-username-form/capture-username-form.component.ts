import { EventRegistrationModel } from '../../../models/domain/event-registration.model';
import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/utils/session.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/data/event-registration.service';
import { LoggerService } from 'impactdisciplescommon/src/services/data/logger.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-capture-username-form',
  templateUrl: './capture-username-form.component.html',
  styleUrls: ['./capture-username-form.component.scss']
})
export class CaptureUsernameFormComponent implements OnDestroy  {
  @Input() loginEmail: any = {};
  public isLoading: boolean = false;

  environment = environment;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    public loggerService: LoggerService,
    private sessionService: SessionService,
    private eventRegistrationService: EventRegistrationService,
    private cookieService: CookieService) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.loginEmail;
    this.isLoading = true;

    this.eventRegistrationService.getAllByValue('email', email.toLowerCase()).then(eventRegistrations => {
      if(eventRegistrations.length == 0){
        this.loggerService.logMessage('LOGIN', email.toLowerCase(), 'The email address (' + email.toLowerCase() + ') is not recognized.', []);

        notify({
          message: 'The email address (' +email.toLowerCase() +') is not recognized. Please login with email address used during Registration.',
          position: 'top',
          type: 'error'
        });
      } else if(eventRegistrations.length == 1){
        this.setLoggedIn(eventRegistrations[0]);

        this.cookieService.set("REGISTERED_EVENTS", JSON.stringify(eventRegistrations));

        this.sessionService.setCurrentEventId(eventRegistrations[0].eventId);

        this.router.navigate(['home'])
      } else {
        this.cookieService.set("REGISTERED_EVENTS", JSON.stringify(eventRegistrations));

        this.router.navigate(['/event-selector']);
      }

      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setLoggedIn(registration: EventRegistrationModel){
    registration.loggedIn = true;

    this.eventRegistrationService.update(registration.id, registration);
  }
}
