
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../shared/notification';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const notificationService = inject(NotificationService);
  const router = inject(Router);

  // Get access token from sessionStorage
  const accessToken = sessionStorage.getItem('access_token');
  const tokenType = sessionStorage.getItem('token_type') || 'Bearer';

  // Attach token to API requests, except login
  const authReq = accessToken && !req.url.includes('/auth/login')
    ? req.clone({
        setHeaders: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'An unexpected error occurred. Please try again.';

      if (error.status === 401 && !req.url.includes('/auth/login')) {

        // Clear authentication data
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('token_type');
        sessionStorage.removeItem('access_token_expiry');
        sessionStorage.removeItem('refresh_token_expiry');

        message = 'Your session has expired. Please log in again.';

        notificationService.showError(message);
        router.navigate(['/login']);

      } else if (error.status === 0) {

        message = 'Unable to connect to the server. Please check your internet connection.';

      } else if (error.status === 404) {

        message = 'The requested resource was not found.';

      } else if (error.status >= 500) {

        message = 'Server error. Please try again later.';

      } else if (error.error?.message) {

        message = error.error.message;

      }

      if (error.status !== 401 || req.url.includes('/auth/login')) {
        notificationService.showError(message);
      }

      return throwError(() => error);
    })
  );
};
