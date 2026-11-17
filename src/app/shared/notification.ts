
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject =
    new BehaviorSubject<Notification | null>(null);

  notification$ = this.notificationSubject.asObservable();

  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  showSuccess(message: string) {
    this.showNotification(message, 'success');
  }

  showError(message: string) {
    this.showNotification(message, 'error');
  }

  private showNotification(
    message: string,
    type: 'success' | 'error'
  ) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.notificationSubject.next({ message, type });

    this.timeoutId = setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear() {
    this.notificationSubject.next(null);
  }

}
