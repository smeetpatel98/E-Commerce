import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { login } from 'src/app/data-type';
import { SellerapiService } from 'src/app/services/sellerapi.service';
import { ProductdetailspageComponent } from 'src/app/shopping-list/productdetailspage/productdetailspage.component';
import { FooterComponent } from '../../header/footer/footer.component'

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  useremail: any;
  userpassword: any;
  show = false;
  loader = false;

  errormessage: string | undefined = "";
  constructor(private seller: SellerapiService, private router: Router) { }

  ngOnInit(): void {
    // this.cartdata.addtocart();
  }

  userrlogin(data: login) {
    console.log("Login person account:", data)
    this.errormessage = ""
    this.seller.userrlogin(data);
    this.seller.loginerror.subscribe((res) => {
      if (res) {
        this.errormessage = "Email or password is incorrect";
        this.show = true;
      }
      else {
        this.errormessage = "Login Successfully";
        this.loader = true;
      }
    }, error => {
      alert("Something Went Wrong");
    });
  }
  opensignuppage() {
    // this.showloginpage = true;
    this.router.navigate(['/app-signup_page']);
  }
}
