import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public visible = false;

  constructor(public auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.auth.user$.subscribe((user) => {
      this.http.post("https://dev-fmeenf3n.us.auth0.com/dbconnections/change_password", {
        client_id: 'PQuVo6cmELKpqSWA8FhuQinoREXfufWU',
        email: user?.email,
        connection: 'Username-Password-Authentication'
      }, { headers: { 'content-type': 'application/json'},responseType:"text"}).subscribe((res)=>{
        this.toggleModal();
      })
    });
  }

  toggleModal(){
    this.visible = !this.visible;
  }
}
