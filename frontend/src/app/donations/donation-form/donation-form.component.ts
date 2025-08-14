import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonationService, Donation } from '../../shared/services/donation.service';
import { Donor } from '../../shared/services/donor.service';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html'
})
export class DonationFormComponent implements OnInit {
  @Input() donation: Donation | null = null;
  @Input() donors: Donor[] = [];
  @Output() close = new EventEmitter<void>();
  
  donationForm: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private donationService: DonationService) {
    this.donationForm = this.fb.group({
      donor_id: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    if (this.donation) {
      this.donationForm.patchValue(this.donation);
    }
  }

  onSubmit() {
    if (this.donationForm.valid) {
      this.loading = true;
      this.error = '';
      
      const donationData = this.donationForm.value;
      
      const request = this.donation 
        ? this.donationService.updateDonation(this.donation.id!, donationData)
        : this.donationService.createDonation(donationData);
      
      request.subscribe({
        next: () => this.close.emit(),
        error: (err) => {
          this.error = err.error?.message || 'Operation failed';
          this.loading = false;
        }
      });
    }
  }

  onCancel() {
    this.close.emit();
  }
}