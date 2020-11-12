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

    getAllMerchant(): Observable<any> {
        return this.http.post<any>(this.apiURL + '/user/get-all-merchant', null)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }


    getAllConsumer(): Observable<any> {
        return this.http.post<any>(this.apiURL + '/user/get-all-consumer', null)
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }
}