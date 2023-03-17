import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { signup } from 'src/app/data-type';
import { SellerapiService } from 'src/app/services/sellerapi.service';

@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.component.html',
  styleUrls: ['./editlist.component.css']
})
export class EditlistComponent implements OnInit {
  user: any;
  usereditmsg: undefined | string;
  url: any;
  constructor(private route: ActivatedRoute, private userlist: SellerapiService) { }

  ngOnInit(): void {
    let userid = this.route.snapshot.paramMap.get('id')  //Using this we can get id for the update
    userid && this.userlist.useredit(userid).subscribe((result) => {
      this.user = result;
    });
  }
  edituser(data: signup) {
    data.id = this.user.id;
    data.image = this.url;
    console.log("user", data)
    this.userlist.updateuser(data).subscribe((result) => {
      console.log("datauser", data);
      if (result) {
        this.user = result;
        this.usereditmsg = "User update successfully";
      }
      setTimeout(() => {
        this.usereditmsg = undefined;
      }, 3000);
    });
  }
  imageupload(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = (event: any) => {
      this.url = reader.result;
      console.log(this.url);
    }
  }
  test(data: any) {
    console.log("vxhbsh", data)
  }
}
