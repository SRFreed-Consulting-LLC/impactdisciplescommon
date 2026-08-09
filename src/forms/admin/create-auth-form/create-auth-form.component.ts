import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppUserService } from 'impactdisciplescommon/src/services/data/user.service';
import { LoggerService } from 'impactdisciplescommon/src/services/data/logger.service';
import { notify } from '../../../utils/notify.util';
import { AdminAuthService } from '../admin-auth.service';

@Component({
    selector: 'app-create-auth-form',
    templateUrl: './create-auth-form.component.html',
    styleUrls: ['./create-auth-form.component.scss'],
    standalone: false
})
export class CreateAuthFormComponent implements OnDestroy {
  public isLoading: boolean = false;
  formData: any = {};

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AdminAuthService,
    private userService: AppUserService,
    private router: Router,
    public loggerService: LoggerService) { }

  onSubmit(e: Event) {
    e.preventDefault();
    const { email, password, password2 } = this.formData;
    this.isLoading = true;

    if (password != password2) {
      this.isLoading = false;

      notify({
        message: 'Passwords do not match. Please try again.',
        position: 'top',
        type: 'success'
      });

    } else {
      this.userService.getAllByValue('email', email).then(users => {
        if(users.length == 0){
          this.loggerService.logMessage('Create Admin Account', email, 'Tried to setup Admin account for (' + email + '). This email is not recognized. Setup Admin Account first.', []);

          notify({
            message: 'No account exists for this email.',
            position: 'top',
            type: 'error'
          });

          this.router.navigate(['/']);

          this.isLoading = false;
        } else if(users.length == 1){
          if(users[0].firebaseUID){
            notify({
              message: 'An account for ' + email + ' had already been setup!. Try logging in with this email address!',
              position: 'top',
              type: 'error'
            });

            this.router.navigate(['capture-username-form']);
          } else {
            try{
              this.authService.createAccount(email, password).then((result) => {
                if (result.isOk) {
                  notify({
                    message: 'Your account has been created. Please login using your new credentials.',
                    position: 'top',
                    type: 'success'
                  });

                  this.router.navigate(['capture-username-form']);
                } else {
                  if(result.message && result.message.message == "Firebase: Error (auth/email-already-in-use)."){
                    notify({
                      message: 'A login account for this email already exists. Please have an Admin copy the firebaseUID over to your Customer Account.',
                      position: 'top',
                      type: 'error'
                    });

                    this.loggerService.logMessage('Create Admin Account', email, 'Error setting up Admin for (' + email + '). Firebase: Error (auth/email-already-in-use).', []);
                  } else {
                    notify({
                      message: 'There was an error creating your account: ' + result.message,
                      position: 'top',
                      type: 'error'
                    });

                    this.loggerService.logMessage('Create Admin Account', email, 'Error setting up Admin for (' + email + '). ' + result.message, []);
                  }
                }
                this.isLoading = false;
              })
            } catch (err){
              console.log(err)
            }
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
