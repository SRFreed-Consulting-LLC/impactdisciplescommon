import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DxFormModule, DxLoadIndicatorModule, DxScrollViewModule, DxTabsModule, DxToolbarModule } from "devextreme-angular";
import { LayoutModule } from "@angular/cdk/layout";
import { RootComponent } from "./root/root.component";
import { SingleCardComponent } from "./single-card/single-card.component";


@NgModule({
  declarations: [
    RootComponent,
    SingleCardComponent,
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
    SingleCardComponent,
    RootComponent
  ]
})
export class LayoutsModule { }
