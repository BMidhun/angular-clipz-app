import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService) {
    // this.regForm.controls.name // Abstract Control
  }

  hasSubmitted = false;

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(100),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  phone_number = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phone_number: this.phone_number,
  });

  showAlert = false;
  alertColor = 'blue';
  alertMessage = 'Lorem Ipsum';

  // regForm = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   email: new FormControl(''),
  //   age: new FormControl(''),
  //   password: new FormControl(''),
  //   confirm_password: new FormControl(''),
  //   phone_number: new FormControl(''),
  // });

  ngOnInit(): void {}

  async register() {
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait until we complete the registration.';
    this.showAlert = true;
    this.hasSubmitted = true;
    const [uemail, upassword] = [this.email.value, this.password.value];
    try {
      const userData = {
        email: this.email.value,
        age: this.age.value,
        phone_number: this.phone_number.value,
        name: this.name.value,
        password: this.password.value,
      };
      await this.auth.createUser(userData);
    } catch (e) {
      this.alertColor = 'red';
      this.alertMessage = 'Sorry! Something went wrong. Please try again.';
      return;
    } finally {
      this.hasSubmitted = false;
    }

    this.alertColor = 'green';
    this.alertMessage =
      'Your account has been created successfully. You will be redirected to your account soon.';
  }
}
