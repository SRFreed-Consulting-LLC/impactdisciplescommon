import { EventRegistrationModel } from './../../models/domain/event-registration.model';
import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { SessionService } from '../../services/utils/session.service';
import { Subject, take, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { EventRegistrationService } from 'impactdisciplescommon/src/services/data/event-registration.service';
import { LoggerService } from 'impactdisciplescommon/src/services/data/logger.service';
import { EventModel } from 'impactdisciplescommon/src/models/domain/event.model';

const COOKIE_NAME = "impact-disciples-app"

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

  constructor(private authService: AuthService,
    private router: Router,
    public tostrService: ToastrService,
    public loggerService: LoggerService,
    private sessionService: SessionService,
    private eventRegistrationService: EventRegistrationService,
    private cookieService: CookieService) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.loginEmail;
    this.isLoading = true;


    if(environment.application == 'application'){
      let eventRegistrations: EventRegistrationModel[] = await this.eventRegistrationService.getAllByValue('email', email.toLowerCase());

      if(eventRegistrations.length == 0){
        this.loggerService.logMessage('LOGIN', email.toLowerCase(), 'The email address (' + email.toLowerCase() + ') is not recognized.', []);

        this.tostrService.error(
          'The email address (' +email.toLowerCase() +') is not recognized. Please login with email address used during Registration.', 'Login Error',
          { disableTimeOut: true }
        );
        this.isLoading = false;
      } else if(eventRegistrations.length == 1){
        this.setUserCookie(eventRegistrations[0]).pipe(take(1)).subscribe(reg => {this.router.navigate(['home'])});
        this.sessionService.currentUser = eventRegistrations[0];
        this.cookieService.set("REGISTERED_EVENTS", JSON.stringify(eventRegistrations));
        this.isLoading = false;
        this.router.navigate(['/home']);
      } else {
        this.cookieService.set("REGISTERED_EVENTS", JSON.stringify(eventRegistrations));
        this.isLoading = false;
        this.router.navigate(['/event-selector']);
      }

    } else {
      this.authService.findUser(email.toLowerCase()).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
        if (!result) {
          this.isLoading = false;
        } else {
          this.sessionService.currentUser = result;

          if (result.firebaseUID) {
            this.isLoading = false;
            this.router.navigate(['capture-password-form']);
          } else {
            this.isLoading = false;
            this.router.navigate(['create-auth-form']);
          }
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setUserCookie(registration: EventRegistrationModel){
    this.cookieService.set(COOKIE_NAME, JSON.stringify(registration), { expires: 3 });

    registration.loggedIn = true;

    this.eventRegistrationService.update(registration.id, registration);

    return this.authService.setUser(registration);
  }
}
