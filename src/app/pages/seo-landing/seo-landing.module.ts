import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SeoLandingComponent } from './seo-landing.component';
const routes: Routes = [{ path: '', component: SeoLandingComponent }];
@NgModule({ declarations: [SeoLandingComponent], imports: [SharedModule, RouterModule.forChild(routes)] })
export class SeoLandingModule {}
