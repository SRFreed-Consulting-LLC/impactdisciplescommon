import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChangePasswordFormComponent } from "./change-password-form/change-password-form.component";
import { ResetPasswordFormComponent } from "./reset-password-form/reset-password-form.component";
import { UnauthenticatedContentComponent } from "./unauthenticated-content";
import { NotAuthorizedContainerComponent } from "./not-authorized-container";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DxFormModule, DxLoadIndicatorModule, DxScrollViewModule, DxTabsModule, DxToolbarModule } from "devextreme-angular";
import { CaptureUsernameFormComponent } from "./capture-username-form/capture-username-form.component";
import { CapturePasswordFormComponent } from "./capture-password-form/capture-password-form.component";
import { CreateAuthFormComponent } from "./create-auth-form/create-auth-form.component";
import { LayoutModule } from "@angular/cdk/layout";
import { RootComponent } from "./root/root.component";
import { SingleCardComponent } from "./single-card/single-card.component";

@NgModule({
  declarations: [
    ChangePasswordFormComponent,
    CaptureUsernameFormComponent,
    CapturePasswordFormComponent,
    CreateAuthFormComponent,
    ResetPasswordFormComponent,
    RootComponent,
    SingleCardComponent,
    UnauthenticatedContentComponent,
    NotAuthorizedContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    LayoutModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxLoadIndicatorModule,
    DxScrollViewModule,
    DxTabsModule,
    DxToolbarModule
  ],
  providers: [
  ],
  exports: [
    ChangePasswordFormComponent,
    ResetPasswordFormComponent,
    UnauthenticatedContentComponent,
    NotAuthorizedContainerComponent
  ]
})
export class FormsModule { }
