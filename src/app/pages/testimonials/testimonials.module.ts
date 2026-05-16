import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TestimonialsComponent } from './testimonials.component';
const routes: Routes = [{ path: '', component: TestimonialsComponent }];
@NgModule({ declarations: [TestimonialsComponent], imports: [SharedModule, RouterModule.forChild(routes)] })
export class TestimonialsModule {}
