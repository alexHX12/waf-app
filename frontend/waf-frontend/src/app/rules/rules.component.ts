import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  visible=false;
  newRuleFormValidated=false;
  allRules:any;
  ruleName:string="";
  ruleDesc:string="";
  ruleText:string="";
  rulePhase:string="";
  ruleAction:string="";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://api.localhost/rules").subscribe((res)=>{
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
    this.http.post("http://api.localhost/rules", data, { headers: { 'content-type': 'application/json'}}).subscribe((res)=>{
      this.allRules.custom.push(res);
        this.toggleModal();
      })
  }

  toggleModal(){
    this.visible = !this.visible;
  }

  deleteRule(id:string,index:Number){
    this.http.delete("http://api.localhost/rules/"+id).subscribe((res)=>{
        this.allRules.custom.splice(index,1);
        this.toggleModal();
      })
  }
}
