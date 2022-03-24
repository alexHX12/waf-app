import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';
import { cilSpeedometer,cilGroup,cilUser,cilAccountLogout,cilMenu,cilShieldAlt,cilFire } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
  providers: [IconSetService],
})
export class AppLayoutComponent {
  sidebarId: string = "sidebar";
  title = 'waf-frontend';
  navItems:INavData[]=[
    {
      name: 'Dashboard',
      url: '/dashboard',
      iconComponent: { name: 'cil-speedometer' }
    },
    {
      name: 'Gestisci regole',
      url: '/rules',
      iconComponent: { name: 'cil-shield-alt' }
    },
    {
      name: 'Visualizza log',
      url: '/viewlog',
      iconComponent: { name: 'cil-fire' }
    },
    {
      name: 'Account',
      url: '/accounts',
      iconComponent: { name: 'cil-group' }
    },
    {
      name: 'Gestisci profilo',
      url: '/profile',
      iconComponent: { name: 'cil-user' }
    },
    {
      name: 'Logout',
      url: '/login',
      iconComponent: { name: 'cil-account-logout' }
    },
  ]

  constructor(public iconSet: IconSetService) {
    // iconSet singleton
    iconSet.icons = { cilSpeedometer,cilGroup,cilUser,cilAccountLogout,cilMenu,cilShieldAlt,cilFire };
  }

}