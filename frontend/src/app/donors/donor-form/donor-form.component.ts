import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonorService, Donor } from '../../shared/services/donor.service';

@Component({
  selector: 'app-donor-form',
  templateUrl: './donor-form.component.html',
  styleUrls: ['./donor-form.component.css']
})
export class DonorFormComponent implements OnInit {
  @Input() donor: Donor | null = null;
  @Output() close = new EventEmitter<void>();
  
  donorForm: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private donorService: DonorService) {
    this.donorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^\d{10}$/)]
    });
  }

  ngOnInit() {
    if (this.donor) {
      this.donorForm.patchValue(this.donor);
    }
  }

  onSubmit() {
    if (this.donorForm.valid) {
      this.loading = true;
      this.error = '';
      
      const donorData = this.donorForm.value;
      
      const request = this.donor 
        ? this.donorService.updateDonor(this.donor.id!, donorData)
        : this.donorService.createDonor(donorData);
      
      request.subscribe({
        next: () => {
          this.close.emit();
        },
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