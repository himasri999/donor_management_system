import { Component, OnInit } from '@angular/core';
import { DonationService, Donation } from '../../shared/services/donation.service';
import { DonorService, Donor } from '../../shared/services/donor.service';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html'
})
export class DonationListComponent implements OnInit {
  donations: Donation[] = [];
  donors: Donor[] = [];
  showForm = false;
  editingDonation: Donation | null = null;

  constructor(
    private donationService: DonationService,
    private donorService: DonorService
  ) {}

  ngOnInit() {
    this.loadDonations();
    this.loadDonors();
  }

  loadDonations() {
    this.donationService.getDonations().subscribe(donations => {
      this.donations = donations;
    });
  }

  loadDonors() {
    this.donorService.getDonors().subscribe(donors => {
      this.donors = donors;
    });
  }

  editDonation(donation: Donation) {
    this.editingDonation = donation;
    this.showForm = true;
  }

  deleteDonation(id: number) {
    if (confirm('Are you sure?')) {
      this.donationService.deleteDonation(id).subscribe(() => {
        this.loadDonations();
      });
    }
  }

  onFormClose() {
    this.showForm = false;
    this.editingDonation = null;
    this.loadDonations();
  }
}