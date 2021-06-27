import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-productdesription',
  templateUrl: './productdesription.component.html',
  styleUrls: ['./productdesription.component.scss']
})
export class ProductdesriptionComponent implements OnInit {
  oneProm: any = {};
  constructor(private ActiveRoute: ActivatedRoute,
    private db: AngularFirestore,
    private busketService: BasketService) { }

  ngOnInit(): void {
    this.renderOneProm();
  }
  renderOneProm(): void {
    const ID = this.ActiveRoute.snapshot.paramMap.get('id');
    this.db.collection("products").doc(ID).get().subscribe((doc) => {
      this.oneProm = doc.data();
      console.log(this.oneProm);

    })
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
  }

  addToBusket(prod: any): void {
    this.busketService.addLocalBasket(prod);
    this.busketService.changeBusket$.next(true);
    prod.count = 1;
  }
}
