
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Workshop } from '../../../shared/models/workshop.model';
import { WorkshopsService } from '../../../services/workshopsService';
import { MatDialogRef } from '@angular/material/dialog';
import { AppointmentsService } from '../../../services/appointmentsService';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../../../shared/models/appointment.model';
import { NotificationService } from '../../../services/notificationService';

@Component({
  selector: 'app-appointments-create',
  standalone: false,
  templateUrl: './appointments-create.html',
  styleUrl: './appointments-create.scss',
})
export class AppointmentsCreate implements OnInit {
  workshops: Workshop[] = [];
  appointmentForm: FormGroup;
  minDate: Date;

  constructor(
    private workshopsService: WorkshopsService,
    private appointmentsService: AppointmentsService,
    private cd: ChangeDetectorRef,
    private dialogRef: MatDialogRef<AppointmentsCreate>,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.minDate = new Date(today);
    this.minDate.setDate(today.getDate() + 1)

    this.appointmentForm = this.fb.group({

      appointment_date: ['', Validators.required],
      appointment_time: ['', Validators.required],
      service_type: ['', Validators.required],

      workshop: this.fb.group({
        place_id: ['', Validators.required],
        address: [{ value: '', disabled: true }],
        email: [{ value: '', disabled: true }],
        phone: [{ value: '', disabled: true }],
      }),

      contact: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [null, Validators.pattern('^[0-9()+]+$')]
      }),

      vehicle: this.fb.group({
        make: [null],
        model: [null],
        year: [null, Validators.pattern('^[0-9]{4}$')],
        license_plate: [null, Validators.pattern(/^[A-Z]{3}[0-9]{3}$|^[A-Z]{2}[0-9]{3}[A-Z]{2}$/)]
      })
    });

    this.appointmentForm.get('workshop.place_id')?.valueChanges.subscribe(id => {
      const workshop = this.getWorkshop(id);
      if (workshop) {
        this.appointmentForm.get('workshop')?.patchValue({
          address: workshop.formatted_address || '',
          email: workshop.email || '',
          phone: workshop.phone || ''
        });
      }
    });
  }
  get appointmentDate() {
    return this.appointmentForm.get('appointment_date');
  }

  get appointmentTime() {
    return this.appointmentForm.get('appointment_time');
  }

  get serviceType() {
    return this.appointmentForm.get('service_type');
  }

  get workshop() {
    return this.appointmentForm.get('workshop.place_id');
  }

  get contactName() {
    return this.appointmentForm.get('contact.name');
  }

  get contactPhone() {
    return this.appointmentForm.get('contact.phone');
  }
  
  get contactEmail() {
    return this.appointmentForm.get('contact.email');
  }

  get vehicleYear() {
    return this.appointmentForm.get('vehicle.year');
  }

  get vehicleLicensePlate() {
    return this.appointmentForm.get('vehicle.license_plate');
  }

  ngOnInit() {
    this.loadWorkshops();
  }

  loadWorkshops() {
    this.workshopsService.getWorkshops().subscribe({
      next: (data) => {
        this.workshops = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notificationService.error('Unexpected error');
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.appointmentForm.invalid) return;

    const { appointment_date, appointment_time, ...rest } = this.appointmentForm.value;

    const appointment: Appointment = {
      ...rest,
      appointment_at: this.generateDateTime(appointment_date, appointment_time),
      place_id: rest.workshop.place_id
    };

    console.log('Objeto Appointment:', appointment);


    this.appointmentsService.createAppointment(appointment).subscribe({
      next: () => {
        this.notificationService.success('Appointment created successfully!');
        this.dialogRef.close('created');
      },
      error: (err) => {
        if (err.error?.error && Array.isArray(err.error.error)) {
          const msg = err.error.error.join('\n');
          this.notificationService.error(msg);
        } else {
          this.notificationService.error('Unexpected error');
        }
      }
    });
  }

  save() {
    this.onSubmit();
  }

  generateDateTime(appointment_date: any, appointment_time: any): Date {
    const date = new Date(appointment_date);
    const [hours, minutes] = appointment_time.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  getWorkshop(placeId: number): Workshop | undefined {
    return this.workshops.find(w => w.id === placeId);
  }

}
