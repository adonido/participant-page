
import { Component, OnInit } from '@angular/core';
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
isLoading = false;

// Delete confirmation modal
showDeleteModal = false;
selectedParticipant: Participant | null = null;
 constructor(
  private participantService: ParticipantService,
  private router: Router,
  private notificationService: NotificationService
) {}

  ngOnInit() {
    this.loadParticipants();
  }

  loadParticipants() {

  this.isLoading = true;

  this.participantService.getParticipants().subscribe({

    next: (data) => {
      this.participants = data;
      this.isLoading = false;
    },

    error: (error) => {
      console.error('Error fetching participants:', error);
      this.isLoading = false;
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

    next: () => {
      this.participants = this.participants.filter(
        p => p.id !== participantId
      );

      this.notificationService.showSuccess(
        'Participant deleted successfully!'
      );

      this.closeDeleteModal();
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
  logout() {
    this.router.navigate(['/login']);
  }

}

