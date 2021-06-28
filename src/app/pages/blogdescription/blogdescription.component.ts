import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogdescription',
  templateUrl: './blogdescription.component.html',
  styleUrls: ['./blogdescription.component.scss']
})
export class BlogdescriptionComponent implements OnInit {
  oneBlog: any = {};
  constructor(private ActiveRoute: ActivatedRoute,
    private db: AngularFirestore) { }

  ngOnInit(): void {
    this.renderOneBlog();
  }
  renderOneBlog(): void {
    const ID = this.ActiveRoute.snapshot.paramMap.get('id');
    this.db.collection("blogs").doc(ID).get().subscribe((doc) => {
      this.oneBlog = doc.data();
    })
  }
}
