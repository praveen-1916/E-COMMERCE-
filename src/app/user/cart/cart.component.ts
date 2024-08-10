import { AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck, faHome, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, AfterViewInit {

  @ViewChildren("cartProducts") prods: any;

  constructor(private prodSrv: ProductService, private Aroute: ActivatedRoute) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllCartProducts();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // console.log(this.prods);
    // console.log(this.savingsMoney);

  }

  plusIc = faPlus;
  minusIc = faMinus;
  trashIc = faTrashCan;
  homeIc = faHome;
  allCartProducts: any[] = [];
  allCartProductSum: any = 0;
  allCartProductSavings: any = 0;
  successIc = faCircleCheck;
  successMsg: any;
  successPopShow: boolean = false;

  toHideCategory() {
    if (this.prodSrv.category) {
      this.prodSrv.toToggleCategory();
    }
  }

  getAllCartProducts() {
    this.Aroute.paramMap.subscribe((params) => {
      const custId = params.get('id');
      this.prodSrv.getCartProducts(custId).subscribe((res: any) => {
        this.allCartProducts = res.data;
        this.prodSrv.totalProducts = res.data.length;
        this.allCartProducts.forEach((product: any) => {
          this.allCartProductSum += product.productPrice;
          this.allCartProductSavings = (this.allCartProductSum * 1.3) - this.allCartProductSum;
        });

      })
    })
  }

  quantityPlus(input: any, index: any) {
    if (input.value > 0) {
      input.value++;
      const priceWithQuantity = this.allCartProducts[index].productPrice;
      this.prods._results[index].nativeElement.value = priceWithQuantity * input.value;
      this.allCartProductSum = 0;
      // for (let i = 0; i < this.prods.length; i++) {
      //   this.allCartProductSum += this.prods._results[i].nativeElement.value;
      //     this.allCartProductSavings+=(this.allCartProducts[i].productPrice+this.prods._results[i].nativeElement.value)
      // }
      this.prods.forEach((prod: any) => {
        this.allCartProductSum += prod.nativeElement.value;
        this.allCartProductSavings = (this.allCartProductSum * 1.3) - this.allCartProductSum;
      });

    }
  }

  quantityMinus(input: any, index: any) {
    if (input.value > 1) {
      input.value--;
      const priceWithQuantity = this.allCartProducts[index].productPrice;
      this.prods._results[index].nativeElement.value = priceWithQuantity * input.value;
      this.allCartProductSum = 0;
      this.prods.forEach((prod: any) => {
        this.allCartProductSum += prod.nativeElement.value;
        this.allCartProductSavings = (this.allCartProductSum * 1.3) - this.allCartProductSum;
      });

    }
  }

  deleteProductFromCart(cartId: any) {
    this.prodSrv.deleteCartProduct(cartId).subscribe((res: any) => {
      if (res.result) {
        this.successMsg = res.message;
        this.allCartProductSum = 0;
        this.getAllCartProducts();
      } else {
        this.successMsg = res.message;
      }
      this.successPopShow = true;
      setTimeout(() => {
        this.successPopShow = false;
      }, 4000);
    })
  }

  hidePopUp() {
    this.successPopShow = false;
  }



}
