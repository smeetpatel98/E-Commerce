import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerapiService } from 'src/app/services/sellerapi.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    login_acc_name: string = '';
    version = environment.version;

  constructor(private route: Router,private seller: SellerapiService) {
    
   }

  ngOnInit(): void {
     
  }
  footerName(){
    let user = localStorage.getItem('Userdetails')
    if (user && user.length > 0) {
         let username = localStorage.getItem('Userdetails');
         let newname = username && JSON.parse(username)[0];
         this.login_acc_name = newname.name;
       }
  }
opensignuppage() {
    // this.showloginpage = true;
    
    this.route.navigate(['/app-signup_page']);
  }

}
