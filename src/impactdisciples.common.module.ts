import { NgModule } from '@angular/core';
import { FormsModule } from './forms/forms.module';
import { NotAuthorizedContainerComponent } from './forms/not-authorized-container';
import { UnauthenticatedContentComponent } from './forms/unauthenticated-content';

@NgModule({
  declarations: [

  ],
  imports: [
    FormsModule,
  ],
  providers: [
  ],
  exports: [
    UnauthenticatedContentComponent,
    NotAuthorizedContainerComponent,
  ]
})
export class ImpactDisciplesModule { }
