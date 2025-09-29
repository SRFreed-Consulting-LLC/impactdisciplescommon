import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DxButtonModule, DxFileManagerModule, DxFormModule, DxLoadIndicatorModule, DxPopupModule, DxScrollViewModule, DxTabsModule, DxToolbarModule } from "devextreme-angular";
import { CaptureUsernameFormComponent } from "./capture-username-form/capture-username-form.component";
import { LayoutsModule } from "impactdisciplescommon/src/layouts/layouts.module";

@NgModule({
  declarations: [
    CaptureUsernameFormComponent
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
    CaptureUsernameFormComponent
  ]
})
export class ImpactEventsFormsModule { }
