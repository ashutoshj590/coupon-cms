import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from '../../_constant';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
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

    login(email: string, password: string, type: string) {
       
        console.log(email, password, type);
        let user = {
            email: email,
            password: password,
            type: type,
            grant_type: apiUrl.grant_type,
            client_id: apiUrl.client_id,
            client_secret: apiUrl.client_secret 
        }
        console.log(user);
        return this.http.post<any>(this.apiURL + '/auth/login', user)
            .pipe(map(response => {
                console.log(response);
                // login successful if there's a jwt token in the response
                if (response && response.access_token) {
                    let user = {id:0,name:'',email:'',roles:'',token:response.access_token};
                    
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);

                    return user;
                }
            }));
    }

  /*  getUser() {
        return this.http.get<any>(this.apiURL + '/api/user')
            .pipe(map(response => {
                console.log(response, 'response');
                let user = JSON.parse(localStorage.getItem('currentUser'));
                user.id = response.id;
                user.name = response.name;
                user.email = response.email;
                user.roles = response.user_type == 'admin' ? 'all' : '';
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return response;
            }));
    } */

    getUserRoles(id = null): Observable<any> {
        let params = '';
        if(id != null) {
            params = '/' + id;
        }
        return this.http.get<any>(this.apiURL + '/api/user_role' + params)
            .pipe(map(response => {
                let user = JSON.parse(localStorage.getItem('currentUser'));
                user.roles = (response.data.length > 0) ? response.data[0].roles : '';
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return response;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}