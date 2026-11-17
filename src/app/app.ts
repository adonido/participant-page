
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationToast } from './shared/notification-toast/notification-toast';

@Component({
  imports: [RouterOutlet, NotificationToast],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('eyosi');
}
