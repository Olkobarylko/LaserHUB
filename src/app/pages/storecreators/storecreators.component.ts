import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-storecreators',
  templateUrl: './storecreators.component.html',
  styleUrls: ['./storecreators.component.scss']
})
export class StorecreatorsComponent implements OnInit {
  outsourcingArray: any = [];
  background = true;
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection("outsource").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.outsourcingArray.push(doc.data());
        this.outsourcingArray.sort(function (a, b) {
          return a.date - b.date;
        })
        console.log(this.outsourcingArray);
      });
    });
  }

}
