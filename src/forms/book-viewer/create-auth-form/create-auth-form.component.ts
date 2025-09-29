import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'impactdisciplescommon/src/services/data/logger.service';
import notify from 'devextreme/ui/notify';
import { BookViewerAuthService } from '../book-viewer-auth.service';
import { ImpactUserService } from 'impactdisciplescommon/src/books/services/impact-user.service';

@Component({
  selector: 'app-create-auth-form',
  templateUrl: './create-auth-form.component.html',
  styleUrls: ['./create-auth-form.component.scss']
})
export class CreateAuthFormComponent {
  public isLoading: boolean = false;
  formData: any = {};

  constructor(private authService: BookViewerAuthService,
    private impactUserService: ImpactUserService,
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
      this.impactUserService.getAllByValue('email', email).then(users => {
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


}
