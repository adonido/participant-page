
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantService, Participant } from '../services/participant';

@Component({
  selector: 'app-participant-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './participant-form.css',
  templateUrl: './participant-form.html'
})
export class ParticipantForm {

  participantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private router: Router
  ) {

    this.participantForm = this.fb.group({

      name: ['', Validators.required],

      bic: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]],

      shortName: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      phone: ['', Validators.required],

      status: ['Active', Validators.required]

    });

  }

  saveParticipant() {
console.log('SAVE BUTTON CLICKED');
    if (this.participantForm.invalid) {
      this.participantForm.markAllAsTouched();
      return;
    }

    const participant = this.participantForm.getRawValue() as Participant;

    this.participantService.addParticipant(participant).subscribe({

      next: (response) => {
        console.log('Participant saved successfully:', response);
        this.router.navigate(['/participants']);
      },

      error: (error) => {
        console.error('Error saving participant:', error);
      }

    });

  }

  cancel() {
    this.router.navigate(['/participants']);
  }

}
