import { AfterViewChecked, Component, OnInit, ViewChildren } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faBagShopping, faHome, faMinus, faPlus, faHeart, faMaximize, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit {

  constructor(private prodSrv: ProductService, private ARoute: ActivatedRoute, private route: Router) { }

  @ViewChildren('card') cards: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getSingleProduct();

  }


  singleProduct: any = {};
  catId: any;
  homeIc = faHome;
  plusIc = faPlus;
  minusIc = faMinus;
  bagIc = faBagShopping;
  heartIc = faHeart;
  maximizeIc = faMaximize;
  successIc = faCircleCheck;
  successMsg: any;
  successPopShow: boolean = false;
  currentItem: number = 4;
  cardItem: any;
  similarCategoryProducts: any[] = [];
  priceWithQuantity: any;

  toHideCategory() {
    if (this.prodSrv.category) {
      this.prodSrv.toToggleCategory();
    }
  }

  quantityPlus(input: any) {
    if (input.value > 0) {
      input.value++;
      this.priceWithQuantity = this.singleProduct.productPrice * input.value;
    }
  }
  quantityMinus(input: any) {
    if (input.value > 1) {
      input.value--;
      this.priceWithQuantity = this.singleProduct.productPrice * input.value;
    }
  }

  getSingleProduct() {
    this.ARoute.paramMap.subscribe((params) => {
      const prodId = Number(params.get('id'));
      this.prodSrv.getProducts().subscribe((res: any) => {
        this.singleProduct = res.data.find((d: any) => d.productId === prodId);
        this.catId = this.singleProduct.categoryId;
        this.priceWithQuantity = this.singleProduct.productPrice;
        this.prodSrv.getCategoryProducts(this.catId).subscribe((res: any) => {
          this.similarCategoryProducts = res.data;
          this.cardItem = res.data.length;
          this.currentItem = 4;
        })
      })
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
    if (this.cardItem <= 30) {
      for (let i = this.currentItem; i < this.cardItem; i++) {
        this.cards._results[i].nativeElement.style.display = "flex";
      }
      this.currentItem = this.cardItem;
    } else {
      for (let i = this.currentItem; i < this.currentItem + 8; i++) {
        this.cards._results[i].nativeElement.style.display = "flex";
      }
      this.currentItem += 8;
    }
  }

  showLessProducts() {
    if (this.cardItem <= 30) {
      for (let i = this.currentItem - 1; i > 3; i--) {
        this.cards._results[i].nativeElement.style.display = "none";
      }
      this.currentItem = 4;
    } else {
      for (let i = this.currentItem - 1; i > this.currentItem - 9; i--) {
        this.cards._results[i].nativeElement.style.display = "none";
      }
      this.currentItem -= 8;
    }
  }

}
