import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { SessionService } from '../../services/utils/session.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomerService } from 'impactdisciplescommon/src/services/data/customer.service';
import { AppUserService } from 'impactdisciplescommon/src/services/data/user.service';
import { environment } from 'src/environments/environment';
import { LoggerService } from 'impactdisciplescommon/src/services/data/logger.service';
import { CustomerModel } from 'impactdisciplescommon/src/models/domain/utils/customer.model';

@Component({
  selector: 'app-create-auth-form',
  templateUrl: './create-auth-form.component.html',
  styleUrls: ['./create-auth-form.component.scss']
})
export class CreateAuthFormComponent implements OnDestroy {
  public isLoading: boolean = false;
  formData: any = {};

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService,
    private customerService: CustomerService,
    private userService: AppUserService,
    private router: Router,
    public loggerService: LoggerService,
    private sessionService: SessionService,
    public tostrService: ToastrService) { }

  onSubmit(e: Event) {
    e.preventDefault();
    const { email, password, password2 } = this.formData;
    this.isLoading = true;

    if (password != password2) {
      this.isLoading = false;
      this.tostrService.error('Passwords do not match. Please try again.');
    } else {
      if(environment.application == 'admin'){
        this.userService.getAllByValue('email', email).then(users => {
          if(users.length == 0){
            this.loggerService.logMessage('Create Admin Account', email, 'Tried to setup Admin account for (' + email + '). This email is not recognized. Setup Admin Account first.', []);

            this.tostrService.error('No account exists for this email.');

            this.router.navigate(['/']);

            this.isLoading = false;
          } else if(users.length == 1){
            if(users[0].firebaseUID){
              this.tostrService.success('An account for ' + email + ' had already been setup!. Try logging in with this email address!');

              this.router.navigate(['capture-username-form']);
            } else {
              try{
                this.authService.createAccount(email, password).then((result) => {
                  if (result.isOk) {
                    this.tostrService.success('Your account has been created. Please login using your new credentials.');

                    this.sessionService.currentUser = null;

                    this.router.navigate(['capture-username-form']);
                  } else {
                    if(result.message && result.message.message == "Firebase: Error (auth/email-already-in-use)."){
                      this.tostrService.error('A login account for this email already exists. Please have an Admin copy the firebaseUID over to your Customer Account.');

                      this.loggerService.logMessage('Create Admin Account', email, 'Error setting up Admin for (' + email + '). Firebase: Error (auth/email-already-in-use).', []);
                    } else {
                      this.tostrService.error('There was an error creating your account: ' + result.message);

                      this.loggerService.logMessage('Create Admin Account', email, 'Error setting up Admin for (' + email + '). ' + result.message, []);
                    }
                  }
                  this.isLoading = false;
                })
              } catch (err){
                console.log("error")
                console.log(err)
              }
            }
          }
        });
      } else {
        this.customerService.getAllByValue('email', email).then(customers => {
          if(customers.length == 0){
            let customer: CustomerModel = new CustomerModel();
            customer.email = email;

            this.customerService.add({...customer}).then(customer => {
              this.authService.createAccount(email, password).then((result) => {
                if (result.isOk) {
                  this.tostrService.success('Your account has been created! Please login.');
                  this.router.navigate(['/capture-username-form']);
                } else {
                  if(result.message && result.message.message == "Firebase: Error (auth/email-already-in-use)."){
                    this.tostrService.error('A login account for this email already exists. Please have an Admin copy the firebaseUID over to your Customer Account.');

                    this.loggerService.logMessage('Create User Account', email, 'Error setting up User for (' + email + '). Firebase: Error (auth/email-already-in-use).', []);
                  } else {
                    this.tostrService.error('There was an error creating your account: ' + result.message);

                    this.loggerService.logMessage('Create User Account', email, 'Error setting up User for (' + email + '). ' + result.message, []);
                  }
                }
                this.isLoading = false;

                this.router.navigate(['/']);
              });
            })
          } else if(customers.length == 1){
            this.tostrService.success('An account for ' + email + ' had already been created!. Try logging in with this email address!');

            this.router.navigate(['capture-username-form']);
            }
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
