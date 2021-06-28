import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket: any = [];
  checkBasketBoolean: boolean;
  totalPrice: string;
  firstName: string = null;
  lastName: string = null;
  phone: string = null;
  email: string = null;
  note: string = null;
  constructor(private BasketService: BasketService,
    private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getLocalStotage();
    this.checkBasket();
    this.checkStatusBasket();
  }
  checkBasket(): void {
    this.BasketService.changeBusket$.subscribe(() => {
      this.getLocalStotage();
      this.checkStatusBasket();
    })
  }
  getLocalStotage(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.getTotal();
    }
  }

  checkStatusBasket(): void {
    if (this.basket.length == 0) {
      this.checkBasketBoolean = true;
    }
    else {
      this.checkBasketBoolean = false;
    }
  }

  getTotal(): void {
    this.totalPrice = this.basket.reduce((total, prod) => total + (prod.newPrice * prod.count), 0)
  }

  changeProductCount(prod: any, status: boolean): void {
    if (status) {
      prod.count++;
    }
    else {
      if (prod.count > 1) {
        prod.count--;
      }
    }
    this.updateLocalBasket();
  }

  deleteProd(prod: any): void {
    const INDEX = this.basket.findIndex(product => product.id === prod.id);
    this.basket.splice(INDEX, 1);
    this.updateLocalBasket();

  }

  updateLocalBasket(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.BasketService.changeBusket$.next(true);
  }


  addOrder(): void {
    const Order = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      note: this.note,
      date: new Date(),
      basket: this.basket
    }
    this.db.collection('orders').add(Order).then(Order => {

      this.db.collection('orders').doc(Order.id).update({
        "id": Order.id
      }).then(() => {
        console.log("Document successfully updated!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }).catch(err => console.log(err));
    this.resetForm();
    this.updateLocalBasket();
  }

  resetForm(): void {
    this.firstName = "";
    this.lastName = "";
    this.phone = "";
    this.email = "";
    this.note = "";
    this.basket = [];
  }
}
