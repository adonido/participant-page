
import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ParticipantService, Participant } from '../services/participant';
import { LoadingSpinner } from '../shared/loading-spinner/loading-spinner';
import { NotificationService } from '../shared/notification';
@Component({
  selector: 'app-participants',
  standalone: true,
imports: [RouterLink, LoadingSpinner],
  styleUrl: './participant.css',
  templateUrl: './participant.html'
})
export class Participants implements OnInit {

  participants: Participant[] = [];
isLoading = signal<boolean>(true);

showDeleteModal = false;
selectedParticipant: Participant | null = null;
 constructor(
  private participantService: ParticipantService,
  private router: Router,
  private notificationService: NotificationService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit() {
    this.loadParticipants();
  }

  loadParticipants() {


  this.participantService.getParticipants().subscribe({

    next: (data) => {
      this.participants = data;
      this.isLoading.set(false);
    },

    error: (error) => {
      console.error('Error fetching participants:', error);
      this.isLoading.set(false);
    }

  });

}

deleteParticipant(participant: Participant) {

  if (participant.id === undefined) {
    return;
  }

  this.selectedParticipant = participant;
  this.showDeleteModal = true;
}
confirmDelete() {

  if (!this.selectedParticipant?.id) {
    return;
  }

  const participantId = this.selectedParticipant.id;

  this.participantService.deleteParticipant(participantId).subscribe({

    next: (response) => {
  console.log('Delete response:', response);
  console.log('Deleted participant ID:', participantId);

  this.participants = this.participants.filter(
    p => p.id !== participantId
  );

  console.log('Updated participants:', this.participants);

      this.notificationService.showSuccess(
        'Participant deleted successfully!'
      );

      this.closeDeleteModal();
      this.cdr.detectChanges();
    },

    error: (error) => {
      console.error('Error deleting participant:', error);

      this.notificationService.showError(
        'Failed to delete participant.'
      );

      this.closeDeleteModal();
    }

  });
}
closeDeleteModal() {
  this.showDeleteModal = false;
  this.selectedParticipant = null;
}
editParticipant(participant: Participant) {

  if (participant.id === undefined) {
    return;
  }

  this.router.navigate(['/participants/edit', participant.id]);

}
  logout() {
    this.router.navigate(['/login']);
  }

}

