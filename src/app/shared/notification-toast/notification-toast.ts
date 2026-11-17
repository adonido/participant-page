
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NotificationService } from '../notification';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './notification-toast.html',
  styleUrl: './notification-toast.css'
})
export class NotificationToast {

  notification$!: NotificationService['notification$'];

  constructor(
    private notificationService: NotificationService
  ) {
    this.notification$ = this.notificationService.notification$;
  }

  close() {
  
  }
}

