import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-outsorcing',
  templateUrl: './outsorcing.component.html',
  styleUrls: ['./outsorcing.component.scss']
})
export class OutsorcingComponent implements OnInit {
  outsourcingArray: any = [];
  title: string;
  image: string;
  description: string;
  moreText: string;
  editIndex: string;
  imageStatus: boolean;
  editStatus: boolean;
  uploadPercent: Observable<number>;
  constructor(private db: AngularFirestore,
    private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.getOuts();
  }

  getOuts(): void {
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

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/out/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/out/${image.metadata.name}`).getDownloadURL().subscribe(url => {
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

  addOut(): void {
    const user = {
      title: this.title,
      image: this.image,
      description: this.description,
      id: null,
      date: new Date()
    }
    this.db.collection('outsource').add(user).then(myUser => {

      this.db.collection('outsource').doc(myUser.id).update({
        "id": myUser.id
      }).then(() => {
        console.log("Document successfully updated!");
        this.outsourcingArray = [];
        this.getOuts();
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }).catch(err => console.log(err));
    this.imageStatus = false;
    this.resetForm();
  }

  deleteOut(id: string): void {
    this.db.collection("outsource").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.outsourcingArray = [];
      this.getOuts();

    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  editOut(id: string): void {
    for (let i = 0; i < this.outsourcingArray.length; i++) {
      if (this.outsourcingArray[i].id == id) {
        this.editIndex = this.outsourcingArray[i].id;
        this.title = this.outsourcingArray[i].title;
        this.image = this.outsourcingArray[i].image;
        this.description = this.outsourcingArray[i].description;
        this.imageStatus = true;
        this.editStatus = true;
      }
    }
  }

  saveOut(): void {
    this.db.collection('outsource').doc(this.editIndex).update({
      "id": this.editIndex,
      "title": this.title,
      "image": this.image,
      "description": this.description,
    }).then(() => {
      console.log("Document successfully updated!");
      this.outsourcingArray = [];
      this.getOuts();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
    this.imageStatus = false;
    this.editStatus = false;
    this.resetForm();
  }

  resetForm(): void {
    this.title = '';
    this.image = '';
    this.description = '';
  }
}