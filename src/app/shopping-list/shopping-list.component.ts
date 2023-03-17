import { Component, OnInit } from '@angular/core';
import { ProductapiService } from '../services/productapi/productapi.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../header/header.component'
import { Pipe, PipeTransform } from '@angular/core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {

  productlist: any = [];
  closeResult: string = '';
  productdeletemsg: undefined | string;
  searchname: any;
  filtname: any;
  newradiovalue: any;
  cart = faShoppingCart;

  // ingredients: ingredients[] = [
  //   new ingredients('Apple', 5),
  //   new ingredients('banana', 15),
  // ];
  constructor(private product: ProductapiService, private modalService: NgbModal) {
    this.productlist = this.searchfilter();
  }

  ngOnInit(): any {
    this.product.productlist().subscribe((result) => {
      // console.log(result)
      this.productlist = result;
    });
  }

  searchfilter(event?: any) {
    if (event) {
      this.newradiovalue = event.target.value;
      // console.log(this.newradiovalue);
    }
    this.product.searchlist().subscribe((data) => {
      let newsearchvalue = data.filter((value) => {
        if (value.catergory?.toUpperCase() == this.searchname?.toUpperCase()) {
          return value;
        } else if (value.catergory?.toUpperCase() == this.newradiovalue?.toUpperCase()) {
          return value;
        } else if (value.color?.toUpperCase() == this.newradiovalue?.toUpperCase()) {
          return value;
        }else if (value.catergory?.toLowerCase() == this.searchname?.toLowerCase()) {
          return value;
        }
        return;
      });
      if (newsearchvalue.length) {
        this.productlist = newsearchvalue;
      }else if (this.newradiovalue == "All") {
        this.productlist = data;
      } else if (this.newradiovalue == "Low") {
        let low = data.sort(function (a: any, b: any) {
          return a.price - b.price;
        });
        this.productlist = low;
      } else if (this.newradiovalue == "High") {
        let High = data.sort(function (a: any, b: any) {
          return b.price - a.price;
        });
        this.productlist = High;
      }else {
        this.productlist = data;
      }
      // console.log(newsearchvalue);
      return;
    })
  }
  // ModalPopup code
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
//Custom pipe made for search filter
@Pipe({
  name: 'removefiltercate'
})
export class RemovePipe implements PipeTransform {
  result: any = [];
  transform(value: any) {
    debugger;
    // console.log(value);
    if (value && value.length) {
      value.forEach((item: any) => {
        if (this.result.length == 0) {
          this.result.push(item);
        } else {
          if (item.catergory && this.result.findIndex((item1: any) => item1.catergory == item.catergory) == -1) {
            this.result.push(item);
          }
          if (item.Color && this.result.findIndex((item1: any) => item1.color == item.color) == -1) {
            this.result.push(item);
          }
        }
      });
      // console.log("this.result:", this.result)
    }
    return this.result;
  }
}
