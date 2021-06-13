import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})

export class HeaderComponent implements OnInit {
  background: boolean = true;
  checkBack: boolean = true;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url == '/home') {
          this.background = true;
          this.checkBack = true;
        }
        else {
          this.background = false;
          this.checkBack = false;
        }
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (this.checkBack && window.pageYOffset > 200) {
      this.background = false;
    }
    if (this.checkBack && window.pageYOffset < 200) {
      this.background = true;
    }

  }

}