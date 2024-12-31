import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['home/myprofile']);
  }
  goToPet(){
    this.router.navigate(['home/mypet']);
  }
  goToMypet(){
    this.router.navigate(['home/mypetreq']);
  }
  goToMyreq(){
    this.router.navigate(['home/ireq']);
  }
}
