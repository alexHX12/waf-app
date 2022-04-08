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
  containerUser="";
  allUsers:any;

  constructor(private http: HttpClient,public sdk:SdkService) { }

  ngOnInit(): void {
    this.sdk.getContainers().subscribe(res=>{
      this.allContainers=res;
    });
    this.sdk.getUsers().subscribe(res=>{
      this.allUsers=res;
      console.log(this.allUsers);
    });
  }

  newContainer(event:any){
    this.newContainerFormValidated=true;
    var data:any={};
    data['domain']=this.containerDomain;
    data['url']=this.containerURL;
    data['user_id']=this.containerUser;
    console.log(data['user_id']);
    this.sdk.addContainer(data).subscribe((res:any)=>{
      res['user_id']={_id:res['user_id']};
      res['user_id'].email=event.target[2].options[event.target[2].options.selectedIndex].text;;
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
