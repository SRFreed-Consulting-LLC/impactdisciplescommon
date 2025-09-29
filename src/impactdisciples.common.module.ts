import { NgModule } from '@angular/core';
import { LayoutsModule } from './layouts/layouts.module';
import { SingleCardComponent } from './layouts/single-card/single-card.component';
import { PipesModule } from './pipes/pipes.module';
import { PhoneNumberMaskPipe } from './pipes/phone-number.pipe';

@NgModule({
  declarations: [
  ],
  imports: [
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
