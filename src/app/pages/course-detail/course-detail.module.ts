import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CourseDetailComponent } from './course-detail.component';

const routes: Routes = [{ path: '', component: CourseDetailComponent }];

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class CourseDetailModule {}
