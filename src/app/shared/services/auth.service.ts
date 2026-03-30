declare var google: any;
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
router = inject(Router);
constructor() { }

signOut(){
  google.accounts.id.disableAutoSelect();
  this.router.navigate(['/'])
}

}


// @Injectable({ providedIn: 'root' })
// export class Auth {
//   private router = inject(Router);

//   // Initialize once in the constructor or via a dedicated method
//   initGoogleLogin() {
//     google.accounts.id.initialize({
//       client_id: '770489672730-nvuh6kjnmml6q17mlg00besagautjflk.apps.googleusercontent.com',
//       callback: (resp: any) => this.handleLogin(resp),
//       ux_mode: 'redirect', // RECOMMENDED: Solves the COOP/Cross-Origin error
//     });
//   }

//   handleLogin(response: any) {
//     const payload = JSON.parse(atob(response.credential.split(".")[1]));
//     sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
//     this.router.navigate(['Home']);
//   }

//   signOut() {
//     google.accounts.id.disableAutoSelect();
//     sessionStorage.removeItem("loggedInUser");
//     this.router.navigate(['/']);
//   } }

