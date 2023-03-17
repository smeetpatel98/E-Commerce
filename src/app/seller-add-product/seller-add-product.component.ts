import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductapiService } from '../services/productapi/productapi.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { productconst } from './../image.const';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addproductmessage: string | undefined;
  productlist: any | product[]
  closeResult: string = '';
  productdeletemsg: undefined | string;
  editicon = faEdit;
  deleteicon = faTrash;
  info =faInfoCircle;
  imageuploaded: any;
  url: any;

  constructor(private product: ProductapiService, private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit(): void {
    this.product.productlist().subscribe((result) => {
      this.productlist = result;
    })
  }

  newproduct(data: any) {
    console.log("product", data);
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let currentdate = cDay + "-" + cMonth + "-" + cYear;
    if (data.name != '') {
      if (this.url) {
        data.image = this.url;
        data.created = currentdate;
      } else {
        data.created = currentdate;
        // data.image = productconst;
        // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${imageconst}`);
      }
      this.product.product(data).subscribe((val) => {
        console.log("ADD Product=>", val)
        if (val) {
          this.productlist?.push(val);
          this.addproductmessage = "Product is Added successfully";
        }
        setTimeout(() => {
          this.addproductmessage = undefined;
        }, 3000);
      });
    }
  }
  delete(id: number) {
    this.product.deletelist(id).subscribe((result) => {
      if (result) {
        this.productlist = this.productlist.filter((value: product) => {
          return id !== value.id;
        })
        this.productdeletemsg = "Product is deleted";
      }
    })
    setTimeout(() => {
      this.productdeletemsg = undefined;
    }, 3000);
  };
  //Image Upload Code::---
  imageupload(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = (event: any) => {
      this.url = reader.result;
      console.log(this.url);
    }
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
