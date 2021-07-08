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
  sizeArray: any = [];
  category: string = 'laser';
  title: string;
  image: string;
  description: string;
  prize: string;
  editIndex: string;
  size: string;
  imageStatus: boolean;
  uploadPercent: Observable<number>;
  editStatus: boolean;
  count = 1;
  miniArray: any = [];
  selectSize: any;
  newSizeArray: any = [];
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

    const user = {
      category: this.category,
      title: this.title,
      image: this.image,
      description: this.description,
      sizeArray: this.sizeArray,
      id: null,
      count: this.count,
      newPrice: null,
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

  onSubmit(event: any) {
    this.newSizeArray = [];
    for (let i = 0; i < this.miniArray.length; i++) {
      const arr = {
        size: event.target.player[i].value,
        prise: event.target.olko[i].value
      }
      this.newSizeArray.push(arr);
    }
    this.sizeArray = this.newSizeArray;
    console.log(this.newSizeArray);
  }

  editBlog(id: string): void {
    for (let i = 0; i < this.productsArray.length; i++) {
      if (this.productsArray[i].id == id) {
        this.editIndex = this.productsArray[i].id;
        this.title = this.productsArray[i].title;
        this.image = this.productsArray[i].image;
        this.description = this.productsArray[i].description;
        this.category = this.productsArray[i].category;
        this.imageStatus = true;
        this.editStatus = true;
        this.miniArray = this.productsArray[i].sizeArray;
        this.sizeArray = this.productsArray[i].sizeArray
      }
    }

  }

  saveBlog(): void {
    this.db.collection('products').doc(this.editIndex).update({
      "id": this.editIndex,
      "title": this.title,
      "image": this.image,
      "description": this.description,
      "category": this.category,
      "sizeArray": this.sizeArray
    }).then(() => {
      console.log("Document successfully updated!");
      this.productsArray = [];
      this.getBlogs();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
    this.imageStatus = false;
    this.editStatus = false;
    this.resetForm();

  }

  deleteSize(i: any): void {
    this.sizeArray.splice(i, 1);
    this.miniArray = this.sizeArray;
  }

  addSize(): void {
    const size = {
      size: this.size,
      prise: this.prize
    }
    this.sizeArray.push(size);
    this.miniArray = this.sizeArray;
    this.prize = '';
    this.size = '';
    console.log(this.sizeArray);

  }

  resetForm(): void {
    this.title = '';
    this.image = '';
    this.description = '';
    this.prize = '';
    this.size = '';
    this.category = 'laser';
    this.sizeArray = [];
  }
}
