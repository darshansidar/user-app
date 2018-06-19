import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



import { User } from './user';

interface mydata{
  users:Array<any>;
}

interface Person{
  lastName : string,
  firstName : string,
  email : string,
  mobileNumber : string,
  type: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'List of Users';

private apiUrl = 'http://www.mocky.io/v2/5b28f2832f00005400f55f61';
data:Array<Person> = [];


constructor(private http: HttpClient){

  console.log("Hello");

  this.getData();
  this.getDetails();
}

getData(){
   return this.http.get(this.apiUrl)
}

getDetails(){
   this.getData().subscribe((data)=> {
        var obj = <mydata> data;
       obj.users.map((user)=>{
        if(user.firstName && user.lastName && user.email){

           var per = {lastName:user.lastName,firstName:user.firstName,email:user.email,mobileNumber:user.mobile,type:user.type}
         this.data.push(per);
        }
       
     
       
       });
      })

}

}
