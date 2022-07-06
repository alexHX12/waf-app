import { Component, OnDestroy, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { cilGroup, cilUser, cilAccountLogout, cilMenu, cilShieldAlt, cilFire, cilFactory, cilWarning } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';
import { AuthService } from '@auth0/auth0-angular';
import { SdkService } from '../sdk/sdk.service';
import { ContainerInfoService } from '../container-info/container-info.service';
import { NavigationEnd, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
  providers: [IconSetService],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  localURL=environment.localURL;
  sidebarId: string = "sidebar";
  title = 'waf-frontend';
  navItems: INavData[] = [
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
    }
  ]

  navItemsAdmin: INavData[] = [
    {
      name: 'Utenti',
      url: '/users',
      iconComponent: { name: 'cil-group' }
    },
    {
      name: 'Visualizza container',
      url: '/viewcontainer',
      iconComponent: { name: 'cil-factory' }
    }
  ]
  containerArr: any;

  constructor(public iconSet: IconSetService, public auth: AuthService, public sdk: SdkService, public containerInfo: ContainerInfoService,public router:Router) {
    document.documentElement.style.height="100%";
    document.body.style.height="100%";
  }

  async ngOnInit() {
    // iconSet singleton
    this.iconSet.icons = { cilGroup, cilUser, cilAccountLogout, cilMenu, cilShieldAlt, cilFire, cilFactory, cilWarning };
    var user:any=await firstValueFrom(this.auth.user$);
    if (user != undefined) {
      this.sdk.isAdmin = user[environment.backendURL+'/roles'].includes("admin");
      var res2=await firstValueFrom(this.sdk.getContainers());
      this.containerArr=res2;
    }
  }
  
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  mySubscription:any;

  selectContainer(event: any) {
    if(event.target.value!="admin_rules"){
      this.containerInfo.id = event.target.value;
      this.containerInfo.domain = event.target.options[event.target.options.selectedIndex].text;
      this.sdk.containerId = this.containerInfo.id;
      this.sdk.adminMode=false;
    }else{
      this.containerInfo.id = "";
      this.containerInfo.domain = "";
      this.sdk.containerId = "";
      this.sdk.adminMode=true;
    }
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
    this.router.navigate([this.router.url]);
  }

}