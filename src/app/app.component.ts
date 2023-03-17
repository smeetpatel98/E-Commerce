import { Component } from '@angular/core';
import { SellerapiService } from './services/sellerapi.service';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecomm-project';
  spinnerStyle = Spinkit;

  loader = true;
  constructor(private seller: SellerapiService) {

  }
  ngOnInit() {
    // this.seller.reloadseller()
  }
}
