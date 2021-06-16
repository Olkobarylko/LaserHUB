import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlogserviceService } from 'src/app/shared/services/blog/blogservice.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


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
  editIndex: string;
  imageStatus: boolean;
  uploadPercent: Observable<number>;
  constructor(private BlogserviceService: BlogserviceService,
    private db: AngularFirestore,
    private storage: AngularFireStorage) {

  }

  ngOnInit(): void {
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

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/products/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/products/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url;
        this.imageStatus = true;
        this.uploadPercent = null
      });
    });
  }

  deleteImage(image?: string): void {
    image = image || this.image;
    this.storage.refFromURL(image).delete().subscribe(
      () => {
        this.imageStatus = false;
        this.image = '';
      },
      err => {
        console.log(err);
      }
    )
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
    this.imageStatus = false;
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
    for (let i = 0; i < this.blogsArray.length; i++) {
      if (this.blogsArray[i].id == id) {
        this.editIndex = this.blogsArray[i].id;
        this.title = this.blogsArray[i].title;
        this.image = this.blogsArray[i].image;
        this.description = this.blogsArray[i].description;
        this.moreText = this.blogsArray[i].moreText;
      }
    }
  }

  saveBlog(): void {
    this.db.collection('blogs').doc(this.editIndex).update({
      "id": this.editIndex,
      "title": this.title,
      "image": this.image,
      "description": this.description,
      "moreText": this.moreText
    }).then(() => {
      console.log("Document successfully updated!");
      this.blogsArray = [];
      this.getBlogs();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
    this.resetForm();
  }

  resetForm(): void {
    this.title = '';
    this.image = '';
    this.description = '';
    this.moreText = '';
  }
}