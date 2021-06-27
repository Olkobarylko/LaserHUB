import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lasercut',
  templateUrl: './lasercut.component.html',
  styleUrls: ['./lasercut.component.scss']
})
export class LasercutComponent implements OnInit {
  productsArray: any = [];
  finishArray: any = [];
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getBlogs();
  }
  getBlogs(): void {
    this.db.collection("products").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.productsArray.push(doc.data());
        this.productsArray.sort(function (a, b) {
          return a.date - b.date;
        })
      });
      for (let i = 0; i < this.productsArray.length; i++) {
        if (this.productsArray[i].category == 'laser') {
          this.finishArray.push(this.productsArray[i]);
        }
      }
    });

  }
}

