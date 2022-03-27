import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMsg = 'Please wait while we log you into application';
  alertColor = 'blue';
  hasSubmitted = false;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login() {
    try {
      this.showAlert = true;
      this.hasSubmitted = true;
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      console.log(error);
      this.alertColor = 'red';
      this.alertMsg = 'Failed to login. Please check your email and password';
      this.showAlert = true;
      return;
    } finally {
      this.hasSubmitted = false;
    }

    this.alertColor = 'green';
    this.alertMsg = 'You have been successfully authenticated.';
    this.showAlert = true;
  }
}
