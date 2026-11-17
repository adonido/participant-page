
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../shared/notification';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const notificationService = inject(NotificationService);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      let message = 'An unexpected error occurred. Please try again.';

      if (error.status === 0) {

        message = 'Unable to connect to the server. Please check your internet connection.';

      } else if (error.status === 404) {

        message = 'The requested resource was not found.';

      } else if (error.status >= 500) {

        message = 'Server error. Please try again later.';

      } else if (error.error?.message) {

        message = error.error.message;

      }

      notificationService.showError(message);

      return throwError(() => error);

    })

  );

};
