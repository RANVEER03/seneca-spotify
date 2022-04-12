import { Component, OnInit } from '@angular/core';
import  RegisterUser  from '../RegisterUser';
import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = {userName: "", password: "", password2: ""};
  warning: String="";
  success: Boolean = false;
  loading: Boolean = false;

  constructor(private auth: AuthService) { } //, private router: Router

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerUser.userName == "") {
      this.success = false;
      this.loading = false;
      this.warning = "User Name must not be empty";
    } else if (this.registerUser.password == "" || this.registerUser.password2 == "") {
      this.success = false;
      this.loading = false;
      this.warning = "Passwords must not be empty";
    } else if (this.registerUser.password != this.registerUser.password2) {
      this.success = false;
      this.loading = false;
      this.warning = "Passwords must match";
    } else {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe((msg) => {
        console.log(msg);
        this.success = true;
        this.loading = false;
        this.warning = '';
      }, (err) => {
        console.log(err);
        this.success = false;
        this.loading = false;
        this.warning = err.error.message;
      });
    };
  };
}
