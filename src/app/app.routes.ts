
import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Participants } from './participant/participant';
import { ParticipantForm } from './participant-form/participant-form';

export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'participants',
    component: Participants
  },

  {
    path: 'participants/new',
    component: ParticipantForm
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];
