
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  username = '';
  password = '';

  message = '';
  messageType = '';

  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {

    if (!this.username || !this.password) {
      this.message = 'Please enter username and password';
      this.messageType = 'danger';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.authService.login({
      username: this.username,
      password: this.password,
      grant_type: 'password',
      client_id: 'acs_apis_client_api'
    }).subscribe({

      next: () => {
        this.isLoading = false;
        this.router.navigate(['/participants']);
      },

      error: (error) => {
        this.isLoading = false;
        this.message =
          error.error?.message || 'Invalid username or password';
        this.messageType = 'danger';
      }

    });
  }
}
