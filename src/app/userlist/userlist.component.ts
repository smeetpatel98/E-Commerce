import { Component, OnInit } from '@angular/core';
import { SellerapiService } from '../services/sellerapi.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  data: any;
  // icons
  edit = faEdit;
  delete = faTrash;
  userdeletemsg: any;
  constructor(private userlist: SellerapiService) { }

  ngOnInit(): void {
    this.userlist.userlist().subscribe((resutl) => {
      this.data = resutl;
    });
  }
  deleteuser(id: number) {
    this.userlist.userlistdelete(id).subscribe((result) => {
      if (result) {
        this.data = this.data.filter((value: any) => {
          return id !== value.id;
        })
        this.userdeletemsg = "User is deleted";
      }
    });
    setTimeout(() => {
      this.userdeletemsg = undefined;
    }, 3000);
  }

}
