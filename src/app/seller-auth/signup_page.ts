import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SellerapiService } from '../services/sellerapi.service';
import { Router } from '@angular/router';
import { login, signup } from '../data-type';
import { imageconst } from './../image.const';
import { EncrdecrserviceService } from '../services/encrdecrservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup_page',
  templateUrl: './signup_page.html',
  styleUrls: ['./signup_page.css'],
})
export class SellerAuthComponent implements OnInit, AfterViewInit {
  email: any;
  password: any;
  confpassword: any;
  inputemail: any;
  url: any;
  success: any;
  constructor(private seller: SellerapiService, private encrDecr: EncrdecrserviceService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.inputemail = document.getElementById('inputemail') as HTMLInputElement;
  }

  //API data fetching
  usersignup(data: signup) {
    debugger;
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let currentdate = cDay + "-" + cMonth + "-" + cYear;
    console.log("signup", data.email);
    if (this.url) {
      data.image = this.url;
      data.created = currentdate;
    } else {
      data.created = currentdate;
      data.image = imageconst;
      // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${imageconst}`);
    }
    // This method(this.apiname.function apiname(passing-data).subscribe(parameter name)=>{console.log(paramter name)})
    var encrypted = this.encrDecr.set('123456$#@$^@1ERF', data.password);
    data.password = encrypted;
    data.confpassword = encrypted;

    this.http.get('http://localhost:3000/user').subscribe((userData) => {
      localStorage.setItem('userDataEmailCheck', JSON.stringify(userData));
      let log: any = localStorage.getItem('userDataEmailCheck');
      let Logg = JSON.parse(log);
      let emailCheck = Logg.filter((value: any) => {
        if (value.email == data.email) {
          return true;
        } else {
          return false;
        }
      });
      if (emailCheck) {
        alert("Email Already Exsits");
      } else {
        this.seller.usersignup(data);
      }
    });
    this.seller.loginerror.subscribe((result) => {
      if (result) {
        this.success = "Created SuccessFully";
        this.router.navigate(['/app-userlogin']);
      }
    });
    // 
  }
  emailverify() {
    localStorage.getItem("");
  }
  imageupload(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = (event: any) => {
      this.url = reader.result;
      console.log(this.url);
    }
  }
}
