import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cart, login, product, signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { EncrdecrserviceService } from '../services/encrdecrservice.service';

@Injectable({
  providedIn: 'root',
})
export class SellerapiService {
  //behavior subjest are used for authguard
  issignup = new BehaviorSubject<boolean>(false);
  islogin = new BehaviorSubject<boolean>(false);
  singUpDataArray: any = [];
  logData: any = [];

  //Event emitter are to display error message
  loginerror = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private encrDecr: EncrdecrserviceService) { }

  //first method to call API(Make this service)
  //Jokes APi
  jokes() {
    let apiurl = 'http://localhost:3000/jokes';
    return this.http.get(apiurl);
  }
  // Admin User APIs
  userlist() {
    return this.http.get('http://localhost:3000/user');
  }
  userlistdelete(id: number) {
    return this.http.delete(`http://localhost:3000/user/${id}`);
  }
  useredit(id: any) {
    return this.http.get(`http://localhost:3000/user/${id}`);
  }
  updateuser(data: signup) {
    return this.http.put(`http://localhost:3000/user/${data.id}`, data)
  }
  // Admin User APIs ends

  //Login Service APi
  //ADMIN login API
  async userlogin(data: login) {
    // console.log('UserAPi-login called');
    //APi passing to compenent by using return this.http.post("API url",data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {
      observe: 'response',
    }).subscribe((result: any) => {
      // console.log("Signup Detials:", result)
      if (result && result.body?.length) {
        this.islogin.next(true);
        localStorage.setItem('Sellerdetails', JSON.stringify(result.body));
        this.router.navigate(['/seller-home']);
        this.loginerror.emit(false);
      } else {
        this.loginerror.emit(true);
        // this.router.navigate(['/app-errorpage']);
      }
    });
  }

  //Usersignup Service APi
  async usersignup(data: signup) {
    console.log('SignUpAPI-call');
    //APi passing to compenent by using return this.http.post("API url",data)
    this.http.post('http://localhost:3000/user', data).subscribe((result: any) => {
      // console.log(result.body);
      if (result) {
        this.singUpDataArray.push(result);
        this.loginerror.emit(true);
        localStorage.setItem('Userdetails', JSON.stringify(this.singUpDataArray)
        );
        // console.log('Signup:', this.singUpDataArray);
      } else {
        // this.router.navigate(['/app-errorpage']);
      }
    });
  }
  //Userlogin API
  async userrlogin(data: login) {
    debugger;
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    var current_time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    let currentdate = cDay + "-" + cMonth + "-" + cYear;
    //Session code for date starts =--
    const d = new Date();
    d.setTime(d.getTime() + (5 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    //Session code ends=--

    // console.log('UserAPi-login called',data);
    //API passing to component by using return this.http.post("API url",data
    var encrypted = await this.encrDecr.set('123456$#@$^@1ERF', data.password);
    // var decrypted = this.encrDecr.get('123456$#@$^@1ERF', encrypted);
    data.password = encrypted;

    this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, {
      observe: 'response',
    }).subscribe((result: any) => {
      // console.log("Signup Detials:", result)
      if (result && result.body?.length) {
        this.islogin.next(true);
        localStorage.setItem('Userdetails', JSON.stringify(result.body));
        document.cookie = `username=${result.body[0].name}; expires=${expires}; path=/`;
        //API of cart onlogin
        this.http.get(`http://localhost:3000/cartdata`, {
          observe: 'response',
        }).subscribe((cartdata: any) => {
          // console.log(cartdata);
          // specfic user login data code start
          let local: string | any = localStorage.getItem('Userdetails');
          let userid = JSON.parse(local);
          let useridd = userid.reduce((value: any, index: any) => {
            let newuserid = userid[index].id;
            return newuserid;
          });
          let id = useridd.id;
          // console.log('Cartdata After login', cartdata.body);
          for (let i = 0; i < cartdata.body.length; i++) {
            if (cartdata.body[i].userid_login === id) {
              localStorage.setItem('Add_To_Cart_data', JSON.stringify(cartdata.body));
              let cart_data: any = localStorage.getItem('Add_To_Cart_data');
              let cartdatafetch = JSON.parse(cart_data);
              cartdatafetch = cartdatafetch.filter((value: any, index: any) => {
                // console.log('Filter value:', value);
                if (value.userid_login === id) {
                  return true;
                } else {
                  return false;
                }
              }
              );
              // console.log('cartdatafetch', cartdatafetch);
            }
          }
          // spefic user login data code ends--

          //Logdata code starts---
          data.id = id;
          this.http.get(`http://localhost:3000/logdata`).subscribe((getlog: any) => {
            localStorage.setItem('logData', JSON.stringify(getlog));
            if (getlog.length == 0) {
              data.lastlogin_date = currentdate + "/" + current_time;
              data.currentlogin_date = currentDate + "/" + current_time;
              this.http.post(`http://localhost:3000/logdata`, data).subscribe((res) => {
                if (res) {
                  this.logData.push(res);
                  localStorage.setItem('logData', JSON.stringify(this.logData));
                }
              });
            } else if (getlog.length > 0) {
              let log: any = localStorage.getItem('logData');
              let Logg = JSON.parse(log);
              Logg.map((value: any) => {
                if (value.email == data.email) {
                  let currentdate = currentDate + "/" + current_time
                  data.lastlogin_date = value.lastlogin_date;
                  data.currentlogin_date = currentdate;
                  this.http.put(`http://localhost:3000/logdata/${data.id}`, data).subscribe((res) => {
                    if (res) {
                      this.logData.push(res);
                      localStorage.setItem('logData', JSON.stringify(this.logData));
                    }
                  });
                } else {
                  data.lastlogin_date = currentdate + "/" + current_time;
                  data.currentlogin_date = currentDate + "/" + current_time;
                  this.http.post(`http://localhost:3000/logdata`, data).subscribe((res) => {
                    if (res) {
                      this.logData.push(res);
                      localStorage.setItem('logData', JSON.stringify(this.logData));
                    }
                  });
                }
                // console.log('logData', value);
              });
            }
          });
          //Logdata code ends---
        });
        this.router.navigate(['/seller-home']);
        this.loginerror.emit(false);
      } else {
        this.loginerror.emit(true);
        // this.router.navigate(['/app-errorpage']);
      }
    });
  }

  //For refresh
  reloadseller(value: any) {
    // console.log(value)
    let sellerDetail = localStorage.getItem('Sellerdetails');
    let Userdetails = localStorage.getItem('Userdetails');
    if (sellerDetail && sellerDetail.length > 0) {
      this.islogin.next(true);
      this.router.navigate(['/seller-home']);
    }
    if (Userdetails && Userdetails.length > 0) {
      this.islogin.next(true);
      this.router.navigate(['/seller-home']);
    }
  }
}
