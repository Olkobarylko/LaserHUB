import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogsArray: any = [];
  constructor(private db: AngularFirestore) { }
  ngOnInit(): void {
    this.db.collection("blogs").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.blogsArray.push(doc.data());
        this.blogsArray.sort(function (a, b) {
          return a.date - b.date;
        })
        console.log(this.blogsArray);
      });
    });
  }

}
