import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Participants} from '../participant/participant';
@Component({
  imports: [FormsModule,CommonModule],
  selector: 'app-login',
styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  username='';
  password='';

  message='';
  messageType='';

constructor(private router:Router){}

  onLogin(){
    if(!this.username || !this.password){
      this.message='please enter username and password';
      this.messageType='danger';
      return ;
    }
    if(this.username=== 'admin' && this.password==='Admin123$'){
     
this.router.navigate(['/participants']);

    }
    else{
      this.message='invalid credential';
      this.messageType='danger';
    }
  }
}
