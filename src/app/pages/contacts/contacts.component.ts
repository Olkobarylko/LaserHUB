import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  firstName: string;
  email: string;
  subject: string;
  message: string;
  checkNameEmailDis: boolean;
  checkName: boolean;
  checkEm: boolean;
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }
  addContact(): void {
    const contact = {
      firstName: this.firstName,
      email: this.email,
      subject: this.subject,
      message: this.message,
      id: null,
      date: new Date()
    }
    this.db.collection('contacts').add(contact).then(myUser => {

      this.db.collection('contacts').doc(myUser.id).update({
        "id": myUser.id
      }).then(() => {
        console.log("Document successfully updated!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }).catch(err => console.log(err));
    this.firstName = '';
    this.email = '';
    this.subject = '';
    this.message = '';
    this.checkNameEmailDis = false;
  }

  onChangeName(newValue) {
    if (newValue.length > 0) {
      this.checkName = true;
    }
    else {
      this.checkName = false;
    }
    this.checkAllChange();
  }

  onChangeEmail(newValue) {
    if (newValue.length > 0) {
      this.checkEm = true;
    }
    else {
      this.checkEm = false;
    }
    this.checkAllChange();
  }
  checkAllChange(): void {
    if (this.checkEm && this.checkName) {
      this.checkNameEmailDis = true;
    }
    else {
      this.checkNameEmailDis = false;
    }
  }
}
