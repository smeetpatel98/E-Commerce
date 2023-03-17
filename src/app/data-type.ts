export interface signup {
  name: string;
  email: string;
  password: string;
  confpassword: string;
  image: any;
  id: number;
  created: string;
}
export interface login {
  email: string;
  password: string;
  id: number;
  image: any;
  lastlogin_date:any;
  currentlogin_date:any;
}

export interface product {
  companyname:string;
  name: string;
  price: number;
  color: string
  catergory: string
  imageurl: string;
  description: string;
  id: number;
  quantity: undefined | number
}

export interface cart {
  companyname:string;
  name: string;
  totalprice: number;
  tax: number;
  taxamount: number,
  color: string
  catergory: string
  imageurl: string;
  description: string;
  quantity: undefined | number;
  userid_login: number;
  user_name:string;
  productid: number;
}

