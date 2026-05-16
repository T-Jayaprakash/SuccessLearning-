import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DestinationsComponent } from './destinations.component';
import { DestinationDetailComponent } from './destination-detail.component';

const routes: Routes = [
  { path: '', component: DestinationsComponent },
  { path: ':slug', component: DestinationDetailComponent },
];

@NgModule({
  declarations: [DestinationsComponent, DestinationDetailComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class DestinationsModule {}
