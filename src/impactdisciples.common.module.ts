import { NgModule } from '@angular/core';
import { ImpactFormsModule } from './forms/forms.module';
import { LayoutsModule } from './layouts/layouts.module';
import { SingleCardComponent } from './layouts/single-card/single-card.component';
import { PipesModule } from './pipes/pipes.module';
import { PhoneNumberMaskPipe } from './pipes/phone-number.pipe';

@NgModule({
  declarations: [
  ],
  imports: [
    ImpactFormsModule,
    LayoutsModule,
    PipesModule
  ],
  providers: [
  ],
  exports: [
    SingleCardComponent,
    PhoneNumberMaskPipe
  ]
})
export class ImpactDisciplesModule { }
