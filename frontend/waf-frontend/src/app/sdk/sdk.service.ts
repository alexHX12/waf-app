import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SdkService {
  private url = environment.backendURL;
  public isAdmin: boolean = false;
  public adminMode:boolean=false;
  public containerId:string="";

  constructor(public auth: AuthService,private http: HttpClient){
  }

  private checkAdmin(path:string){
    var res=path;
    if(this.adminMode||(this.isAdmin&&path=="/containers")){
      res="/admin"+path;
    }else if(path!="/containers"){
      res="/containers/"+this.containerId+path;
    }
    return res;
  }

  private sendData(path:string, data:any) {
    path=this.checkAdmin(path);
    return this.http.post(this.url+path,JSON.stringify(data),{headers: {'Content-Type': 'application/json'}});
  }

  private getData(path:string) {
    path=this.checkAdmin(path);
    return this.http.get(this.url + path);
  }

  private updateData(path:string, data:any) {
    path=this.checkAdmin(path);
    return this.http.patch(this.url+path,JSON.stringify(data),{headers: {'Content-Type': 'application/json'}});
  }

  private deleteData(path:string) {
    path=this.checkAdmin(path);
    return this.http.delete(this.url + path);
  }

  public getRules(){
    return this.getData("/rules");
  }

  public addRule(data:any){
    return this.sendData("/rules",data);
  }

  public deleteRule(id:string){
    return this.deleteData("/rules/"+id);
  }

  public getContainers(){
    return this.getData("/containers");
  }

  public addContainer(data:any){
    return this.sendData("/containers",data);
  }

  public deleteContainer(id:string){
    return this.deleteData("/containers/"+id);
  }

  public getLogs(){
    return this.getData("/logs");
  }

  public getUsers(){
    return this.getData("/users");
  }
}
