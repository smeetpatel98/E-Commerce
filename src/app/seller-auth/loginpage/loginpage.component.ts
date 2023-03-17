import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from 'src/app/data-type';
import { SellerapiService } from 'src/app/services/sellerapi.service';
import { FooterComponent } from '../../header/footer/footer.component'

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  email: any;
  password: any;
  show = false;
  loader = false;

  errormessage: any;
  constructor(private seller: SellerapiService) { }

  ngOnInit(): void {
    // this.seller.reloadseller()
  }

  userlogin(data1: login) {
    console.log("Login person account:", data1)
    this.errormessage = ""
    this.seller.userlogin(data1);
    this.loader = true;
    this.seller.loginerror.subscribe((error) => {
      if (error) {
        this.errormessage = "Email or password is incorrect"
        this.show = true
      }
      else {
        this.errormessage = "Login Successfully"
      }
    })
  }

}
