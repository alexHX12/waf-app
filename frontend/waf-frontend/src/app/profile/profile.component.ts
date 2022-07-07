import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SdkService } from '../sdk/sdk.service';
import { ConfirmationDialogService } from '../info-dialog/info-dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public containerArr:any;

  constructor(public auth: AuthService, private http: HttpClient,public sdk:SdkService,public confirmationDialog:ConfirmationDialogService) { }

  ngOnInit(): void {
    this.sdk.getContainers().subscribe(res=>{
      this.containerArr=res;
    });
  }

  changePassword() {
    this.auth.user$.subscribe((user) => {
      this.http.post("https://"+environment.clientID.domain+"/dbconnections/change_password", {
        client_id: environment.clientID.clientId,
        email: user?.email,
        connection: 'Username-Password-Authentication'
      }, { headers: { 'content-type': 'application/json'},responseType:"text"}).subscribe((res)=>{
        this.confirmationDialog.openDefaultSuccess();
      })
    });
  }
}
