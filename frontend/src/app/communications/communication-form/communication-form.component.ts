import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationService, Communication } from '../../shared/services/communication.service';
import { Donor } from '../../shared/services/donor.service';

@Component({
  selector: 'app-communication-form',
  templateUrl: './communication-form.component.html'
})
export class CommunicationFormComponent implements OnInit {
  @Input() communication: Communication | null = null;
  @Input() donors: Donor[] = [];
  @Output() close = new EventEmitter<void>();
  
  communicationForm: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private communicationService: CommunicationService) {
    this.communicationForm = this.fb.group({
      donor_id: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.communication) {
      this.communicationForm.patchValue(this.communication);
    }
  }

  onSubmit() {
    if (this.communicationForm.valid) {
      this.loading = true;
      this.error = '';
      
      const communicationData = this.communicationForm.value;
      
      const request = this.communication 
        ? this.communicationService.updateCommunication(this.communication.id!, communicationData)
        : this.communicationService.createCommunication(communicationData);
      
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