import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SdkService } from '../sdk/sdk.service';

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

  constructor(private http: HttpClient,public sdk:SdkService) { }

  ngOnInit(): void {
    this.sdk.getContainers().subscribe(res=>{
      this.allContainers=res;
    });
  }

  newContainer(){
    this.newContainerFormValidated=true;
    var data:any={};
    data['domain']=this.containerDomain;
    data['url']=this.containerURL;
    this.sdk.addContainer(data).subscribe(res=>{
      this.allContainers.push(res);
      this.toggleModal();
    });
  }

  toggleModal(){
    this.visible = !this.visible;
  }

  deleteContainer(id:string,index:Number){
    this.sdk.deleteContainer(id).subscribe(res=>{
      this.allContainers.splice(index,1);
      this.toggleModal();
    });
  }

}
