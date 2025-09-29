import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DxButtonModule, DxFileManagerModule, DxFormModule, DxLoadIndicatorModule, DxPopupModule, DxScrollViewModule, DxTabsModule, DxToolbarModule } from "devextreme-angular";
import { LayoutsModule } from "impactdisciplescommon/src/layouts/layouts.module";
import { ChangePasswordFormComponent } from "./change-password-form/change-password-form.component";
import { CaptureUsernameFormComponent } from "./capture-username-form/capture-username-form.component";
import { CapturePasswordFormComponent } from "./capture-password-form/capture-password-form.component";
import { CreateAuthFormComponent } from "./create-auth-form/create-auth-form.component";
import { ResetPasswordFormComponent } from "./reset-password-form/reset-password-form.component";

@NgModule({
  declarations: [
    ChangePasswordFormComponent,
    CaptureUsernameFormComponent,
    CapturePasswordFormComponent,
    CreateAuthFormComponent,
    ResetPasswordFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    LayoutsModule,
    DxButtonModule,
    DxFileManagerModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxPopupModule,
    DxLoadIndicatorModule,
    DxScrollViewModule,
    DxTabsModule,
    DxToolbarModule
  ],
  providers: [
  ],
  exports: [
    CaptureUsernameFormComponent,
    CapturePasswordFormComponent,
    ChangePasswordFormComponent,
    CreateAuthFormComponent,
    ResetPasswordFormComponent
  ]
})
export class ImpactAdminFormsModule { }
