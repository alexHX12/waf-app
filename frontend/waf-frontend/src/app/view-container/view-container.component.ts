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
  allContainers:any;
  containerDomain="";
  containerURL="";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://api.localhost/containers").subscribe((res)=>{
        this.allContainers=res;
      })
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

  deleteContainer(){
    this.http.delete("http://api.localhost/containers").subscribe((res)=>{
        this.toggleModal();
      })
  }

}
