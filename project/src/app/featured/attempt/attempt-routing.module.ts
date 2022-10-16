import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttemptPage } from './attempt.page';


const routes: Routes = [
  {
    path: '', component: AttemptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttemptRoutingModule { }
