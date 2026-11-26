import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AUTH GUARD EXECUTED');

  const authenticated = authService.isAuthenticated();

  console.log('AUTHENTICATED:', authenticated);

  if (authenticated) {
    return true;
  }

  console.log('REDIRECTING TO LOGIN');

  return router.createUrlTree(['/login']);
};