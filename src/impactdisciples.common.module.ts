import { NgModule } from '@angular/core';
import { FormsModule } from './forms/forms.module';
import { LayoutsModule } from './layouts/layouts.module';
import { SingleCardComponent } from './layouts/single-card/single-card.component';
import { UnauthenticatedContentComponent } from './forms/unauthenticated-content';
import { NotAuthorizedContainerComponent } from './forms/not-authorized-container';
import { PipesModule } from './pipes/pipes.module';
import { PhoneNumberMaskPipe } from './pipes/phone-number.pipe';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    LayoutsModule,
    PipesModule
  ],
  providers: [
  ],
  exports: [
    SingleCardComponent,
    UnauthenticatedContentComponent,
    NotAuthorizedContainerComponent,
    PhoneNumberMaskPipe
  ]
})
export class ImpactDisciplesModule { }
