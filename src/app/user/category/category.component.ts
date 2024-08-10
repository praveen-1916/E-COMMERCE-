import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { faBagShopping, faHome, faMaximize, faHeart, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, AfterViewInit {

  @ViewChildren('card') cards: any;

  constructor(private prodSrv: ProductService, private Aroute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllCategoryProducts();
    this.getAllCategories();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // console.log(this.cards);
    // console.log(this.allCategoryProducts);
    // console.log(this.catNme);
  }






  allCategories: any[] = [];
  allCategoryProducts: any[] = [];
  heartIc = faHeart;
  bagIc = faBagShopping;
  homeIc = faHome;
  maximizeIc = faMaximize;
  successIc = faCircleCheck;
  successMsg: any;
  successPopShow: boolean = false;
  currentItem: number = 8;
  cardItem: any;
  categoryName: any;

  toHideCategory() {
    if (this.prodSrv.category) {
      this.prodSrv.toToggleCategory();
    }
  }

  getAllCategoryProducts() {
    this.Aroute.paramMap.subscribe((params) => {
      const catId = params.get('id');
      this.prodSrv.getCategoryProducts(catId).subscribe((res: any) => {
        this.allCategoryProducts = res.data;
        this.cardItem = res.data.length;
        this.currentItem = 8;
      })
    })
    this.Aroute.queryParamMap.subscribe((params) => {
      this.categoryName = params.get('category');
    })

  }

  getAllCategories() {
    this.prodSrv.getCategories().subscribe((res: any) => {
      this.allCategories = res.data;
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
    // console.log(this.currentItem);
  }

  showLessProducts() {
    if (this.cardItem <= 30) {
      for (let i = this.currentItem - 1; i > 7; i--) {
        this.cards._results[i].nativeElement.style.display = "none";
      }
      this.currentItem = 8;
    } else {
      for (let i = this.currentItem - 1; i > this.currentItem - 9; i--) {
        this.cards._results[i].nativeElement.style.display = "none";
      }
      this.currentItem -= 8;
    }
    // console.log(this.currentItem);
  }



}
