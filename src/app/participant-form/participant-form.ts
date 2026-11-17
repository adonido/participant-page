
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantService, Participant } from '../services/participant';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-participant-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  styleUrl: './participant-form.css',
  templateUrl: './participant-form.html'
})
export class ParticipantForm {

  participantForm: FormGroup;

  // Logo upload properties
  logoFile: File | null = null;
  logoPreview: string | null = null;

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

  // Select and preview logo
  onLogoSelected(event: Event) {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      alert('Please select a PNG or JPG image.');
      input.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must not exceed 2 MB.');
      input.value = '';
      return;
    }

    this.logoFile = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.logoPreview = reader.result as string;
    };

    reader.readAsDataURL(file);
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

        // Upload logo after participant registration
        if (this.logoFile && response.id) {

          this.participantService.uploadLogo(response.id, this.logoFile).subscribe({

            next: (logoResponse) => {
              console.log('Logo uploaded successfully:', logoResponse);
              this.router.navigate(['/participants']);
            },

            error: (error) => {
              console.error('Logo upload failed:', error);
              this.router.navigate(['/participants']);
            }

          });

        } else {

          this.router.navigate(['/participants']);

        }

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
