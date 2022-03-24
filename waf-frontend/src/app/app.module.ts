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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppLayoutComponent,
    AccountsComponent,
    ProfileComponent,
    RulesComponent
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
    DropdownModule
  ],
  providers: [IconSetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
