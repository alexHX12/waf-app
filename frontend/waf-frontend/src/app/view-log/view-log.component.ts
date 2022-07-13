import { Component, OnInit } from '@angular/core';
// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';
import { SdkService } from '../sdk/sdk.service';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.component.html',
  styleUrls: ['./view-log.component.css']
})
export class ViewLogComponent implements OnInit {
  logData: any;

  constructor(public auth: AuthService, private http: HttpClient,public sdk:SdkService) {
  }

  ngOnInit(): void {
    this.sdk.getLogs().subscribe(res=>{
      var tmp_array:any = res;
      this.logData=tmp_array.reverse();
    });
  }

}
