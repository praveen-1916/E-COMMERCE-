import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { faLocation, faSearch, faShoppingCart, faAngleDown, faBagShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  constructor(public prodSrv: ProductService, private route: Router) { }
  @ViewChild('childUl') ul: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllCategories();
    this.numberOfProducts();
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.productCount = this.prodSrv.totalProducts;
  }


  searchIc = faSearch;
  cartIc = faShoppingCart;
  locationIc = faLocation;
  userIc = faUser;
  downIc = faAngleDown;
  heartIc = faHeart;
  bagIc = faBagShopping;

  productCount: any;
  navColl: boolean = false;
  allParentCategories: any[] = [];
  allChildCategories: any[] = [];
  childCatToShow: any[] = [];

  toShowCategories() {
    this.prodSrv.toToggleCategory();
    this.childCatToShow = [];
    if (this.childCatToShow.length === 0) {
      this.ul.nativeElement.style.display = 'none';
    }
  }
  toShowNavbar() {
    if (this.navColl) {
      this.navColl = false;
    } else {
      this.navColl = true;
    }
  }

  numberOfProducts() {
    if (this.prodSrv.customerDetails == undefined) {
      this.prodSrv.totalProducts = 0;
    } else {
      this.prodSrv.getCartProducts(this.prodSrv.customerDetails.custId).subscribe((res: any) => {
        this.prodSrv.totalProducts = res.data.length;
      })
    }
  }

  getAllCategories() {
    this.prodSrv.getCategories().subscribe((res: any) => {
      if (res) {
        this.allParentCategories = res.data.filter(
          (cat: any) => {
            return cat.parentCategoryId === 0;
          })
      } if (res) {
        this.allChildCategories = res.data.filter(
          (cat: any) => {
            return cat.parentCategoryId > 0;
          })
      }
    })
  }



  childCategories(catId: Number) {
    this.childCatToShow = this.allChildCategories.filter((child) => {
      return child.parentCategoryId === catId;
    })
    if (this.childCatToShow.length === 0) {
      this.ul.nativeElement.style.display = 'none';
    } else {
      this.ul.nativeElement.style.display = 'block';
    }
  }


  navigateToCart() {
    if (this.prodSrv.customerDetails == undefined) {
      this.route.navigate(['login']);
    } else {
      this.route.navigate(['home/cart', this.prodSrv.customerDetails.custId]);
    }
  }







}
