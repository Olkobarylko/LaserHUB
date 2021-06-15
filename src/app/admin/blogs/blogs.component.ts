import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlogserviceService } from 'src/app/shared/services/blog/blogservice.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogsArray: any = [];
  title: string;
  image: string;
  description: string;
  moreText: string;
  constructor(private BlogserviceService: BlogserviceService,
    private db: AngularFirestore) {

  }

  ngOnInit(): void {
    //   this.db.collection("cities").doc().delete().then(() => {
    //     console.log("Document successfully deleted!");
    // }).catch((error) => {
    //     console.error("Error removing document: ", error);
    // });
    // this.db.collection('blogs').doc(this.user.id).update(data).then(
    //   () => {
    //     console.log('update proflie successs');
    //   },
    //   err => {
    //     console.log(err);
    //   });
    // console.log(this.db.collection('blogs').get());
    this.getBlogs();
  }

  getBlogs(): void {
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

  addBlog(): void {
    const user = {
      title: this.title,
      image: this.image,
      description: this.description,
      moreText: this.moreText,
      id: null,
      date: new Date()
    }
    this.db.collection('blogs').add(user).then(myUser => {

      this.db.collection('blogs').doc(myUser.id).update({
        "id": myUser.id
      }).then(() => {
        console.log("Document successfully updated!");
        this.blogsArray = [];
        this.getBlogs();
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }).catch(err => console.log(err));

    this.resetForm();
  }

  deleteBlog(id: string): void {
    this.db.collection("blogs").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.blogsArray = [];
      this.getBlogs();

    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  editBlog(id: string): void {
    console.log(this.db.collection('blogs').doc(id));
  }

  // saveBlog(id: string): void {
  //   this.db.collection('blogs').doc(id).update({
  //     "id": id
  //   }).then(() => {
  //     console.log("Document successfully updated!");
  //     this.blogsArray = [];
  //     this.getBlogs();
  //   }).catch((error) => {
  //     console.error("Error removing document: ", error);
  //   });
  // }

  resetForm(): void {
    this.title = '';
    this.image = '';
    this.description = '';
    this.moreText = '';
  }
}