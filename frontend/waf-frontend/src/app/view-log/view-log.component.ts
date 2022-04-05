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
  logData: any;

  constructor(public auth: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get("http://api.localhost/logs").subscribe((res) => {
      this.logData = res;
      this.logData.forEach((el: any) => {
        var datetime = Array(2);
        var time = el.transaction.time;
        datetime[0] = time.substring(0, time.indexOf(':'));
        datetime[1] = time.substring(time.indexOf(':') + 1).split('.')[0]+" GMT+0";
        el.transaction.time=datetime;
      });
      this.logData=this.logData.filter((el:any)=>el.audit_data.messages!=undefined);//Non considero errori generici
    })
  }

}
