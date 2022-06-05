import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  disabled: boolean = false;
  accessDenied: boolean = false;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: ['', []],
  });


  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.accessDenied = false;
    this.submitted = true;

    if (!this.loginForm.valid) {
      return;
    }

    this.disabled = true;
    
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        if(response.status === 'success'){
          this.router.navigate(['dashboard']);
          this.authService.setLoggedInStatus(true);
          this.authService.saveToken(response.data.access_token);
        }
      },
      (errorResponse) => {
        this.accessDenied = true;
        this.disabled = false;
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }
  
}
