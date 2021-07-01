import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GuardService } from 'src/app/shared/services/guar/guard.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  login: string;
  password: string;
  adminObj: any;
  constructor(private router: Router, private GuardService: GuardService,
    private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection("admin").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.adminObj = doc.data();
      });
    });
  }
  checkLogPas(): boolean {
    if (this.login == this.adminObj.login && this.password == this.adminObj.password) {
      this.login = "";
      this.password = "";
      localStorage.setItem('admin', 'password');
      this.router.navigateByUrl('admin');
      return true;
    }
    this.login = "";
    this.password = "";
  }
}
