import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { SessionService } from '../../services/utils/session.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomerService } from 'impactdisciplescommon/src/services/data/customer.service';
import { AppUserService } from 'impactdisciplescommon/src/services/data/user.service';
import { environment } from 'src/environments/environment';

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
      let searchResults: Promise<any[]>;

      if(environment.application == 'admin'){
        searchResults = this.userService.getAllByValue('email', email);
      } else {
        searchResults = this.customerService.getAllByValue('email', email);
      }

      searchResults.then(customers => {
        if(customers.length == 0){
          this.tostrService.error('No account exists for this email.');

          this.router.navigate(['/']);

          this.isLoading = false;
        } else if(customers.length == 1){
          this.authService.createAccount(email, password).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
            if (result.isOk) {
              this.tostrService.success('Your account has been created. Please login using your new credentials.');

              this.sessionService.currentUser = null;

              this.router.navigate(['capture-username-form']);
            } else {
              this.tostrService.error('There was an error creating your account: ' + result.message);
            }
            this.isLoading = false;
          })
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
