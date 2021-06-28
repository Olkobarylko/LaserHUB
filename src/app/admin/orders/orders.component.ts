import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ordersArray: any = [];
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(): void {
    this.db.collection("orders").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.ordersArray.push(doc.data());
        this.ordersArray.sort(function (a, b) {
          return a.date - b.date;
        })
      });
    });
  }

  deleteOrder(id: string): void {
    this.db.collection("orders").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.ordersArray = [];
      this.getOrders();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}
