import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule,GridModule,HeaderModule,NavModule,DropdownModule} from '@coreui/angular';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ProfileComponent } from './profile/profile.component';
import { RulesComponent } from './rules/rules.component';
import { LoginComponent } from './login/login.component';
import { ViewLogComponent } from './view-log/view-log.component';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppLayoutComponent,
    AccountsComponent,
    ProfileComponent,
    RulesComponent,
    LoginComponent,
    ViewLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    IconModule,
    IconSetModule.forRoot(),
    GridModule,
    HeaderModule,
    NavModule,
    DropdownModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-fmeenf3n.us.auth0.com',
      clientId: 'PQuVo6cmELKpqSWA8FhuQinoREXfufWU'
    }),
  ],
  providers: [IconSetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
