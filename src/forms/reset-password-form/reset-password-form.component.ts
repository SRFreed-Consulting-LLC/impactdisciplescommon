import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services/utils/auth.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnDestroy {
  public isLoading: boolean = false;
  formData: any = {};

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.formData;
    this.isLoading = true;

    this.authService.resetPassword(email).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (result.isOk) {
        this.router.navigate(['/capture-username-form']);
        notify(notificationText, 'success', 2500);
      } else {
        notify(result.message, 'error', 2000);
      }
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
