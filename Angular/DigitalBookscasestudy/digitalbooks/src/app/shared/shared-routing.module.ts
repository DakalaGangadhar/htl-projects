import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReaderModule } from '../reader/reader.module';

const routes: Routes = [
  { path: 'reader', loadChildren: () => import('../reader/reader.module').then(m => m.ReaderModule) },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
