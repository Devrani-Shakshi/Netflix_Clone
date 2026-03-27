import { Component, inject } from '@angular/core';
import { Auth } from '../../Services/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   auth = inject(Auth) ;
   name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name ; 
   userProfilePNG  = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture; 
    hd  = JSON.parse(sessionStorage.getItem("loggedInUser")!).hd; 
    email  = JSON.parse(sessionStorage.getItem("loggedInUser")!).email; 

  Signout(){
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }
}
