import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selecteduser:User={
    fullname:'',
    email:'',
    password:""
  };
  noAuthHeader={headers:new HttpHeaders({'NoAuth':'True'})};

  constructor(private http :HttpClient) { }
  postUser(user:User){ 
    return  this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }
  login(authCredentials){
    return this.http.post(environment.apiBaseUrl+'/authenticate', authCredentials,this.noAuthHeader);
  }
  getUserProfile(){
    return this.http.get(environment.apiBaseUrl+'/userprofile');
  }
  setToken(token : string){
    localStorage.setItem('token' , token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  getUserPayload(){
    var token = this.getToken();
    if(token){
      var UserPayload=atob(token.split('.')[1]);
      return JSON.parse(UserPayload);
    }
    else{
      return null;
    }
  }
  isLoggedIn(){
    var UserPayload=this.getUserPayload();
    if(UserPayload){
      return UserPayload.exp > Date.now()/1000;
    }
    else{
      return false;
    }
  }
}
