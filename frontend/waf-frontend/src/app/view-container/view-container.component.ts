import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.css']
})
export class ViewContainerComponent implements OnInit {
  visible=false;
  newContainerFormValidated=false;
  containerDomain="";
  containerURL="";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  newContainer(){
    this.newContainerFormValidated=true;
    var data:any={};
    data['domain']=this.containerDomain;
    data['url']=this.containerURL;
    this.http.post("http://api.localhost/containers", data, { headers: { 'content-type': 'application/json'}}).subscribe((res)=>{
        this.toggleModal();
      })
  }

  toggleModal(){
    this.visible = !this.visible;
  }

}
