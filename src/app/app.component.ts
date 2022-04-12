/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Ranveer Singh Saini Student ID: 134213206 Date: 2022-03-26
*  
*  Angular App (Deployed) Link: https://seneca-app-web422.netlify.app/login
*
*  User API (Heroku) Link: https://sleepy-chamber-84621.herokuapp.com
*
********************************************************************************/ 
 
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  searchString: String = '';
  title = 'web422-a6';
  public token: any;
  constructor(private router: Router, private auth: AuthService) {}

  handleSearch(): void {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }
  
  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

