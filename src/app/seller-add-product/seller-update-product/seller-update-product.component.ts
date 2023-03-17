import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { product } from 'src/app/data-type';
import { ProductapiService } from 'src/app/services/productapi/productapi.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productdata: product[] | any;
  productupdatemsg: string | undefined;
  closeResult: string = '';
  url: any;
  constructor(private route: ActivatedRoute, private product: ProductapiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    let productid = this.route.snapshot.paramMap.get('id')  //Using this we can get id for the update
    productid && this.product.editlist(productid).subscribe((data) => {
      this.productdata = data;
    })
  }
  edit(data: product) {
    if (this.productdata) {
      data.id = this.productdata.id;
      data.imageurl = this.url;
    }
    console.log("updated data", data);
    this.product.updateproduct(data).subscribe((res) => {
      console.log(res)
      if (res) {
        this.productdata = res;
        this.productupdatemsg = "Product update successfully";
      }
      setTimeout(() => {
        this.productupdatemsg = undefined;
      }, 3000);
      // console.log(data)
    })
  }
  imageupload(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = (event: any) => {
      this.url = reader.result;
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
