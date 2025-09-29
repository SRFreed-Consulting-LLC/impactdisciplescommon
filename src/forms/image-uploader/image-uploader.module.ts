import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DxButtonModule, DxFileManagerModule, DxFormModule, DxLoadIndicatorModule, DxPopupModule } from "devextreme-angular";
import { LayoutsModule } from "impactdisciplescommon/src/layouts/layouts.module";
import { ImageUploaderComponent } from "./image-uploader.component";

@NgModule({
  declarations: [
    ImageUploaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    LayoutsModule,
    DxButtonModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxFileManagerModule,
    DxPopupModule
  ],
  providers: [
  ],
  exports: [
    ImageUploaderComponent
  ]
})
export class ImageUploaderModule { }
