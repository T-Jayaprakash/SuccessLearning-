import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CoursesComponent } from './courses.component';

const routes: Routes = [{ path: '', component: CoursesComponent }];

@NgModule({
  declarations: [CoursesComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class CoursesModule {}
