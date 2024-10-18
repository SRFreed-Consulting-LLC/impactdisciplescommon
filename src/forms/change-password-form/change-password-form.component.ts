import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationCallbackData } from 'devextreme-angular/common';
import notify from 'devextreme/ui/notify';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-change-passsword-form',
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  formData: any = {};
  recoveryCode: string = '';

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recoveryCode = params.get('recoveryCode') || '';
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const { password } = this.formData;
    this.isLoading = true;

    this.authService.changePassword(password, this.recoveryCode).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      this.isLoading = false;
      if (result.isOk) {
        this.router.navigate(['/capture-username-form']);
      } else {
        notify(result.message, 'error', 2000);
      }
    })
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
