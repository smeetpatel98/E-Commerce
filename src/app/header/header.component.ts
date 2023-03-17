import { Component, OnInit } from '@angular/core'
import { NavigationStart, Router } from '@angular/router';
import { SellerapiService } from 'src/app/services/sellerapi.service';
import { product } from '../data-type';
import { ProductapiService } from '../services/productapi/productapi.service';
import { faShoppingCart, faHome, faStore, faUsers, faSquare } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype: string = 'default';
  login_acc_name: string = '';
  userimg: any;
  search: undefined | product[];
  cartitem = 0;
  url: any;

  // fontawesome icons
  cart = faShoppingCart;
  home = faHome;
  store = faStore;
  user = faUsers;
  sq = faSquare;
  // fontawesome icons
  searchname: any;

  constructor(private route: Router, private productapi: ProductapiService, private seller: SellerapiService) {
    this.seller.reloadseller(this.url);
  }
  ngOnInit(): void {
    this.route.events.subscribe((result: any) => {
      if (result && result.url) {
        let selerData = localStorage.getItem('Sellerdetails');
        let user = localStorage.getItem('Userdetails');
        if ((selerData && selerData.length > 0)) {
          this.menutype = 'shopping';
          if (localStorage.getItem('Sellerdetails')) {
            let sellername = localStorage.getItem('Sellerdetails');
            // let newname = sellername && JSON.parse(sellername)[0]
            this.login_acc_name = "Admin";
          }
          // 
        }
        else if (user && user.length > 0) {
          this.menutype = 'usershopping';
          let username = localStorage.getItem('Userdetails');
          let newname = username && JSON.parse(username)[0];
          this.login_acc_name = newname.name;
          this.userimg = newname.image;
        }
        else {
          this.menutype = 'default';
        }
      }
      // this.url = result.url;
      // console.log(this.url)
    })

    //Cart update (0 to latest value)
    setInterval(() => {
      if (localStorage.getItem('Userdetails') && localStorage.getItem('Add_To_Cart_data')) {
        let local: string | any = localStorage.getItem('Userdetails');
        let userid = JSON.parse(local);
        let useridd = userid.reduce((value: any, index: any) => {
          let newuserid = userid[index].id;
          return newuserid;
        })
        let id = useridd.id;

        let cartdata: any = localStorage.getItem('Add_To_Cart_data');
        let cartdatafetch = JSON.parse(cartdata);
        cartdatafetch = cartdatafetch.filter((value: any, index: any) => {
          // console.log('Filter value:', value);
          if (value.userid_login === id) {
            return true;
          } else {
            return false;
          }
        });
        // console.log("Filter value", cartdatafetch)
        if (cartdatafetch) {
          this.cartitem = cartdatafetch.length;
        }
      }
    }, 1000)
    //Cart update (0 to latest value) code ends
  }

  // searchfilter() {
  //   this.productapi.searchlist().subscribe((data) => {
  //     let newsearchvalue = data.filter((value) => {
  //       if (value.catergory?.toUpperCase() == this.searchname?.toUpperCase()) {
  //         return value;
  //       }
  //       return;
  //     })
  //     // console.log(newsearchvalue);
  //     return newsearchvalue;
  //   })
  // }

  logout() {
    console.log("logout");
    localStorage.clear();
  }
}
