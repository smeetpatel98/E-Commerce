import { Component, OnInit } from '@angular/core';
import { ProductapiService } from 'src/app/services/productapi/productapi.service';
import { cart, product } from '../../data-type';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartitem: any;
  cart: any | cart[];
  productremovecartmsg: any;
  carttotal = 0;
  tax = 0;
  taxamount = 0;
  delivery = 0;
  totalprice = 0;

  trash = faTrash;
  constructor(private product: ProductapiService) { }

  ngOnInit(): void {
    this.cart = this.cartdetails();
  }


  cartdetails() {
    if (localStorage.getItem('Userdetails') && localStorage.getItem('Add_To_Cart_data')) {
      let local: string | any = localStorage.getItem('Userdetails');
      let userid = JSON.parse(local);
      let useridd = userid.reduce((value: any, index: any) => {
        let newuserid = userid[index].id;
        return newuserid;
      });
      let id = useridd.id;
      let user_name = userid.name;
      let cartdata: any = localStorage.getItem('Add_To_Cart_data');
      let cartdatafetch = JSON.parse(cartdata);
      cartdatafetch = cartdatafetch.filter((value: any) => {
        if (value.userid_login === id) {
          return true;
        } else {
          return false;
        }
      });
      if (cartdatafetch) {
        this.cartitem = cartdatafetch;
        console.log("item", cartdatafetch);
      }
      else {
        this.productremovecartmsg = "No items Added"
      }
      this.cartitem.forEach((it: any) => {
        this.delivery = 35;
        this.tax = it.tax;
        this.taxamount = it.taxamount;
        this.totalprice = it.totalprice;
        if(this.carttotal == 0){
          this.carttotal = this.delivery + this.taxamount + this.carttotal ;
        }else{
          this.carttotal =  this.totalprice + this.carttotal ;
        }
        // console.log("carttotal",carttotal);
      });
      //Added by Parth new calculation
      // let amount = 0;
      // let amount = this.cartitem.reduce((firstItem:any , secondItem:any) => {
      //     return firstItem + secondItem.price;
      // }, 0);
      // console.log("amount",amount);
    }
    
    return this.cartitem;
  }

  removetocart(productId: number) {
    this.product.removetocart(productId).subscribe((result) => {
      if (result) {
        console.log("==>>>", result);
        this.productremovecartmsg = "Remove Successfully";
        this.cart = this.cartdetails();
      }
    });
    setTimeout(() => {
      this.productremovecartmsg = undefined;
    }, 3000)
  }

  addToWishlist(){
    if (localStorage.getItem('Userdetails') && localStorage.getItem('Add_To_Cart_data')) {
      let local: string | any = localStorage.getItem('Userdetails');
      let userid = JSON.parse(local);
      let useridd = userid.reduce((value: any, index: any) => {
        let newuserid = userid[index].id;
        return newuserid;
      });
      let id = useridd.id;
      let user_name = userid.name;
      let cartdata: any = localStorage.getItem('Add_To_Cart_data');
      let cartdatafetch = JSON.parse(cartdata);
      cartdatafetch = cartdatafetch.filter((value: any) => {
        if (value.userid_login === id) {
          return true;
        } else {
          return false;
        }
      });
      if (cartdatafetch) {
        this.cartitem = cartdatafetch;
        console.log("item", cartdatafetch);
      }
    }
    return this.cartitem;
  }

}
