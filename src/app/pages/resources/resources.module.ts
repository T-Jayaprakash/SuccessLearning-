import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ResourcesComponent } from './resources.component';
const routes: Routes = [{ path: '', component: ResourcesComponent }];
@NgModule({ declarations: [ResourcesComponent], imports: [SharedModule, RouterModule.forChild(routes)] })
export class ResourcesModule {}
