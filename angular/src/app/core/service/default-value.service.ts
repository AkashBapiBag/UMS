import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class DefaultValueService {
    constructor() {}

    private jwtHelper = new JwtHelperService();

    isAuthenticated(): boolean {
        const token = this.getUserToken() || '';
        if (token) return !this.jwtHelper.isTokenExpired(token);
        else return false;
    }

    getUserToken() {
        return sessionStorage.getItem('userToken');
    }
}
