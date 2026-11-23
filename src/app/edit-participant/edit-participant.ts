
import { Component, OnInit, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService, Participant } from '../services/participant';

@Component({
  selector: 'app-edit-participant',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-participant.html',
  styleUrl: './edit-participant.css'
})
export class EditParticipant implements OnInit {

  participantForm: FormGroup;
  participantId!: number;
  isLoading = signal(true);
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private route: ActivatedRoute,
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

      phoneNumber : ['', Validators.required],

      status: ['Active', Validators.required]

    });

  }

  ngOnInit() {

    this.participantId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!this.participantId || isNaN(this.participantId)) {
      this.router.navigate(['/participants']);
      return;
    }

    this.loadParticipant();

  }

  loadParticipant() {

    this.participantService
      .getParticipantById(this.participantId)
      .subscribe({

        next: (participant) => {

          this.participantForm.patchValue(participant);
          this.isLoading.set(false);

        },

        error: (error) => {

          console.error('Error loading participant:', error);
          this.isLoading.set(false);

        }

      });

  }

  updateParticipant() {

    if (this.participantForm.invalid) {
      this.participantForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const participant = this.participantForm.getRawValue() as Participant;

    this.participantService
      .updateParticipant(this.participantId, participant)
      .subscribe({

        next: () => {

          this.router.navigate(['/participants']);

        },

        error: (error) => {

          console.error('Error updating participant:', error);
          this.isSaving = false;

        }

      });

  }

  cancel() {

    this.router.navigate(['/participants']);

  }

}
