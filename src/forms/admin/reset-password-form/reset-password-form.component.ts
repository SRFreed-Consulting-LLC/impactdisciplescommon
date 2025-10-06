import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import {  Subject, takeUntil } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnDestroy {
  public isLoading: boolean = false;
  formData: any = {};

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AdminAuthService, private router: Router) { }

  onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.formData;
    this.isLoading = true;

    // this.authService.resetPassword(email).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
    //   if (result.isOk) {
    //     this.router.navigate(['/capture-username-form']);
    //     notify('We\'ve sent a link to reset your password. Check your inbox.', 'success', 2500);
    //   } else {
    //     notify(result.message, 'error', 2000);
    //   }
    // })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
