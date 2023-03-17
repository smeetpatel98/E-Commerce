import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SellerapiService } from '../app/services/sellerapi.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private seller: SellerapiService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean
    | UrlTree {
    // return this.seller.issignup;
    if (this.seller.islogin) {
      return true;
    } else {
      return this.router.navigateByUrl('/');
    }
  }
}
