import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: any = null; // Holds user details
  userFirstLetter: string = ''; // Stores the first letter of the user's name
  dropdownOpen: boolean = false; // Tracks dropdown state
  isAdmin: boolean = false; // Tracks admin status

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getUserData();
      this.isAdmin = this.user?.role === 'admin'; // Assuming role is part of user data
      this.userFirstLetter = this.user?.name?.charAt(0).toUpperCase() || ''; // Extract and capitalize the first letter
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onLogout(): void {
    this.authService.clearAuth();
    this.router.navigate(['/home']);
  }
}