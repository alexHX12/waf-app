import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { RulesComponent } from './rules/rules.component';
import { ViewLogComponent } from './view-log/view-log.component';
import { ViewContainerComponent } from './view-container/view-container.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes:Routes=[
  {
    path: '',
    redirectTo: 'rules',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path:'rules',
        component:RulesComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'viewlog',
        component:ViewLogComponent
      },
      {
        path:'accounts',
        component:AccountsComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'viewcontainer',
        component:ViewContainerComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'profile',
        component:ProfileComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
}
