import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class Header {

  @Input({required: true}) userImg: string = '';
  username = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  auth = inject(Auth);
  navList = ["Home", "TV Shows", "News & Popular", "My List", "Browse by Language"]

}
