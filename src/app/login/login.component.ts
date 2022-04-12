import { Component, OnInit } from '@angular/core';
import User  from '../User';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {userName: "", password: "", _id:""};
  warning: String="";
  loading: Boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.user.userName == "") {
      this.loading = false;
      this.warning = "User Name must not be empty";
    } else if (this.user.password == "") {
      this.loading = false;
      this.warning = "Password must not be empty";
    } else {
      this.loading = true;
      this.auth.login(this.user).subscribe({
        next: (success)=>{
          this.loading=false;
          localStorage.setItem('access_token', `${success.token}`);
          this.router.navigate(['/newReleases']);
        }})
    };
  };
}
