import { Component, OnInit } from '@angular/core';
import { CommunicationService, Communication } from '../../shared/services/communication.service';
import { DonorService, Donor } from '../../shared/services/donor.service';

@Component({
  selector: 'app-communication-list',
  templateUrl: './communication-list.component.html'
})
export class CommunicationListComponent implements OnInit {
  communications: Communication[] = [];
  donors: Donor[] = [];
  showForm = false;
  editingCommunication: Communication | null = null;

  constructor(
    private communicationService: CommunicationService,
    private donorService: DonorService
  ) {}

  ngOnInit() {
    this.loadCommunications();
    this.loadDonors();
  }

  loadCommunications() {
    this.communicationService.getCommunications().subscribe(communications => {
      this.communications = communications;
    });
  }

  loadDonors() {
    this.donorService.getDonors().subscribe(donors => {
      this.donors = donors;
    });
  }

  editCommunication(communication: Communication) {
    this.editingCommunication = communication;
    this.showForm = true;
  }

  deleteCommunication(id: number) {
    if (confirm('Are you sure?')) {
      this.communicationService.deleteCommunication(id).subscribe(() => {
        this.loadCommunications();
      });
    }
  }

  onFormClose() {
    this.showForm = false;
    this.editingCommunication = null;
    this.loadCommunications();
  }
}