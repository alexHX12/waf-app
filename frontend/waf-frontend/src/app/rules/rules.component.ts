import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { SdkService } from '../sdk/sdk.service';
import { ContainerInfoService } from '../container-info/container-info.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  visible=false;
  newRuleFormValidated=false;
  showSelectContainer=true;
  allRules:any;
  ruleName:string="";
  ruleDesc:string="";
  ruleText:string="";
  rulePhase:string="";
  ruleAction:string="";

  constructor(public auth: AuthService,private http: HttpClient,public sdk:SdkService,public containerInfo:ContainerInfoService) { }

  ngOnInit(): void {
    this.sdk.getRules().subscribe(res=>{
      this.allRules=res;
    })
  }

  newRule(){
    this.newRuleFormValidated=true;
    var data:any={};
    data['name']=this.ruleName;
    data['desc']=this.ruleDesc;
    data['text']=this.ruleText;
    data['phase']=this.rulePhase;
    data['action']=this.ruleAction;
    data['container_id']=this.containerInfo.id;
    this.sdk.addRule(data).subscribe((res)=>{
      this.allRules.custom.push(res);
      this.toggleModal();
    });
  }

  toggleModal(){
    this.visible = !this.visible;
  }

  deleteRule(id:string,index:Number){
    this.sdk.deleteRule(id).subscribe(res=>{
      this.allRules.custom.splice(index,1);
      this.toggleModal();
    });
  }
}
