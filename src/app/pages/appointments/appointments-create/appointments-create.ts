
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Workshop } from '../../../shared/models/workshop.model';
import { WorkshopsService } from '../../../services/workshopsService';
import { MatDialogRef } from '@angular/material/dialog';
import { AppointmentsService } from '../../../services/appointmentsService';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointments-create',
  standalone: false,
  templateUrl: './appointments-create.html',
  styleUrl: './appointments-create.scss',
})
export class AppointmentsCreate implements OnInit {
  workshops: Workshop[] = [];
  appointmentForm: FormGroup;

  constructor(
    private workshopsService: WorkshopsService,
    private appointmentsService: AppointmentsService,
    private cd: ChangeDetectorRef,
    private dialogRef: MatDialogRef<AppointmentsCreate>,
    private fb: FormBuilder,
  ) {
    this.appointmentForm = this.fb.group({
      place_id: ['', Validators.required],
      appointment_at: ['', Validators.required],
      service_type: ['', Validators.required],

      contact: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required]
      }),

      vehicle: this.fb.group({
        make: [''],
        model: [''],
        license_plate: ['']
      })
    });
  }

  ngOnInit() {
    
  }

  loadWorkshops() {
    this.workshopsService.getWorkshops().subscribe({
      next: (data) =>{
        this.workshops = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (this.appointmentForm.invalid) return;

    this.appointmentsService.createAppointment(this.appointmentForm.value).subscribe({
      next: () => this.dialogRef.close('created'),
      error: err => console.error(err)
    });
  }

  save() {
    this.onSubmit();
  }
}
