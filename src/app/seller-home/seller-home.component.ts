import { Component, OnInit } from '@angular/core';
import { SellerapiService } from '../services/sellerapi.service';
import { ProductapiService } from '../services/productapi/productapi.service';
import { product } from '../data-type';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productimage: undefined | product[];


  constructor(private seller: SellerapiService, private product: ProductapiService) {
  }
  ngOnInit(): void {
    this.product.carouselsimagefecth().subscribe((data) => {
      this.productimage = data;
    })
  }

}
