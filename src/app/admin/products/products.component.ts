import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsArray: any = [];
  sizeArr: any = [];
  category: string = 'laser';
  title: string;
  image: string;
  description: string;
  prize: string;
  editIndex: string;
  size: string;
  imageStatus: boolean;
  uploadPercent: Observable<number>;
  count = 1;
  constructor(private db: AngularFirestore,
    private storage: AngularFireStorage) { }

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
    this.sizeArr = this.size.split(' ');
    const user = {
      category: this.category,
      title: this.title,
      image: this.image,
      description: this.description,
      prize: this.prize,
      size: this.sizeArr,
      id: null,
      count: this.count,
      date: new Date()
    }
    this.db.collection('products').add(user).then(myUser => {

      this.db.collection('products').doc(myUser.id).update({
        "id": myUser.id
      }).then(() => {
        console.log("Document successfully updated!");
        this.productsArray = [];
        this.getBlogs();
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }).catch(err => console.log(err));
    this.imageStatus = false;
    this.resetForm();
  }

  deleteBlog(id: string): void {
    this.db.collection("products").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.productsArray = [];
      this.getBlogs();

    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  editBlog(id: string): void {
    for (let i = 0; i < this.productsArray.length; i++) {
      if (this.productsArray[i].id == id) {
        this.editIndex = this.productsArray[i].id;
        this.title = this.productsArray[i].title;
        this.image = this.productsArray[i].image;
        this.description = this.productsArray[i].description;
        this.prize = this.productsArray[i].prize;
        this.size = this.productsArray[i].size;
        this.category = this.productsArray[i].size;
      }
    }
  }

  saveBlog(): void {
    this.db.collection('products').doc(this.editIndex).update({
      "id": this.editIndex,
      "title": this.title,
      "image": this.image,
      "description": this.description,
      "moreText": this.prize,
      "size": this.size,
      "category": this.category
    }).then(() => {
      console.log("Document successfully updated!");
      this.productsArray = [];
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
    this.prize = '';
    this.size = '';
    this.category = 'laser'
  }
}
