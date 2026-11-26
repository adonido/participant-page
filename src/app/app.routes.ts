
import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Participants } from './participant/participant';
import { ParticipantForm } from './participant-form/participant-form';
import { EditParticipant } from './edit-participant/edit-participant';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'participants',
    component: Participants,
    // canActivate: [authGuard]
  },

  {
    path: 'participants/new',
    component: ParticipantForm,
    // canActivate: [authGuard]
  },
  {
    path: 'participants/edit/:id',
    component: EditParticipant,
    // canActivate: [authGuard]
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
