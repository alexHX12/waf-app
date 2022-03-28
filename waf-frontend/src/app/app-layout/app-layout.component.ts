import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';
import { cilSpeedometer,cilGroup,cilUser,cilAccountLogout,cilMenu,cilShieldAlt,cilFire,cilFactory } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';
import { AuthService } from '@auth0/auth0-angular';

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
      name: 'Gestisci profilo',
      url: '/profile',
      iconComponent: { name: 'cil-user' }
    },
    {
      name: 'Account',
      url: '/accounts',
      iconComponent: { name: 'cil-group' }
    },
    {
      name: 'Visualizza container',
      url: '/viewcontainer',
      iconComponent: { name: 'cil-factory' }
    }
  ]

  constructor(public iconSet: IconSetService,public auth: AuthService) {
    // iconSet singleton
    iconSet.icons = { cilSpeedometer,cilGroup,cilUser,cilAccountLogout,cilMenu,cilShieldAlt,cilFire,cilFactory };
  }

}