import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from './constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private route: Router) { }

  customerDetails: any;
  totalProducts: any;
  category: boolean = false;


  toToggleCategory() {
    if (this.category) {
      this.category = false;
    } else {
      this.category = true;
    }
  }

  setData(custData: any) {
    this.customerDetails = custData;
  }

  getData() {
    return this.customerDetails;
  }


  getProducts() {
    return this.http.get(Constant.URL_END_POINT + Constant.METHODS.GET_ALL_PRODUCTS);
  }

  getCategories() {
    return this.http.get(Constant.URL_END_POINT + Constant.METHODS.GET_ALL_CATEGORIES);
  }

  getCategoryProducts(catId: any) {
    return this.http.get(Constant.URL_END_POINT + Constant.METHODS.GET_PRODUCTS_BY_CATEGORY_ID + catId);
  }


  loginCustomer(customerDetails: any) {
    return this.http.post(Constant.URL_END_POINT + Constant.METHODS.LOGIN, customerDetails);
  }

  registerCustomer(customerDetails: any) {
    return this.http.post(Constant.URL_END_POINT + Constant.METHODS.REGISTER, customerDetails);
  }

  getCartProducts(custId: any) {
    return this.http.get(Constant.URL_END_POINT + Constant.METHODS.GET_CART_PRODUCTS + custId);
  }

  deleteCartProduct(cartId: any) {
    return this.http.get(Constant.URL_END_POINT + Constant.METHODS.DELETE_CART_PRODUCT + cartId)
  }

  addToCart(productId: any) {
    const productDetails = {
      "CartId": 0,
      "CustId": this.customerDetails.custId,
      "ProductId": productId,
      "Quantity": 1,
      "AddedDate": new Date(),
    }
    return this.http.post(Constant.URL_END_POINT + Constant.METHODS.ADD_TO_CART, productDetails);

  }





}
