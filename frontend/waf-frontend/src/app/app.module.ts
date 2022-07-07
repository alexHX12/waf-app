import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule,GridModule,HeaderModule,NavModule,DropdownModule,TableModule,CardModule,ModalModule,ButtonModule,FormModule} from '@coreui/angular';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { RulesComponent } from './rules/rules.component';
import { ViewLogComponent } from './view-log/view-log.component';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
// Import the injector module and the HTTP client module from Angular
import { HttpClientModule } from '@angular/common/http';

// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { ViewContainerComponent } from './view-container/view-container.component';
import { UsersComponent } from './users/users.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    ProfileComponent,
    RulesComponent,
    ViewLogComponent,
    ViewContainerComponent,
    UsersComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
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
    FormModule,
    FormsModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot(environment.clientID),
    HttpClientModule
  ],
  providers: [
    IconSetService,
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
