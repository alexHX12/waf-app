import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SdkService } from '../sdk/sdk.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users:any;

  constructor(private http: HttpClient,public sdk:SdkService) { }

  ngOnInit(): void {
    this.sdk.getUsers().subscribe(res=>{
      this.users=res;
    });
  }

}
