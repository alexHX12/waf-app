import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  visible=false;
  ruleSet:any;
  ruleName:string="";
  ruleDesc:string="";
  ruleText:string="";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://api.localhost/rules").subscribe((res)=>{
      this.ruleSet=res;
    })
  }

  newRule(){
    var data:any={};
    data['name']=this.ruleName;
    data['desc']=this.ruleDesc;
    data['text']=this.ruleText;
    console.log(data);
    this.http.post("http://api.localhost/rules", data, { headers: { 'content-type': 'application/json'}}).subscribe((res)=>{
        this.toggleModal();
      })
  }

  toggleModal(){
    this.visible = !this.visible;
  }
}
