import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DxFormModule, DxLoadIndicatorModule, DxScrollViewModule, DxTabsModule, DxToolbarModule } from "devextreme-angular";
import { LayoutModule } from "@angular/cdk/layout";
import { SingleCardComponent } from "./single-card/single-card.component";


@NgModule({
  declarations: [
    SingleCardComponent,
  ],
  imports: [
    // Neither BrowserModule nor BrowserAnimationsModule is imported here:
    // both are root-only (BrowserAnimationsModule itself re-exports
    // BrowserModule internally), and this module is pulled in by every
    // lazy-loaded feature module via ImpactDisciplesCommonModule - Angular
    // hard-errors (NG05100) if BrowserModule's providers get registered a
    // second time in a lazy injector. Neither was actually needed: nothing
    // in this app uses @angular/animations triggers, and DevExtreme has its
    // own animation engine independent of Angular's. CommonModule below
    // provides the directives (*ngIf, *ngFor, etc.) this module needs.
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
    SingleCardComponent
  ]
})
export class LayoutsModule { }
