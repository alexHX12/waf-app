import { Component, OnInit } from '@angular/core';
// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.component.html',
  styleUrls: ['./view-log.component.css']
})
export class ViewLogComponent implements OnInit {
  logData:any;

  constructor(public auth: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/log").subscribe((res)=>{
      this.logData=res;
    })
  }

}
