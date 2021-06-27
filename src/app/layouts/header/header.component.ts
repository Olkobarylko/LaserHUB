import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})

export class HeaderComponent implements OnInit {
  background: boolean = true;
  checkBack: boolean = true;
  basket: Array<any> = [];
  totalPrice = 0;
  constructor(private router: Router, private basketService: BasketService) {
    this.checkBasket();
    this.getLocalStotage();
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
  checkBasket(): void {
    this.basketService.changeBusket$.subscribe(() => {
      this.getLocalStotage();
    })
  }
  getLocalStotage(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.getTotal();
    }
  }
  getTotal(): void {
    this.totalPrice = this.basket.reduce((total, prod) => total + (prod.prize * prod.count), 0)
  }

}