import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';
import { cilSpeedometer,cilGroup,cilUser,cilAccountLogout } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [IconSetService],
})
export class AppComponent {
  title = 'waf-frontend';
  navItems:INavData[]=[
    {
      name: 'Dashboard',
      url: '/dashboard',
      iconComponent: { name: 'cil-speedometer' }
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
      url: '/logout',
      iconComponent: { name: 'cil-account-logout' }
    },
  ]

  constructor(public iconSet: IconSetService) {
    // iconSet singleton
    iconSet.icons = { cilSpeedometer,cilGroup,cilUser,cilAccountLogout };
  }
}
