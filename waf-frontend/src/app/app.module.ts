import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule,GridModule,HeaderModule,NavModule,DropdownModule,TableModule,CardModule,ModalModule,ButtonModule} from '@coreui/angular';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ProfileComponent } from './profile/profile.component';
import { RulesComponent } from './rules/rules.component';
import { ViewLogComponent } from './view-log/view-log.component';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { ViewContainerComponent } from './view-container/view-container.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppLayoutComponent,
    AccountsComponent,
    ProfileComponent,
    RulesComponent,
    ViewLogComponent,
    ViewContainerComponent
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
    TableModule,
    CardModule,
    ModalModule,
    ButtonModule,
    BrowserAnimationsModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-fmeenf3n.us.auth0.com',
      clientId: 'PQuVo6cmELKpqSWA8FhuQinoREXfufWU',
      audience:'http://localhost:8080',
      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:8080/*',
            tokenOptions: {
              audience: 'http://localhost:8080'
            }
          }
        ]
      }
    }),
    HttpClientModule
  ],
  providers: [
    IconSetService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
