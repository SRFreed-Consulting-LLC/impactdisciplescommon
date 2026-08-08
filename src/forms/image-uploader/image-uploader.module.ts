import { NgModule } from "@angular/core";
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
    // Neither BrowserModule nor BrowserAnimationsModule imported here - see layouts.module.ts.
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
