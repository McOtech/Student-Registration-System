import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'members/create',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'members/:id',
    component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'members/:id/refresh',
    component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'members/:id/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/members',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
