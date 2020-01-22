import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubUsersComponent } from './github-users/github-users.component';

const routes: Routes = [
  {
    path: '',
    component: GithubUsersComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
