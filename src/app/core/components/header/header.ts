// import { Component, inject, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Auth } from '../../../shared/services/auth.service';

// @Component({
//   selector: 'app-header',
//   imports: [CommonModule],
//   templateUrl: './header.html',
// })
// export class Header {
//     isModalOpen = false;
//   @Input({ required: true }) userImg: string = '';
//   username = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
//   user = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
//   name = this.user.name || 'Guest';
//   hd = this.user.hd || '';
//   email = this.user.email || '';
//   auth = inject(Auth);
//   navList = ['Home', 'Popular on Netflix' ,'TV Shows', 'Now Playing', 'Popular Movies', 'Top Rated','Upcoming Movies'];

//    toggleModal(state: boolean) {
//     this.isModalOpen = state;
//   }
//   scrollToSection(sectionId: string) {
//     if (sectionId === 'Home') {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       return;
//     }

//     const element = document.getElementById(sectionId);
//     if (element) {
//       const headerOffset = 70; 
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//     }
//   }
// }




import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class Header {
  isModalOpen = false;
  isMenuOpen = false; // Controls the mobile hamburger menu

  @Input({ required: true }) userImg: string = '';
  
  // Existing session logic
  user = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  username = this.user.name || 'User';
  name = this.user.name || 'Guest';
  hd = this.user.hd || '';
  email = this.user.email || '';
  
  auth = inject(Auth);
  navList = ['Home', 'TV Shows', 'Now Playing', 'Popular Movies', 'Top Rated', 'Upcoming Movies'];

  toggleModal(state: boolean) {
    this.isModalOpen = state;
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string) {
    this.isMenuOpen = false; // Close mobile menu after clicking
    
    if (sectionId === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 70; // Adjust for sticky header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
