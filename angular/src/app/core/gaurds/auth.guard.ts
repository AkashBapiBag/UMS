import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DefaultValueService } from '../service/default-value.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly defaultValueService: DefaultValueService,
        private readonly router: Router
    ) {
        console.log('hit');
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        console.log(this.defaultValueService.isAuthenticated());

        if (!this.defaultValueService.isAuthenticated()) {
            this.router.navigate(['/auth']);
            return false;
        }
        return true;
    }
}
