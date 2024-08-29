import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChangePasswordFormComponent } from "./change-password-form/change-password-form.component";
import { ResetPasswordFormComponent } from "./reset-password-form/reset-password-form.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DxButtonModule, DxFileManagerModule, DxFormModule, DxLoadIndicatorModule, DxPopupModule, DxScrollViewModule, DxTabsModule, DxToolbarModule } from "devextreme-angular";
import { CaptureUsernameFormComponent } from "./capture-username-form/capture-username-form.component";
import { CapturePasswordFormComponent } from "./capture-password-form/capture-password-form.component";
import { CreateAuthFormComponent } from "./create-auth-form/create-auth-form.component";
import { LayoutsModule } from "../layouts/layouts.module";
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

@NgModule({
  declarations: [
    ChangePasswordFormComponent,
    CaptureUsernameFormComponent,
    CapturePasswordFormComponent,
    CreateAuthFormComponent,
    ResetPasswordFormComponent,
    ImageUploaderComponent
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
    ChangePasswordFormComponent,
    CaptureUsernameFormComponent,
    CapturePasswordFormComponent,
    CreateAuthFormComponent,
    ResetPasswordFormComponent,
    ImageUploaderComponent
  ]
})
export class ImpactFormsModule { }
