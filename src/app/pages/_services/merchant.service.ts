import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from '../../_constant';
import { User } from '../_models';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MerchantService { 
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    apiURL = apiUrl.server;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
        
    }

   
    getAllConsumer(): Observable<any> {
        return this.http.post<any>(this.apiURL + '/user/get-all-consumer', null)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }


    getAllcategory(): Observable<any> {
      return this.http.post<any>(this.apiURL + '/category/get-cate-sub-cate', null)
          .pipe(map(response => {
              console.log(response);
              return response;
          }));
  }


    getAllMerchant(): Observable<any> {
      return this.http.post<any>(this.apiURL + '/user/get-all-merchant', null)
          .pipe(map(response => {
              console.log(response);
              return response;
          }));
  }


    merchantDetail(id: any) {
      const httpOpt = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain'
        })
      };
      return this.http.post<any>(this.apiURL + '/user/get-merchant-detail-admin', JSON.stringify({user_id:id}), httpOpt)
          .pipe(map(response => {
              console.log(response);
              return response;
          }));
  }



    getCouponsById(id: any) {
        const httpOpt = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain'
            })
          };
        return this.http.post<any>(this.apiURL + '/coupon/get-coupons-admin', JSON.stringify({merchant_id:id}), httpOpt)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }


    getCouponsConsumerId(id: any) {
        const httpOpt = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain'
            })
          };
        return this.http.post<any>(this.apiURL + '/coupon/get-coupons-consumer', JSON.stringify({consumer_id:id}), httpOpt)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }

    getImagesById(id: any) {
        const httpOpt = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain'
            })
          };
        return this.http.post<any>(this.apiURL + '/user/get-all-images', JSON.stringify({merchant_id:id}), httpOpt)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }



    getMerchantDetail(id: any) {
      const httpOpt = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain'
          })
        };
      return this.http.post<any>(this.apiURL + '/user/get-merchant-detail', JSON.stringify({user_id:id}), httpOpt)
          .pipe(map(response => {
              console.log(response);
              return response;
          }));
  }


  getCouponDetail(id: any) {
    const httpOpt = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain'
        })
      };
    return this.http.post<any>(this.apiURL + '/coupon/get-coupon-detail', JSON.stringify({coupon_id:id}), httpOpt)
        .pipe(map(response => {
            console.log(response);
            return response;
        }));
}




    statusForMerchant(id: any) {
        const httpOpt = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain'
            })
          };
        return this.http.post<any>(this.apiURL + '/user/status-update', JSON.stringify({merchant_id:id}), httpOpt)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }


    deleteMerchant(id: any) { 
        const httpOpt = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain'
            })
          };
        return this.http.post<any>(this.apiURL + '/user/delete-merchant', JSON.stringify({user_id:id}), httpOpt)
            .pipe(map(response => {  
                console.log(response);
                return response;
            }));
    }


    editMerchantDetail(formData) { 
      return this.http.post<any>(this.apiURL + '/user/update-register-merchant', formData)
          .pipe(map(response => {
              console.log(response);
              return response;
          }));
    }


    addMerchantDetail(formData) { 
      return this.http.post<any>(this.apiURL + '/user/register-merchant', formData)
          .pipe(map(response => {
              console.log(response);
              return response;
          }));
    }


    addUserDetail(formData) { 
      return this.http.post<any>(this.apiURL + '/auth/sign-up', formData)
          .pipe(map(response => {
              console.log(response);
              return response;
          }));
    }


    resetPassMerchant(formData) { 
      return this.http.post<any>(this.apiURL + '/auth/reset-password', formData)
          .pipe(map(response => {
              console.log(response);
              return response;
          }));
    }


  deleteCouponMerchant(id: any) { 
    const httpOpt = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain'
        })
      };
    return this.http.post<any>(this.apiURL + '/coupon/delete-coupon', JSON.stringify({coupon_id:id}), httpOpt)
        .pipe(map(response => {  
            console.log(response);
            return response;
        }));
  }

  editCouponDetail(formData) { 
    return this.http.post<any>(this.apiURL + '/coupon/edit-coupon', formData)
        .pipe(map(response => {
            console.log(response);
            return response;
        }));
  }

  editCouponDetailCustom(formData) { 
    return this.http.post<any>(this.apiURL + '/coupon/edit-custom-coupon', formData)
        .pipe(map(response => {
            console.log(response);
            return response;
        }));
  }



  deleteImg(user_id: any, image_id: any) { 
    const httpOpt = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain'
        })
      };
    return this.http.post<any>(this.apiURL + '/user/delete-image', JSON.stringify({user_id:user_id, image_id:image_id}), httpOpt)
        .pipe(map(response => {  
            console.log(response);
            return response;
        }));
  }



  deleteConsumer(id: any) { 
    const httpOpt = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain'
        })
      };
    return this.http.post<any>(this.apiURL + '/user/delete-consumer', JSON.stringify({user_id:id}), httpOpt)
        .pipe(map(response => {  
            console.log(response);
            return response;
        }));
}



getAllCoupons(): Observable<any> {
  return this.http.post<any>(this.apiURL + '/coupon/get-all-coupons-by-detail', null)
      .pipe(map(response => {
          console.log(response);
          return response;
      }));
}








}