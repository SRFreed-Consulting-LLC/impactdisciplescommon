import { NgModule } from '@angular/core';
import { FormsModule } from './forms/forms.module';
import { LayoutsModule } from './layouts/layouts.module';
import { SingleCardComponent } from './layouts/single-card/single-card.component';
import { RootComponent } from './layouts/root/root.component';
import { UnauthenticatedContentComponent } from './forms/unauthenticated-content';
import { NotAuthorizedContainerComponent } from './forms/not-authorized-container';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    LayoutsModule
  ],
  providers: [
  ],
  exports: [
    SingleCardComponent,
    RootComponent,
    UnauthenticatedContentComponent,
    NotAuthorizedContainerComponent
  ]
})
export class ImpactDisciplesModule { }
