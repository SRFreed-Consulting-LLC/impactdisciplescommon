import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import notify from 'devextreme/ui/notify';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-capture-password-form',
  templateUrl: './capture-password-form.component.html',
  styleUrls: ['./capture-password-form.component.scss']
})
export class CapturePasswordFormComponent implements OnDestroy {
  loginEmail: string = '';
  loginPassword: any = {};
  public isLoading: boolean = false;

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AdminAuthService) { }

  onSubmit(e: Event) {
    e.preventDefault();
    const { password } = this.loginPassword;
    this.isLoading = true;

    this.loginEmail = this.authService.user?.email;

    this.authService.logIn(this.loginEmail, password).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (!result.isOk) {
        notify({
          message: 'There was an error trying to log in: ' + result.message,
          position: 'top',
          type: 'error'
        });
      }

      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
