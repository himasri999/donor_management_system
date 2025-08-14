import { Component, OnInit } from '@angular/core';
import { DonorService, Donor } from '../../shared/services/donor.service';

@Component({
  selector: 'app-donor-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.css']
})
export class DonorListComponent implements OnInit {
  donors: Donor[] = [];
  filteredDonors: Donor[] = [];
  searchTerm = '';
  showForm = false;
  editingDonor: Donor | null = null;

  constructor(private donorService: DonorService) {}

  ngOnInit() {
    this.loadDonors();
  }

  loadDonors() {
    this.donorService.getDonors().subscribe(donors => {
      this.donors = donors;
      this.filteredDonors = donors;
    });
  }

  filterDonors() {
    this.filteredDonors = this.donors.filter(donor =>
      donor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editDonor(donor: Donor) {
    this.editingDonor = donor;
    this.showForm = true;
  }

  deleteDonor(id: number) {
    if (confirm('Are you sure?')) {
      this.donorService.deleteDonor(id).subscribe(() => {
        this.loadDonors();
      });
    }
  }

  onFormClose() {
    this.showForm = false;
    this.editingDonor = null;
    this.loadDonors();
  }
}