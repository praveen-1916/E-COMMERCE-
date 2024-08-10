import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { faCheck, faHome, faLock, faPhone, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

  // @ViewChild('loginForm') logForm: any;
  // @ViewChild('regForm') lForm: any;

  constructor(private prodSrv: ProductService, private route: Router) { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // console.log(this.f);

  }

  signInSignUp: boolean = false;
  popUp: boolean = false;
  lockIc = faLock;
  phoneIc = faPhone;
  userIc = faUser;
  homeIc = faHome;
  popIc: any;
  popMessage: any;
  popTitle: any;
  popBtn: any;
  customerDetails: any;


  signUpForm() {
    this.signInSignUp = true;
  }
  signInForm() {
    this.signInSignUp = false;
  }
  hidePopup() {
    if (this.popBtn == "Continue Shopping") {
      this.route.navigate(['/home']);
    } else if (this.popBtn == "Continue Login") {
      this.signInSignUp = false;
    } else {
      this.popUp = false;
    }
  }




  customerLogin(userMobileNo: string, passWord: string) {
    const customerLoginDetails = {
      "UserName": userMobileNo,
      "UserPassword": passWord,
    }

    this.prodSrv.loginCustomer(customerLoginDetails).subscribe((res: any) => {
      if (res.result) {
        this.popIc = faCheck;
        this.popTitle = 'Awesome!';
        this.popMessage = res.message;
        this.popBtn = 'Continue Shopping';
        this.customerDetails = res.data;
        this.prodSrv.setData(this.customerDetails);
      } else {
        this.popIc = faXmark;
        this.popTitle = 'Oops!';
        this.popMessage = res.message;
        this.popBtn = 'Ok';
      }
      this.popUp = true;
    })
  }

  custRegistration(regForm: any, name: string, mobileNo: string, passWord: string) {
    regForm.reset();
    const customerRegisterDetails = {
      "CustId": 0,
      "Name": name,
      "MobileNo": mobileNo,
      "Password": passWord,
    }

    this.prodSrv.registerCustomer(customerRegisterDetails).subscribe((res: any) => {
      if (res.result) {
        this.popIc = faCheck;
        this.popTitle = 'Awesome!';
        this.popMessage = res.message;
        this.popBtn = 'Continue Login';
      } else {
        this.popIc = faXmark;
        this.popTitle = 'Oops!';
        this.popMessage = res.message;
        this.popBtn = 'Ok';
      }
      this.popUp = true;
    })


  }



}
