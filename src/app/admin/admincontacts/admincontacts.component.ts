import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admincontacts',
  templateUrl: './admincontacts.component.html',
  styleUrls: ['./admincontacts.component.scss']
})
export class AdmincontactsComponent implements OnInit {
  contactsArray: any = [];
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.getContacts();
  }
  getContacts(): void {
    this.db.collection("contacts").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.contactsArray.push(doc.data());
        this.contactsArray.sort(function (a, b) {
          return a.date - b.date;
        })
      });
    });
  }

  deleteContact(id: string): void {
    this.db.collection("contacts").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.contactsArray = [];
      this.getContacts();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}
