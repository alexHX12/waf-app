import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { SdkService } from '../sdk/sdk.service';
import { ContainerInfoService } from '../container-info/container-info.service';
import { ConfirmationDialogService } from '../info-dialog/info-dialog.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  newRuleFormValidated=false;
  showSelectContainer=true;
  allRules:any;
  ruleName:string="";
  ruleDesc:string="";
  ruleText:string="";
  rulePhase:string="";
  ruleSeverity:string="";
  ruleAction:string="";

  constructor(public auth: AuthService,private http: HttpClient,public sdk:SdkService,public containerInfo:ContainerInfoService,public confirmationDialog:ConfirmationDialogService) { 
    
  }

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
    data['severity']=this.ruleSeverity;
    data['action']=this.ruleAction;
    data['container_id']=this.containerInfo.id;
    this.sdk.addRule(data).subscribe((res)=>{
      this.allRules.custom.push(res);
      this.confirmationDialog.openDefaultSuccess();
    },err=>{
      console.log("Regola non valida!");
      this.confirmationDialog.open("Errore","La regola inserita non è valida!");
    });
  }

  deleteRule(id:string,index:Number){
    this.sdk.deleteRule(id).subscribe(res=>{
      this.allRules.custom.splice(index,1);
      this.confirmationDialog.openDefaultSuccess();
    });
  }
}
