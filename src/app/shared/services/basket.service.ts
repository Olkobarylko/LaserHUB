import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  changeBusket$ = new Subject<boolean>();
  constructor() { }
  addLocalBasket(prod: any): void {
    let prods: Array<any> = [];
    if (localStorage.getItem('basket')) {
      prods = JSON.parse(localStorage.getItem('basket'));
      if (prods.some(product => product.id === prod.id)) {
        const INDEX = prods.findIndex(product => product.id === prod.id);
        prods[INDEX].count += prod.count;
      }
      else {
        prods.push(prod);
      }
    }
    else {
      prods.push(prod);
    }
    localStorage.setItem('basket', JSON.stringify(prods))
  } 
}
