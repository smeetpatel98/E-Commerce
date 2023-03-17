import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { cart, product } from 'src/app/data-type';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { ProductapiService } from 'src/app/services/productapi/productapi.service';

@Component({
  selector: 'app-productdetailspage',
  templateUrl: './productdetailspage.component.html',
  styleUrls: ['./productdetailspage.component.css']
})
export class ProductdetailspageComponent implements OnInit {

  singleproductdata: any;
  quantityy: number = 1;
  closeResult: string = '';
  data = this.addtocart();
  removecart = false;
  productremovecartmsg: string | undefined;
  intervalHandle: any;
  check =faCheck;
  constructor(private activeroute: ActivatedRoute, private product: ProductapiService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    //Data get by id
    let productId = this.activeroute.snapshot.paramMap.get('id');
    productId && this.product.editlist(productId).subscribe((data) => {
      this.singleproductdata = data;
      // console.log("data", this.singleproductdata)

      //button code of remove cart
      if (localStorage.getItem('Userdetails')) {
        let local: string | any = localStorage.getItem('Userdetails');
        let userid = JSON.parse(local);
        let speficuserid = userid.reduce((value: any, index: any) => {
          let newuserid = userid[index].id;
          return newuserid;
        })
        let id = speficuserid.id;
        let cartdata = localStorage.getItem('Add_To_Cart_data');
        if (productId && cartdata?.length) {
          let items = JSON.parse(cartdata);
          let newitems = items.find((item: cart) => {
            return (id == item.userid_login.toString() && item.productid == this.singleproductdata.id);
          });
          // console.log("newitems", newitems)
          if (newitems) {
            this.removecart = true;
          } else {
            this.removecart = false;
          }
        }
      }
      //button code of remove cart ends--
    })
  }

  //Quantity check
  quantity(val: string) {
    if (this.quantityy < 10 && val === 'max') {
      this.quantityy += 1;
    }
    else if (this.quantityy > 1 && val === 'min') {
      this.quantityy -= 1;
      // this.reducecartdata();
    }
    else if (this.quantityy == 0) {
      this.quantityy = 0;
      confirm("Are sure you dont want buy this product");
    }
  }
  //Add to cart funtion code
  addtocart() {
    debugger;
    if (this.singleproductdata) {
      //To get user login detials(who has been login): 
      //code starts:
      let local: string | any = localStorage.getItem('Userdetails');
      let userid = JSON.parse(local);
      let useridd = userid.reduce((value: any, index: any) => {
        let newuserid = userid[index].id;
        return newuserid;
      })
      let id = useridd.id;
      let user_name = useridd.name;
      // console.log("userlogin",id)
      //Code ends--
      if (local && local.length > 0) {
        this.singleproductdata.quantity = this.quantityy;
        let totalprice = this.singleproductdata.price * this.quantityy;
        let TotaltaxPrice = totalprice + 40;
        // console.log(totalprice)
        // Data after clicking on Add cart 
        let cartdata: cart = {
          ...this.singleproductdata,
          userid_login: id,
          user_name: user_name,
          totalprice: totalprice,
          taxamount: TotaltaxPrice,
          tax: 40,
          productid: this.singleproductdata.id,
        }
        // this.removecart = true;

        this.product.addtocartlocal(cartdata).subscribe((result: any) => {
          console.log("API Response Cartdata", result);
          this.singleproductdata.quantity = result.quantity;
          if (result) {
            if (result.userid_login == id) {
              let cartdata: any = localStorage.getItem('Add_To_Cart_data');
              let cartdatafetch = JSON.parse(cartdata);
              cartdatafetch = cartdatafetch.filter((value: any, index: any) => {
                console.log(value)
                if (value.userid_login === id) {
                  return true;
                }
                else {
                  return false;
                }
              })
              console.log("cartdatafetch", cartdatafetch)
            }
          }
        })
        // Data after clicking on Add cart ends
        if (cartdata) {
          this.router.navigate(['/cart']);
        }
        // console.log(cartdata);
      }
      else {
        this.router.navigate(['/app-errorpage']);
      }
    }
  }

  removetocart(productId: number) {
    // console.log(productId);
    this.product.removetocart(productId).subscribe((result) => {
      if (result) {
        this.productremovecartmsg = "Remove Successfully";
      }
    })
    this.removecart = false;
    setTimeout(() => {
      this.productremovecartmsg = undefined;
    }, 3000)
  }

  // ModalPopup code
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.addtocart()
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
