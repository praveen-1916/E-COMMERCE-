import { AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { faBagShopping, faChevronLeft, faChevronRight, faMaximize, faHeart, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';



@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit, AfterViewInit {

  @ViewChildren('radio') dots: any;
  @ViewChildren('card') cards: any;


  constructor(public prodSrv: ProductService, private route: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProducts();
    setInterval(() => {
      (this.dots._results[this.count].nativeElement).checked = true;
      this.count++;

      if (this.count > 4) {
        this.count = 0;
      }
    }, 10000)
  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // console.log(this.cards);
    // console.log(this.dots);
    // console.log(this.dots.length);
    // console.log(this.dots._results[this.count]);
  }



  allProducts: any[] = [];
  heartIc = faHeart;
  bagIc = faBagShopping;
  maximizeIc = faMaximize;
  leftIc = faChevronLeft;
  rigthIc = faChevronRight;
  successIc = faCircleCheck;
  successMsg: any;
  successPopShow: boolean = false;
  count: number = 0;
  currentItem: number = 4;
  cardItem: any;

  toHideCategory() {
    if (this.prodSrv.category) {
      this.prodSrv.toToggleCategory();
    }
  }


  getAllProducts() {
    this.prodSrv.getProducts().subscribe((res: any) => {
      if (res.result) {
        this.allProducts = res.data;
        this.cardItem = res.data.length;
        this.currentItem = 4;
      }
    })
  }



  addProductToCart(productId: Number,) {
    if (this.prodSrv.customerDetails == undefined) {
      this.route.navigate(['login']);
    } else {
      this.prodSrv.addToCart(productId).subscribe((res: any) => {
        if (res.result) {
          this.successMsg = res.message;
        } else {
          this.successMsg = res.message;
        }
        this.prodSrv.getCartProducts(this.prodSrv.customerDetails.custId).subscribe((res: any) => {
          this.prodSrv.totalProducts = res.data.length;
        })
        this.successPopShow = true;
        setTimeout(() => {
          this.successPopShow = false;
        }, 4000);
      })
    }
  }

  hidePopUp() {
    this.successPopShow = false;
  }


  showMoreProducts() {
    for (let i = this.currentItem; i < this.currentItem + 8; i++) {
      this.cards._results[i].nativeElement.style.display = "flex";
    }
    this.currentItem += 8;
  }

  showLessProducts() {
    for (let i = this.currentItem - 1; i > this.currentItem - 9; i--) {
      this.cards._results[i].nativeElement.style.display = "none";
    }
    this.currentItem -= 8;
  }




}
