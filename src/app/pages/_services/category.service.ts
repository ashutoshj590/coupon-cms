import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from '../../_constant';
import { User } from '../_models';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategoryService { 
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

    getAllCategory(): Observable<any> {
        return this.http.post<any>(this.apiURL + '/category/get-all-category', null)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }




    addNewCategory(value: any) { 
        return this.http.post<any>(this.apiURL + '/category/add-category', value)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }
    
    
    deleteCategory(id: any) { 
        const httpOpt = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain'
            })
          };
        return this.http.post<any>(this.apiURL + '/category/delete-category', JSON.stringify({category_id:id}), httpOpt)
            .pipe(map(response => {  
                console.log(response);
                return response;
            }));
    }


    getSubCategory(id: any) {
        const httpOpt = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain'
            })
          };
        return this.http.post<any>(this.apiURL + '/category/get-sub-category', JSON.stringify({category_id:id}), httpOpt)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }


    addSubCategory(value: any) {
        return this.http.post<any>(this.apiURL + '/category/add-sub-category', value)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }


    deleteSubCategory(id: any) { 
        const httpOpt = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain'
            })
          };
        return this.http.post<any>(this.apiURL + '/category/delete-sub-category', JSON.stringify({sub_category_id:id}), httpOpt)
            .pipe(map(response => {  
                console.log(response);
                return response;
            }));
    }


    
    
}