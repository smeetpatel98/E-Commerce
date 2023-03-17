import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { cart, product } from 'src/app/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductapiService {

  constructor(private http: HttpClient, private router: Router) { }

  product(data: product) {
    // console.log('ProductAPI called');
    return this.http.post('http://localhost:3000/product', data);
  }
  productlist() {
    //console.log('ProductListAPI called');
    return this.http.get<product[]>('http://localhost:3000/product');
  }
  deletelist(id: number) {
    //console.log('ProductDeleteAPI called');
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }
  editlist(id: string) {
    //console.log('ProductEditAPI called');
    return this.http.get<product>(`http://localhost:3000/product/${id}`);
  }
  updateproduct(data: product) {
    return this.http.put<product>(`http://localhost:3000/product/${data.id}`, data);
  }
  carouselsimagefecth() {
    return this.http.get<product[]>('http://localhost:3000/product?_limit=6');
  }
  searchlist() {
    return this.http.get<product[]>('http://localhost:3000/product');
  }

  addtocartlocal(data: cart) {
    debugger;

    let cartdata: any = [];
    let localcart: any = localStorage.getItem('Add_To_Cart_data');
    cartdata = JSON.parse(localcart);
    // console.log(cartdata)
    let cartindex;
    // This code is to get excisting product
    if (cartdata !== null || (cartdata && cartdata.length > 0)) {
      if (localStorage.getItem('Add_To_Cart_data')) {
        let local: string | any = localStorage.getItem('Userdetails');
        let userid = JSON.parse(local);
        let useridd = userid.reduce((value: any, index: any) => {
          let newuserid = userid[index].id;
          return newuserid;
        });
        let id = useridd.id;
        cartindex = cartdata.filter((value: any) => {
          if (value.userid_login === id) {
            cartindex = cartdata.findIndex((item: any) => item.userid_login == data.userid_login);
            return cartindex;
          } else {
            return cartindex = 0;
          }
        });
      }
    }

    if (!localcart) {
      localStorage.setItem('Add_To_Cart_data', JSON.stringify([data]));
      return this.http.post('http://localhost:3000/cartdata', [data]);
    }
    else if (cartindex > 0) {
      cartdata[cartindex].quantity++;
      cartdata[cartindex].totalprice = cartdata[cartindex].price * cartdata[cartindex].quantity;
      localStorage.setItem('Add_To_Cart_data', JSON.stringify(cartdata));
      return this.http.post<cart>(`http://localhost:3000/cartdata/${data.productid}`, cartdata);
    }
    else {
      console.log(cartdata);
      cartdata.push(data);
      localStorage.setItem('Add_To_Cart_data', JSON.stringify(cartdata));
      return this.http.post('http://localhost:3000/cartdata', data);
    }
  }

  removetocart(productId: number) {
    let cartdata = localStorage.getItem('Add_To_Cart_data');
    if (cartdata) {
      let items: product[] = JSON.parse(cartdata);
      items = items.filter((value: product) => {
        return productId !== value.id;
      });
      localStorage.setItem('Add_To_Cart_data', JSON.stringify(items));
    }
    return this.http.delete(`http://localhost:3000/cartdata/${productId}`);
  }

  addtolocalWishlist() {

  }
}
